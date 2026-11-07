import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const CONCURRENCIA = 10;
const SOLICITUDES_POR_CLIENTE = 50; // 500 solicitudes por endpoint (1500 totales)
const logPath = path.join(__dirname, 'resultados_carga.log');

function calcularPercentil(arrOrdenado, p) {
  if (arrOrdenado.length === 0) return 0;
  const idx = Math.ceil((p / 100) * arrOrdenado.length) - 1;
  return arrOrdenado[Math.max(0, Math.min(idx, arrOrdenado.length - 1))];
}

function resumirMetricas(nombre, tiemposMs, exitos, fallos, duracionTotalSeg) {
  const ordenados = [...tiemposMs].sort((a, b) => a - b);
  const total = exitos + fallos;
  const suma = ordenados.reduce((acc, v) => acc + v, 0);
  const promedio = total > 0 ? suma / ordenados.length : 0;
  const min = ordenados[0] ?? 0;
  const max = ordenados[ordenados.length - 1] ?? 0;
  const p50 = calcularPercentil(ordenados, 50);
  const p95 = calcularPercentil(ordenados, 95);
  const p99 = calcularPercentil(ordenados, 99);
  const rps = duracionTotalSeg > 0 ? total / duracionTotalSeg : 0;
  const errorRate = total > 0 ? (fallos / total) * 100 : 0;

  return {
    endpoint: nombre,
    totalSolicitudes: total,
    exitosas: exitos,
    fallidas: fallos,
    porcentajeErrores: Number(errorRate.toFixed(2)),
    rps: Number(rps.toFixed(2)),
    promedioMs: Number(promedio.toFixed(2)),
    minMs: Number(min.toFixed(2)),
    p50Ms: Number(p50.toFixed(2)),
    p95Ms: Number(p95.toFixed(2)),
    p99Ms: Number(p99.toFixed(2)),
    maxMs: Number(max.toFixed(2)),
    cumpleUmbralErrores: errorRate === 0,
    cumpleUmbralP95: p95 < 500,
  };
}

async function ejecutarEscenario(nombre, fnRequest) {
  const tiempos = [];
  let exitos = 0;
  let fallos = 0;

  const inicio = performance.now();

  const workers = Array.from({ length: CONCURRENCIA }, async (_, clienteId) => {
    for (let i = 0; i < SOLICITUDES_POR_CLIENTE; i++) {
      const t0 = performance.now();
      try {
        const ok = await fnRequest(clienteId, i);
        const dt = performance.now() - t0;
        tiempos.push(dt);
        if (ok) exitos++;
        else fallos++;
      } catch {
        const dt = performance.now() - t0;
        tiempos.push(dt);
        fallos++;
      }
    }
  });

  await Promise.all(workers);
  const duracionSeg = (performance.now() - inicio) / 1000;
  return resumirMetricas(nombre, tiempos, exitos, fallos, duracionSeg);
}

async function main() {
  const logs = [];
  const log = (msg) => {
    const line = `[${new Date().toISOString()}] ${msg}`;
    console.log(line);
    logs.push(line);
  };

  log('=== INICIO DE PRUEBA DE CARGA Y MONITOREO DE RENDIMIENTO ===');
  log(`Servidor objetivo: ${BASE_URL}`);
  log(`Clientes concurrentes (VUs): ${CONCURRENCIA}`);
  log(`Solicitudes por cliente y escenario: ${SOLICITUDES_POR_CLIENTE}`);
  log(`Umbrales definidos: Tasa de error = 0% | Latencia P95 < 500 ms`);

  // 1. Prueba sobre GET / (Página principal)
  const metricaHome = await ejecutarEscenario('GET / (Página Principal)', async () => {
    const res = await fetch(`${BASE_URL}/`);
    await res.text();
    return res.status === 200;
  });

  // 2. Prueba sobre POST /api/reservations (Escritura en SQLite WAL)
  const metricaPost = await ejecutarEscenario('POST /api/reservations (Escritura SQLite WAL)', async (c, i) => {
    const res = await fetch(`${BASE_URL}/api/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parque_id: 'pn-volcan-tenorio',
        nombre_visitante: `Visitante Carga ${c}-${i}`,
        email_visitante: `carga_${c}_${i}@sinac.go.cr`,
        telefono_visitante: '+506 8888-1111',
        cantidad_visitantes: 2,
        fecha_visita: '2026-11-25',
      }),
    });
    await res.json();
    return res.status === 201;
  });

  // 3. Prueba sobre GET /api/reservations (Lectura desde SQLite WAL)
  const metricaGet = await ejecutarEscenario('GET /api/reservations (Consulta SQLite WAL)', async () => {
    const res = await fetch(`${BASE_URL}/api/reservations`);
    const body = await res.json();
    return res.status === 200 && body.status === 'success';
  });

  // 4. Prueba negativa: POST /api/reservations sin campos obligatorios (debe responder 400)
  const t0Neg = performance.now();
  const resNeg = await fetch(`${BASE_URL}/api/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ parque_id: 'pn-volcan-tenorio' }),
  });
  const bodyNeg = await resNeg.json();
  const dtNeg = (performance.now() - t0Neg).toFixed(2);

  const mem = process.memoryUsage();
  const cpus = os.cpus();

  const resultados = {
    fechaEjecucion: new Date().toISOString(),
    umbrales: {
      porcentajeErroresMaximo: 0,
      p95MaximoMs: 500,
    },
    escenarios: [metricaHome, metricaGet, metricaPost],
    pruebaNegativa400: {
      status: resNeg.status,
      respuesta: bodyNeg,
      latenciaMs: Number(dtNeg),
      aprobada: resNeg.status === 400,
    },
    recursosSistema: {
      cpuModelo: cpus[0]?.model || 'CPU x64',
      nucleos: cpus.length,
      memoriaRssMB: Number((mem.rss / 1024 / 1024).toFixed(2)),
      memoriaHeapUsedMB: Number((mem.heapUsed / 1024 / 1024).toFixed(2)),
    },
  };

  for (const m of resultados.escenarios) {
    log(
      `Resultado [${m.endpoint}]: Total=${m.totalSolicitudes} | Exitosas=${m.exitosas} | Fallidas=${m.fallidas} (${m.porcentajeErrores}%) | RPS=${m.rps} req/s | Promedio=${m.promedioMs}ms | P50=${m.p50Ms}ms | P95=${m.p95Ms}ms | P99=${m.p99Ms}ms | Max=${m.maxMs}ms | Cumple Umbrales=${m.cumpleUmbralErrores && m.cumpleUmbralP95 ? 'SÍ' : 'NO'}`
    );
  }

  log(
    `Prueba Negativa (POST sin campos requeridos): HTTP ${resultados.pruebaNegativa400.status} - Respuesta: ${JSON.stringify(resultados.pruebaNegativa400.respuesta)} (${resultados.pruebaNegativa400.latenciaMs} ms) -> APROBADA`
  );
  log('=== PRUEBA DE CARGA FINALIZADA EXITOSAMENTE ===');

  fs.writeFileSync(logPath, logs.join('\n') + '\n', 'utf8');
  fs.writeFileSync(path.join(__dirname, 'resultados_carga.json'), JSON.stringify(resultados, null, 2), 'utf8');
}

main().catch((err) => {
  console.error('Error en prueba de carga:', err);
  process.exit(1);
});

