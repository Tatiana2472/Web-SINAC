
import psycopg
import time
import os
import getpass
import uuid
from datetime import datetime

print("PRUEBA DE INTERRUPCION POSTGRESQL 18.6")
print("Fecha:", datetime.now(), flush=True)
print("PID del proceso:", os.getpid(), flush=True)

password = getpass.getpass("Contrasena PostgreSQL: ")

conexion = psycopg.connect(
    host="localhost",
    port=5432,
    dbname="pruebas_tenorio",
    user="postgres",
    password=password
)

prefijo = "INTPG-" + uuid.uuid4().hex[:8]
contador = 0

print("Identificador de prueba:", prefijo, flush=True)
print("Iniciando inserciones...", flush=True)

while True:
    contador += 1

    with conexion.cursor() as cursor:
        cursor.execute(
            """INSERT INTO reservaciones
            (codigo, visitante, fecha_visita, cantidad_personas)
            VALUES (%s, %s, %s, %s)""",
            (
                f"{prefijo}-{contador}",
                "Visitante Prueba",
                "2026-11-10",
                2
            )
        )

    conexion.commit()

    print(
        f"Reservacion {contador} confirmada",
        flush=True
    )

    time.sleep(0.2)
