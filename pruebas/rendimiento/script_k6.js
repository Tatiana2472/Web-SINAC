import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    carga_sinac: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '10s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '5s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate==0.00'],       // 0 % de errores permitido
    http_req_duration: ['p(95)<500'],      // P95 menor a 500 ms
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001';

export default function () {
  // 1. Prueba sobre página principal (GET /)
  const resHome = http.get(`${BASE_URL}/`);
  check(resHome, {
    'GET / responde 200': (r) => r.status === 200,
    'GET / tiempo < 500ms': (r) => r.timings.duration < 500,
  });

  // 2. Prueba de consulta de reservaciones (GET /api/reservations)
  const resGetApi = http.get(`${BASE_URL}/api/reservations`);
  check(resGetApi, {
    'GET /api/reservations responde 200': (r) => r.status === 200,
    'GET /api/reservations devuelve status success': (r) => r.json('status') === 'success',
  });

  // 3. Prueba de creación de reservación (POST /api/reservations)
  const payload = JSON.stringify({
    parque_id: 'pn-volcan-tenorio',
    nombre_visitante: `Visitante Carga VU-${__VU}-${__ITER}`,
    email_visitante: `vu${__VU}_${__ITER}@sinac.go.cr`,
    telefono_visitante: '+506 8888-9999',
    cantidad_visitantes: 2,
    fecha_visita: '2026-11-20',
  });

  const resPostApi = http.post(`${BASE_URL}/api/reservations`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(resPostApi, {
    'POST /api/reservations responde 201': (r) => r.status === 201,
  });

  sleep(0.2);
}

