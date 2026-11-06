
import sqlite3
import threading
import time
import uuid
from datetime import datetime
from pathlib import Path

DB = Path(r"C:\PruebasBD\sqlite_60s.db")
HILOS = 10
DURACION = 60
PREFIJO = "SQL-" + uuid.uuid4().hex[:8]

exitos = 0
errores = []
bloqueo = threading.Lock()
inicio_evento = threading.Event()

# Crear una base independiente para esta prueba
with sqlite3.connect(DB) as conexion:
    conexion.execute("PRAGMA journal_mode=WAL")
    conexion.execute("PRAGMA synchronous=FULL")
    conexion.execute("""
        CREATE TABLE IF NOT EXISTS reservaciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT NOT NULL UNIQUE,
            visitante TEXT NOT NULL,
            fecha_visita TEXT NOT NULL,
            cantidad_personas INTEGER NOT NULL
        )
    """)
    conexion.commit()

def insertar(numero_hilo):
    global exitos

    try:
        conexion = sqlite3.connect(DB, timeout=30)
        conexion.execute("PRAGMA busy_timeout=30000")
        inicio_evento.wait()

        contador = 0

        while time.perf_counter() < limite:
            contador += 1
            codigo = f"{PREFIJO}-{numero_hilo}-{contador}"

            try:
                conexion.execute(
                    """INSERT INTO reservaciones
                    (codigo, visitante, fecha_visita,
                     cantidad_personas)
                    VALUES (?, ?, ?, ?)""",
                    (
                        codigo,
                        f"Visitante {numero_hilo}",
                        "2026-11-10",
                        2
                    )
                )
                conexion.commit()

                with bloqueo:
                    exitos += 1

            except Exception as e:
                conexion.rollback()
                with bloqueo:
                    errores.append(str(e))

        conexion.close()

    except Exception as e:
        with bloqueo:
            errores.append(str(e))

print("PRUEBA DE CONCURRENCIA SQLITE WAL")
print("Fecha:", datetime.now())
print("Hilos:", HILOS)
print("Duracion:", DURACION, "segundos")
print("Base:", DB)

hilos = [
    threading.Thread(target=insertar, args=(n,))
    for n in range(HILOS)
]

for hilo in hilos:
    hilo.start()

inicio = time.perf_counter()
limite = inicio + DURACION
inicio_evento.set()

for hilo in hilos:
    hilo.join()

tiempo_total = time.perf_counter() - inicio

with sqlite3.connect(DB) as conexion:
    almacenados = conexion.execute(
        "SELECT COUNT(*) FROM reservaciones WHERE codigo LIKE ?",
        (PREFIJO + "-%",)
    ).fetchone()[0]

    integridad = conexion.execute(
        "PRAGMA integrity_check"
    ).fetchone()[0]

    modo = conexion.execute(
        "PRAGMA journal_mode"
    ).fetchone()[0]

print("\nRESULTADOS")
print("Modo:", modo)
print("Inserciones exitosas:", exitos)
print("Errores:", len(errores))
print("Tiempo total:", round(tiempo_total, 3), "segundos")
print("Inserciones por segundo:",
      round(exitos / tiempo_total, 2))
print("Registros almacenados:", almacenados)
print("Registros faltantes:", exitos - almacenados)
print("Integridad:", integridad)

if errores:
    print("Ejemplos de errores:", errores[:5])

print("\nPRUEBA FINALIZADA")
