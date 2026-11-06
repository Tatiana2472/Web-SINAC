
import psycopg
import threading
import time
import getpass
import uuid
from datetime import datetime

HILOS = 10
DURACION = 60
PREFIJO = "PG-" + uuid.uuid4().hex[:8]

exitos = 0
errores = []
bloqueo = threading.Lock()
inicio_evento = threading.Event()

password = getpass.getpass("Contrasena PostgreSQL: ")

CONFIG = {
    "host": "localhost",
    "port": 5432,
    "dbname": "pruebas_tenorio",
    "user": "postgres",
    "password": password,
    "connect_timeout": 10
}

def insertar(numero_hilo):
    global exitos

    try:
        with psycopg.connect(**CONFIG) as conexion:
            inicio_evento.wait()

            contador = 0

            while time.perf_counter() < limite:
                contador += 1
                codigo = f"{PREFIJO}-{numero_hilo}-{contador}"

                try:
                    with conexion.cursor() as cursor:
                        cursor.execute(
                            """INSERT INTO reservaciones
                            (codigo, visitante, fecha_visita,
                             cantidad_personas)
                            VALUES (%s, %s, %s, %s)""",
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

    except Exception as e:
        with bloqueo:
            errores.append(str(e))

print("PRUEBA DE CONCURRENCIA POSTGRESQL")
print("Fecha:", datetime.now())
print("Hilos:", HILOS)
print("Duracion:", DURACION, "segundos")

hilos = [
    threading.Thread(target=insertar, args=(n,))
    for n in range(HILOS)
]

for hilo in hilos:
    hilo.start()

# Permitir que las conexiones se establezcan
time.sleep(2)

inicio = time.perf_counter()
limite = inicio + DURACION
inicio_evento.set()

for hilo in hilos:
    hilo.join()

tiempo_total = time.perf_counter() - inicio

print("\nRESULTADOS")
print("Inserciones exitosas:", exitos)
print("Errores:", len(errores))
print("Tiempo total:", round(tiempo_total, 3), "segundos")
print("Inserciones por segundo:",
      round(exitos / tiempo_total, 2))

with psycopg.connect(**CONFIG) as conexion:
    with conexion.cursor() as cursor:
        cursor.execute(
            "SELECT COUNT(*) FROM reservaciones WHERE codigo LIKE %s",
            (PREFIJO + "-%",)
        )
        almacenados = cursor.fetchone()[0]

print("Registros almacenados:", almacenados)
print("Registros faltantes:", exitos - almacenados)

if errores:
    print("Ejemplos de errores:", errores[:5])

print("\nPRUEBA FINALIZADA")
