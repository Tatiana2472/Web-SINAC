
import sqlite3
import threading
import time
from datetime import datetime
from pathlib import Path

DB = Path(r"C:\PruebasBD\reservaciones.db")
HILOS = 10
INSERCIONES_POR_HILO = 100

exitos = 0
errores = []
bloqueo = threading.Lock()

def insertar(numero_hilo):
    global exitos

    conexion = sqlite3.connect(str(DB), timeout=30)
    conexion.execute("PRAGMA busy_timeout=30000")

    for i in range(INSERCIONES_POR_HILO):
        codigo = f"CONC-{numero_hilo}-{i}"

        try:
            conexion.execute(
                """INSERT INTO reservaciones
                (codigo, visitante, fecha_visita, cantidad_personas)
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

def main():
    if not DB.exists():
        print("ERROR: No se encuentra la base de datos.")
        return

    conexion = sqlite3.connect(str(DB))
    modo = conexion.execute("PRAGMA journal_mode").fetchone()[0]
    conexion.close()

    print("PRUEBA DE CONCURRENCIA SQLITE")
    print("Fecha:", datetime.now())
    print("Modo:", modo)
    print("Hilos:", HILOS)
    print("Inserciones por hilo:", INSERCIONES_POR_HILO)

    inicio = time.perf_counter()

    hilos = [
        threading.Thread(target=insertar, args=(n,))
        for n in range(HILOS)
    ]

    for hilo in hilos:
        hilo.start()

    for hilo in hilos:
        hilo.join()

    duracion = time.perf_counter() - inicio

    print("\nRESULTADOS")
    print("Inserciones esperadas:", HILOS * INSERCIONES_POR_HILO)
    print("Inserciones exitosas:", exitos)
    print("Errores:", len(errores))
    print("Tiempo total:", round(duracion, 3), "segundos")
    print("Inserciones por segundo:", round(exitos / duracion, 2))

    conexion = sqlite3.connect(str(DB))
    total = conexion.execute(
        "SELECT COUNT(*) FROM reservaciones WHERE codigo LIKE 'CONC-%'"
    ).fetchone()[0]
    conexion.close()

    print("Registros concurrentes almacenados:", total)

    if errores:
        print("Ejemplos de errores:", errores[:5])

if __name__ == "__main__":
    main()
