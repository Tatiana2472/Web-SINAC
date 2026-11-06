
import sqlite3
import time
import os
from pathlib import Path

DB = Path(r"C:\PruebasBD\interrupcion.db")

conexion = sqlite3.connect(str(DB))
conexion.execute("PRAGMA journal_mode=WAL")
conexion.execute("PRAGMA synchronous=FULL")

conexion.execute("""
CREATE TABLE IF NOT EXISTS reservaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT NOT NULL UNIQUE,
    visitante TEXT NOT NULL
)
""")
conexion.commit()

print("PRUEBA DE INTERRUPCION SQLITE WAL", flush=True)
print("PID del proceso:", os.getpid(), flush=True)
print("Base de datos:", DB, flush=True)
print("Modo WAL activado", flush=True)

contador = 0

while True:
    contador += 1

    conexion.execute(
        """INSERT INTO reservaciones (codigo, visitante)
        VALUES (?, ?)""",
        (f"INT-{contador}", "Visitante Prueba")
    )

    conexion.commit()

    print(
        f"Reservacion {contador} confirmada",
        flush=True
    )

    time.sleep(0.2)
