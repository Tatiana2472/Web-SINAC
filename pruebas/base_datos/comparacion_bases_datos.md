

\# Evaluación comparativa de SQLite WAL y PostgreSQL 18.6



\*\*Proyecto:\*\* Parque Nacional Volcán Tenorio  

\*\*Curso:\*\* ITI-625 Proyecto Integrador II  

\*\*Responsable:\*\* Jocelyn Carballo Castillo  

\*\*Fecha:\*\* 6 de noviembre de 2026  

\*\*Entorno:\*\* Windows, Python 3.14.6, SQLite 3.50.4 y PostgreSQL 18.6.



\## 1. Objetivo



Evaluar el comportamiento de SQLite en modo WAL y

PostgreSQL 18.6 mediante pruebas de escrituras

concurrentes, interrupción forzada, integridad,

respaldo y recuperación de datos.



Los resultados obtenidos permiten fundamentar

técnicamente la selección del motor de base de datos

para el sistema de reservaciones del Parque Nacional

Volcán Tenorio.



Las pruebas se realizaron en un entorno local

controlado utilizando datos ficticios.



\## 2. Configuración de los motores



\### SQLite



Se creó una base de datos de reservaciones utilizando

Python y el módulo sqlite3.



Se habilitó el modo Write-Ahead Logging (WAL)

mediante la instrucción:



PRAGMA journal\_mode=WAL;



El resultado obtenido fue `wal`.



Se creó la tabla reservaciones y se comprobó

correctamente la inserción y consulta de registros.



\### PostgreSQL



Se utilizó PostgreSQL 18.6 y el controlador

psycopg 3.3.8 para conectar Python con el motor.



Se creó la base de datos pruebas\_tenorio y una tabla

de reservaciones con estructura equivalente a SQLite.



La creación de la tabla, inserción y consulta de

registros se realizaron satisfactoriamente.



\## 3. Pruebas de escrituras concurrentes



Se utilizaron 10 hilos de trabajo para evaluar

las inserciones concurrentes.



Las pruebas principales tuvieron una duración

aproximada de 60 segundos.



| Indicador | SQLite 1 | SQLite 2 | PostgreSQL |

|---|---:|---:|---:|

| Hilos | 10 | 10 | 10 |

| Duración (s) | 60.355 | 60.506 | 60.005 |

| Inserciones exitosas | 122346 | 122462 | 241882 |

| Errores | 1 | 0 | 0 |

| Inserciones/s | 2027.09 | 2023.97 | 4031.01 |

| Registros faltantes | 0 | 0 | 0 |



\### Análisis de resultados



PostgreSQL registró 4031.01 inserciones por segundo,

mientras que SQLite presentó resultados cercanos

a 2025 inserciones por segundo.



En las pruebas realizadas, PostgreSQL obtuvo

aproximadamente el doble del rendimiento registrado

por SQLite.



Durante la primera ejecución de SQLite se presentó

un error de bloqueo de la base de datos. La segunda

ejecución finalizó sin errores.



En las tres ejecuciones se conservaron todas las

inserciones confirmadas.



\## 4. Pruebas de interrupción forzada



\### SQLite WAL



Se utilizó el comando:



taskkill /F /PID 17384



Resultados:



\- Reservaciones confirmadas: 600.

\- Reservaciones recuperadas: 600.

\- Registros confirmados perdidos: 0.

\- PRAGMA integrity\_check: ok.

\- Modo WAL verificado.



\### PostgreSQL 18.6



Se utilizó el comando:



taskkill /F /PID 18504



Resultados:



\- Reservaciones confirmadas: 341.

\- Reservaciones recuperadas: 341.

\- Registros confirmados perdidos: 0.

\- Códigos únicos verificados: 341.



\### Resultado



Ambos motores conservaron la totalidad de las

reservaciones confirmadas después de la interrupción

forzada de los procesos de inserción.



Las consultas posteriores permitieron comprobar

la disponibilidad de los registros almacenados.



\## 5. Integridad de los datos



\### SQLite WAL



Se ejecutó la instrucción:



PRAGMA integrity\_check;



El resultado fue `ok`.



También se verificó que todos los registros

confirmados permanecieran almacenados.



\### PostgreSQL



Se realizaron consultas SQL para comprobar

el total de registros y la ausencia de códigos

de reservación duplicados.



Resultados de la prueba de concurrencia:



\- Inserciones concurrentes: 241882.

\- Reservación inicial: 1.

\- Total verificado: 241883.

\- Códigos duplicados: 0.



Los resultados de las consultas fueron satisfactorios.



\## 6. Respaldo y recuperación



\### SQLite WAL



Se utilizó la API sqlite3.backup() de Python

para generar una copia consistente de la base.



Resultados:



\- Registros originales: 244808.

\- Registros en la copia: 244808.

\- Registros faltantes: 0.

\- PRAGMA integrity\_check: ok.



La copia pudo abrirse y consultarse correctamente

como una base independiente.



\### PostgreSQL 18.6



Se generó un respaldo utilizando pg\_dump

en formato personalizado.



Se verificó su contenido mediante pg\_restore --list.



Posteriormente se restauró en una base independiente

llamada tenorio\_restaurado.



Resultados:



\- Código de salida de restauración: 0.

\- Registros recuperados: 242224.

\- Registros de la prueba de interrupción: 341.

\- Registros faltantes: 0.



El proceso de restauración finalizó correctamente

y los conteos coincidieron con los datos esperados.



\## 7. Comparación técnica



| Criterio | SQLite WAL | PostgreSQL |

|---|---|---|

| Inserción y consulta | Satisfactoria | Satisfactoria |

| Concurrencia | 2 ejecuciones | 1 ejecución |

| Rendimiento aprox. | 2025 inserciones/s | 4031 inserciones/s |

| Conservación de registros | Completa | Completa |

| Interrupción forzada | 600 recuperados | 341 recuperados |

| Integridad verificada | PRAGMA: ok | Conteos y unicidad |

| Respaldo | sqlite3.backup() | pg\_dump |

| Recuperación | 244808 registros | 242224 registros |



\## 8. Decisión del equipo



El equipo del Proyecto Integrador, en coordinación

con Royner Gutiérrez Ugalde, decidió utilizar

SQLite en modo WAL para el sistema de reservaciones

del Parque Nacional Volcán Tenorio.



La decisión considera la escala prevista del

proyecto, la simplicidad de administración,

la utilización de recursos y las necesidades

operativas de la aplicación.



Aunque PostgreSQL obtuvo un rendimiento superior

en las pruebas locales, SQLite demostró capacidad

para procesar más de 2000 inserciones por segundo,

conservar las transacciones confirmadas y generar

copias consistentes de la información.



También se toma en consideración que SQLite

no requiere administrar un servicio de base de

datos independiente.



La selección de SQLite corresponde a una decisión

del equipo fundamentada en el alcance del piloto

y los resultados de las pruebas realizadas.



\## 9. Conclusiones



Las pruebas permitieron analizar el comportamiento

de ambos motores bajo diferentes condiciones.



PostgreSQL presentó mayor rendimiento en las

escrituras concurrentes evaluadas.



SQLite WAL mostró resultados satisfactorios en

conservación de datos, recuperación después de

interrupciones y generación de respaldos consistentes.



La comparación proporcionó evidencia técnica

para documentar la selección de SQLite WAL

realizada por el equipo.



\## 10. Control de versiones



Repositorio:

https://github.com/Tatiana2472/Web-SINAC



Primer commit de pruebas SQLite:

3236384



Responsable de las pruebas y documentación:

Jocelyn Carballo Castillo.



Fecha: 6 de noviembre de 2026.



