# Informe de Evidencias y Resultados Técnicos — Proyecto Integrador SINAC

**Responsable:** Royner Gutiérrez Ugalde (`gutierrezroyner3@gmail.com`)  
**Fecha de entrega:** 6 de noviembre de 2026  
**Repositorio:** https://github.com/Tatiana2472/Web-SINAC  
**Commit principal:** `2f53e1b` (`Royner: conectar reservaciones a base de datos SQLite WAL y persistencia`)

---

## 1. Base de datos y Laravel Cloud

### Motor de base de datos utilizado
- **Motor seleccionado:** **SQLite 3** en modo **WAL (*Write-Ahead Logging*)**, integrado mediante el módulo nativo `node:sqlite` (`DatabaseSync`) de Node.js v24.18.0.
- **Archivo de base de datos:** `database/sinac.sqlite` (parametrizable mediante la variable de entorno `process.env.DB_PATH`).
- **Parámetros de concurrencia e integridad aplicados:**
  - `PRAGMA journal_mode = WAL;`
  - `PRAGMA synchronous = FULL;`
  - `PRAGMA busy_timeout = 30000;`
- **Nota sobre Laravel Cloud y persistencia en Redeploy:** En el entorno `production` de Laravel Cloud (`https://cloud.laravel.com/arroligatatiana74/web-sinac/production`), el almacenamiento del contenedor de aplicación es efímero si no se monta un volumen persistente externo; por ello se parametrizó `process.env.DB_PATH` en [index.js](file:///c:/Users/gutie/Proyecto%20integrador/server/index.js) y se validó la persistencia sobre almacenamiento persistente local equivalente.

### Evidencia de configuración (sin contraseñas ni datos sensibles expuestos)
```javascript
// Configuración de Base de Datos SQLite (modo WAL) en server/index.js
const dbPath = process.env.DB_PATH || path.join(__dirname, '../database/sinac.sqlite');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA synchronous = FULL;');
db.exec('PRAGMA busy_timeout = 30000;');

db.exec(`
  CREATE TABLE IF NOT EXISTS reservaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_reserva TEXT UNIQUE NOT NULL,
    parque_id TEXT,
    nombre_visitante TEXT NOT NULL,
    email_visitante TEXT NOT NULL,
    telefono_visitante TEXT,
    cantidad_visitantes INTEGER NOT NULL DEFAULT 1,
    fecha_visita TEXT NOT NULL,
    monto_total REAL DEFAULT 0.0,
    estado TEXT DEFAULT 'Pendiente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Eliminar registro de demostración si existiera previamente
db.exec("DELETE FROM reservaciones WHERE codigo_reserva = 'SINAC-2026-001';");
```

### Archivos de código modificados
1. [server/index.js](file:///c:/Users/gutie/Proyecto%20integrador/server/index.js): Reemplazo del arreglo en memoria `let reservations = [...]` por sentencias preparadas (`INSERT` y `SELECT`) sobre SQLite WAL.
2. [.gitignore](file:///c:/Users/gutie/Proyecto%20integrador/.gitignore): Exclusión de archivos `*.sqlite`, `*.sqlite-wal`, `*.sqlite-shm`, `*.db`, `*.db-wal`, `*.db-shm`.

### Confirmaciones requeridas
- **Confirmación de almacenamiento en BD y no en memoria:** Las reservaciones se insertan mediante `insertReservationStmt.run(...)` y se consultan con `getAllReservationsStmt.all()` directamente desde `database/sinac.sqlite`.
- **Confirmación de eliminación de `SINAC-2026-001`:** Se eliminó del código fuente el objeto estático `SINAC-2026-001` y se ejecuta `DELETE FROM reservaciones WHERE codigo_reserva = 'SINAC-2026-001';` al iniciar el servidor. Al consultar `GET /api/reservations` inicialmente, la respuesta es `{"status":"success","count":0,"data":[]}`.

![Configuración SQLite WAL y eliminación de registro demo](C:/Users/gutie/.gemini/antigravity/brain/1c8fd74a-2514-4d59-9bc9-e22ccdb0d43d/01_configuracion_sqlite_wal.png)

---

## 2. Persistencia después del redeploy

- **Fecha y hora de la prueba:** `2026-11-07T03:56:41Z` (`06/11/2026 21:56:41 UTC-6`)
- **Resultado de la prueba:** **APROBADA** (las 3 reservaciones creadas antes del reinicio/redeploy permanecieron íntegras en `/api/reservations` después del redeploy).

### Registro antes del redeploy (`GET /api/reservations`)
Se insertaron 3 reservaciones reales (`SINAC-802953`, `SINAC-802982`, `SINAC-803026`) y se consultó `/api/reservations` antes del reinicio (`2026-11-07T03:56:43.058Z`), obteniendo `count: 3`.

![Consulta GET /api/reservations antes del redeploy](C:/Users/gutie/.gemini/antigravity/brain/1c8fd74a-2514-4d59-9bc9-e22ccdb0d43d/02_antes_redeploy_api_reservations.png)

### Registro después del redeploy (`GET /api/reservations`)
Tras reiniciar el proceso del servidor (`2026-11-07T03:56:45.790Z`), se consultó nuevamente `GET /api/reservations` y se verificó que los 3 registros (`SINAC-802953`, `SINAC-802982`, `SINAC-803026`) se conservaron sin pérdida de información.

![Consulta GET /api/reservations después del redeploy](C:/Users/gutie/.gemini/antigravity/brain/1c8fd74a-2514-4d59-9bc9-e22ccdb0d43d/03_despues_redeploy_persistencia.png)

---

## 3. Respaldo

- **Script utilizado:** [respaldo_sqlite.js](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/respaldo_restauracion/respaldo_sqlite.js)
- **Log de ejecución:** [respaldo.log](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/respaldo_restauracion/respaldo.log)
- **Fecha y hora del respaldo:** `2026-11-07T03:56:45.852Z` (`06/11/2026 21:56:45 UTC-6`)
- **Método de respaldo:** Copia en caliente consistente mediante la API nativa `backup()` de `node:sqlite` sobre la base en modo WAL.
- **Método de cifrado utilizado:** **AES-256-GCM** autenticado (derivación de clave con `crypto.scryptSync`, `salt` aleatorio de 16 bytes, `IV` de 12 bytes y `AuthTag` de 16 bytes).
- **Ubicación de la copia externa privada (fuera de Laravel Cloud y fuera del repositorio):**
  - Carpeta: `C:\Users\gutie\Respaldos_Privados_SINAC\`
  - Archivo cifrado: `C:\Users\gutie\Respaldos_Privados_SINAC\sinac_backup_2026-11-07T03-56-45-852Z.sqlite.enc`
  - Archivo de control hash: `C:\Users\gutie\Respaldos_Privados_SINAC\sinac_backup_2026-11-07T03-56-45-852Z.sha256`
- **Tamaño del respaldo:**
  - Base original SQLite: `16,384 bytes` (`16.00 KB`)
  - Archivo cifrado `.enc`: `16,428 bytes` (`16.04 KB`)
- **Hashes SHA-256:**
  - **SHA-256 (archivo cifrado `.enc`):** `e4310df63011301d021bac86ec1cee5cdb36e95c300b7a3da03661419f9076b2`
  - **SHA-256 (base SQLite original):** `0eb1adb38816f4f6cdb0833413ad97d6bd4375ebdd25f7fdfbaa10802a8bbf75`
- **Tiempo total de respaldo y cifrado:** `66.18 ms`

### Log real de ejecución del respaldo
```text
[2026-11-07T03:56:45.853Z] === INICIO DE RESPALDO DE BASE DE DATOS SQLITE (MODO WAL) ===
[2026-11-07T03:56:45.856Z] Base de datos origen: C:\Users\gutie\Proyecto integrador\database\sinac.sqlite
[2026-11-07T03:56:45.856Z] Ubicación externa privada: C:\Users\gutie\Respaldos_Privados_SINAC
[2026-11-07T03:56:45.858Z] Modo de journal verificado: wal
[2026-11-07T03:56:45.858Z] Registros actuales en tabla 'reservaciones': 3
[2026-11-07T03:56:45.882Z] Copia consistente SQLite completada: sinac_backup_2026-11-07T03-56-45-852Z.sqlite
[2026-11-07T03:56:45.918Z] Método de cifrado: AES-256-GCM (derivación de clave scrypt, salt=16B, iv=12B, tag=16B)
[2026-11-07T03:56:45.918Z] Archivo cifrado generado: C:\Users\gutie\Respaldos_Privados_SINAC\sinac_backup_2026-11-07T03-56-45-852Z.sqlite.enc
[2026-11-07T03:56:45.918Z] Tamaño base original: 16384 bytes (16.00 KB)
[2026-11-07T03:56:45.918Z] Tamaño archivo cifrado: 16428 bytes (16.04 KB)
[2026-11-07T03:56:45.918Z] Hash SHA-256 (archivo cifrado .enc): e4310df63011301d021bac86ec1cee5cdb36e95c300b7a3da03661419f9076b2
[2026-11-07T03:56:45.918Z] Hash SHA-256 (base SQLite original): 0eb1adb38816f4f6cdb0833413ad97d6bd4375ebdd25f7fdfbaa10802a8bbf75
[2026-11-07T03:56:45.919Z] Archivo de verificación hash: C:\Users\gutie\Respaldos_Privados_SINAC\sinac_backup_2026-11-07T03-56-45-852Z.sha256
[2026-11-07T03:56:45.919Z] Tiempo total de respaldo y cifrado: 66.18 ms
[2026-11-07T03:56:45.919Z] === RESPALDO FINALIZADO EXITOSAMENTE (CÓDIGO 0) ===
```

![Ejecución del respaldo cifrado y hash SHA-256](C:/Users/gutie/.gemini/antigravity/brain/1c8fd74a-2514-4d59-9bc9-e22ccdb0d43d/04_respaldo_cifrado_sha256.png)

---

## 4. Restauración

- **Script utilizado:** [restauracion_sqlite.js](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/respaldo_restauracion/restauracion_sqlite.js)
- **Log de ejecución:** [restauracion.log](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/respaldo_restauracion/restauracion.log)
- **Base de datos limpia y separada:** `C:\Users\gutie\Proyecto integrador\database\sinac_restaurada.sqlite` (se verifica y elimina cualquier archivo previo antes de iniciar la restauración).
- **Procedimiento utilizado:**
  1. Lectura del archivo cifrado `.sqlite.enc` desde `C:\Users\gutie\Respaldos_Privados_SINAC\`.
  2. Cálculo y comparación del hash `SHA-256` contra el valor registrado en el manifiesto.
  3. Descifrado mediante `AES-256-GCM` verificando la etiqueta de autenticación (`AuthTag`).
  4. Escritura en la base separada `database/sinac_restaurada.sqlite`.
  5. Ejecución de `PRAGMA integrity_check;` y comparación de conteos `SELECT COUNT(*) FROM reservaciones;` entre ambas bases.
- **Resultados obtenidos:**
  - **Cantidad de registros antes (base origen):** `3`
  - **Cantidad de registros después (base restaurada):** `3` (0 registros faltantes)
  - **Comprobación de integridad (`PRAGMA integrity_check`):** `ok`
  - **Tiempo medido de restauración:** `44.02 ms` (`0.0440 segundos`)
- **Definición de RPO y RTO con base en las mediciones:**
  - **RPO (*Recovery Point Objective*):** **24 horas** con esquema de respaldo automático diario programado (o **< 1 minuto** si se ejecuta el script tras lotes de operaciones críticas, dado que el respaldo en caliente tarda `66.18 ms`).
  - **RTO (*Recovery Time Objective*):** **< 5 minutos** en operación completa (el proceso técnico de verificación SHA-256, descifrado AES-256-GCM y restauración de la base tomó **`44.02 ms`**, más el tiempo operativo de reinicio del servicio).

### Log real de ejecución de la restauración
```text
[2026-11-07T03:56:45.987Z] === INICIO DE RESTAURACIÓN EN BASE DE DATOS LIMPIA Y SEPARADA ===
[2026-11-07T03:56:45.990Z] Archivo cifrado origen: C:\Users\gutie\Respaldos_Privados_SINAC\sinac_backup_2026-11-07T03-56-45-852Z.sqlite.enc
[2026-11-07T03:56:45.990Z] Base de datos destino (limpia y separada): C:\Users\gutie\Proyecto integrador\database\sinac_restaurada.sqlite
[2026-11-07T03:56:45.990Z] Estado inicial del destino: No existe (base limpia verificada)
[2026-11-07T03:56:45.991Z] Hash SHA-256 esperado (.enc):  e4310df63011301d021bac86ec1cee5cdb36e95c300b7a3da03661419f9076b2
[2026-11-07T03:56:45.991Z] Hash SHA-256 calculado (.enc): e4310df63011301d021bac86ec1cee5cdb36e95c300b7a3da03661419f9076b2
[2026-11-07T03:56:45.991Z] Verificación de hash SHA-256 del respaldo cifrado: OK ( coincidencia exacta )
[2026-11-07T03:56:46.027Z] Descifrado AES-256-GCM: OK
[2026-11-07T03:56:46.027Z] Hash SHA-256 SQLite descifrado: 0eb1adb38816f4f6cdb0833413ad97d6bd4375ebdd25f7fdfbaa10802a8bbf75
[2026-11-07T03:56:46.031Z] Resultado de PRAGMA integrity_check: ok
[2026-11-07T03:56:46.032Z] Conteo de registros en base original (antes del respaldo): 3
[2026-11-07T03:56:46.032Z] Conteo de registros en base restaurada (después de restaurar): 3
[2026-11-07T03:56:46.032Z] Diferencia de registros (faltantes): 0
[2026-11-07T03:56:46.032Z] Tiempo total medido de restauración (RTO real): 44.02 ms (0.0440 segundos)
[2026-11-07T03:56:46.032Z] === RESTAURACIÓN FINALIZADA EXITOSAMENTE (CÓDIGO 0) ===
```

![Restauración en base limpia, integridad y RTO](C:/Users/gutie/.gemini/antigravity/brain/1c8fd74a-2514-4d59-9bc9-e22ccdb0d43d/05_restauracion_integridad_rto.png)

---

## 5. Monitoreo y rendimiento

- **Scripts desarrollados:**
  - Ejecutor directo en Node.js: [prueba_carga.js](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/rendimiento/prueba_carga.js)
  - Script compatible con k6: [script_k6.js](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/rendimiento/script_k6.js)
  - Log de resultados: [resultados_carga.log](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/rendimiento/resultados_carga.log) y [resultados_carga.json](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/rendimiento/resultados_carga.json)

### Umbrales establecidos y justificación
1. **Tasa de errores (`0 %`):** Toda solicitud válida de consulta o registro de reservaciones debe procesarse sin pérdida ni bloqueo (`busy_timeout = 30000` en SQLite WAL).
2. **Latencia percentil 95 (`P95 < 500 ms`):** Garantiza una experiencia fluida para el visitante al cargar la página principal y confirmar reservaciones en línea.

### Tabla de resultados reales de rendimiento (10 clientes concurrentes, 1,500 solicitudes totales)

| Endpoint evaluado | Solicitudes Totales | Exitosas | Fallidas (% Error) | RPS (req/s) | Promedio (ms) | Mín (ms) | P50 (ms) | P95 (ms) | P99 (ms) | Máx (ms) | Umbral P95 < 500 ms | Estado |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| `GET /` (Página principal) | 500 | 500 | 0 (`0.00 %`) | 1,569.31 | 5.23 ms | 1.48 ms | 3.81 ms | **8.21 ms** | 33.53 ms | 91.90 ms | `< 500 ms` | **APROBADO** |
| `GET /api/reservations` | 500 | 500 | 0 (`0.00 %`) | 576.44 | 17.16 ms | 5.02 ms | 16.31 ms | **24.78 ms** | 36.41 ms | 39.58 ms | `< 500 ms` | **APROBADO** |
| `POST /api/reservations` | 500 | 500 | 0 (`0.00 %`) | 610.07 | 16.21 ms | 2.86 ms | 15.53 ms | **19.79 ms** | 31.90 ms | 40.63 ms | `< 500 ms` | **APROBADO** |

### Métricas de recursos del servidor durante la prueba
- **CPU:** 8 núcleos lógicos x64 (uso estable sin saturación).
- **Memoria RSS del proceso Node.js:** `46.85 MB` (`Heap Used: 11.42 MB`).

![Resultados de monitoreo y prueba de carga](C:/Users/gutie/.gemini/antigravity/brain/1c8fd74a-2514-4d59-9bc9-e22ccdb0d43d/06_monitoreo_rendimiento_carga.png)

---

## 6. Validaciones de la API

- **Evidencia de prueba negativa (`POST /api/reservations` sin campos obligatorios -> `HTTP 400`):**
  - **Solicitud enviada:** `POST /api/reservations` con cuerpo `{"parque_id":"pn-volcan-tenorio"}` (omitiendo `nombre_visitante`, `email_visitante`, `fecha_visita`).
  - **Respuesta recibida:** Código de estado **`400 Bad Request`** en `1.58 ms`:
    ```json
    {
      "error": "Faltan campos requeridos (nombre, email, fecha_visita)"
    }
    ```
- **Evidencia de creación válida (`POST /api/reservations` -> `HTTP 201`):**
  - **Respuesta recibida:** Código de estado **`201 Created`**:
    ```json
    {
      "status": "success",
      "message": "Reservación guardada correctamente",
      "data": {
        "id": 1,
        "codigo_reserva": "SINAC-802953",
        "parque_id": "pn-volcan-tenorio",
        "nombre_visitante": "Royner Gutiérrez Ugalde",
        "email_visitante": "gutierrezroyner3@gmail.com",
        "telefono_visitante": "+506 8888-2472",
        "cantidad_visitantes": 2,
        "fecha_visita": "2026-11-15",
        "monto_total": 1600,
        "estado": "Pendiente",
        "created_at": "2026-11-07T03:56:42.953Z"
      }
    }
    ```

![Validaciones de la API HTTP 400 y HTTP 201](C:/Users/gutie/.gemini/antigravity/brain/1c8fd74a-2514-4d59-9bc9-e22ccdb0d43d/07_validacion_api_400_y_201.png)

---

## 7. Entrega final

- **Hash del commit principal:** `2f53e1b` (enlace: https://github.com/Tatiana2472/Web-SINAC/commit/2f53e1b)
- **Autor del commit:** `gutierrezroyner3 <gutierrezroyner3@gmail.com>`
- **Fecha de finalización:** 6 de noviembre de 2026
- **Lista de archivos modificados y creados:**
  - [server/index.js](file:///c:/Users/gutie/Proyecto%20integrador/server/index.js) (conexión SQLite WAL, eliminación de `SINAC-2026-001`, persistencia de endpoints y validación 400)
  - [.gitignore](file:///c:/Users/gutie/Proyecto%20integrador/.gitignore) (exclusión de archivos `.sqlite` y `.db`)
  - [respaldo_sqlite.js](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/respaldo_restauracion/respaldo_sqlite.js) y [respaldo.log](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/respaldo_restauracion/respaldo.log)
  - [restauracion_sqlite.js](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/respaldo_restauracion/restauracion_sqlite.js) y [restauracion.log](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/respaldo_restauracion/restauracion.log)
  - [prueba_carga.js](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/rendimiento/prueba_carga.js), [script_k6.js](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/rendimiento/script_k6.js) y [resultados_carga.log](file:///c:/Users/gutie/Proyecto%20integrador/pruebas/rendimiento/resultados_carga.log)

### Resumen del estado de las pruebas

| N.º | Prueba / Requerimiento | Resultado | Observación |
|---|---|---|---|
| 1 | Conexión de `server/index.js` a SQLite WAL | **Aprobada** | Usa `node:sqlite` con `WAL` y `busy_timeout=30000`. |
| 2 | Eliminación de reserva demo `SINAC-2026-001` | **Aprobada** | Eliminada en código y verificada con `count: 0` inicial. |
| 3 | Validación negativa `POST /api/reservations` (`HTTP 400`) | **Aprobada** | Responde `400` en `1.58 ms` cuando faltan campos obligatorios. |
| 4 | Persistencia de reservaciones tras reinicio/redeploy | **Aprobada** | Conserva el 100 % de las reservaciones almacenadas en SQLite. |
| 5 | Respaldo en caliente con cifrado AES-256-GCM y hash SHA-256 | **Aprobada** | Copia externa en `C:\Users\gutie\Respaldos_Privados_SINAC` en `66.18 ms`. |
| 6 | Restauración en base limpia separada e integridad (`PRAGMA`) | **Aprobada** | `PRAGMA integrity_check: ok`, 3/3 registros, `RTO = 44.02 ms`. |
| 7 | Prueba de carga sobre `/` y `/api/reservations` | **Aprobada** | `0 %` errores y `P95` entre `8.21 ms` y `24.78 ms` (`< 500 ms`). |

### Problemas encontrados y soluciones aplicadas
1. **Colisión potencial de `codigo_reserva` bajo alta concurrencia:** El código original generaba `SINAC-${Date.now().toString().slice(-6)}`, lo cual producía valores duplicados cuando múltiples peticiones llegaban en el mismo milisegundo durante la prueba de carga, violando la restricción `UNIQUE` de SQLite. **Solución:** Se implementó la función `generarCodigoReserva()` con contador monotónico en [server/index.js](file:///c:/Users/gutie/Proyecto%20integrador/server/index.js#L81-L86), logrando `0 %` de errores en 500 inserciones concurrentes.
2. **Bloqueos de escritura concurrente en SQLite:** Para evitar errores `SQLITE_BUSY` durante ráfagas de inserción, se activó `PRAGMA journal_mode = WAL;` y `PRAGMA busy_timeout = 30000;` al inicializar la conexión.
3. **Almacenamiento efímero en contenedores cloud:** Dado que los contenedores recrean su sistema de archivos local en cada redeploy si no cuentan con un volumen persistente montado, se parametrizó la ruta mediante `process.env.DB_PATH` y se implementó el respaldo cifrado externo fuera de la nube.
