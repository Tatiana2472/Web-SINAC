

\# Pruebas de SQLite WAL



\*\*Proyecto:\*\* Parque Nacional Volcán Tenorio  

\*\*Responsable:\*\* Jocelyn Carballo Castillo  

\*\*Fecha:\*\* 6 de noviembre de 2026  

\*\*Entorno:\*\* Windows, Python 3.14.6 y SQLite 3.50.4



\## 1. Configuración inicial



\- Base de datos: reservaciones.db

\- Modo: WAL

\- Resultado de PRAGMA journal\_mode: wal

\- Inserción y consulta de reservación: exitosa



\## 2. Prueba de concurrencia



\- Hilos: 10

\- Inserciones por hilo: 100

\- Inserciones esperadas: 1000

\- Inserciones exitosas: 1000

\- Errores: 0

\- Tiempo total: 1.08 segundos

\- Rendimiento: 925.63 inserciones/segundo

\- Registros almacenados: 1000



Resultado: 100 % de inserciones exitosas.



\## 3. Interrupción inesperada



\- Base utilizada: interrupcion.db

\- Método: taskkill /F /PID 17384

\- Última reservación confirmada: 600

\- Reservaciones recuperadas: 600

\- Registros confirmados perdidos: 0

\- PRAGMA integrity\_check: ok

\- Modo WAL después de la interrupción: wal



Resultado: las 600 transacciones confirmadas se conservaron.



\## 4. Limitaciones



Las pruebas se realizaron en un entorno local

equivalente, no en Laravel Cloud.



La prueba de concurrencia ejecutó 1000 inserciones

mediante 10 hilos, pero todavía no cubre el escenario

de 10 clientes escribiendo durante 60 segundos

establecido en el documento del proyecto.



\## 5. Pendientes



\- Completar la prueba de concurrencia de 60 segundos.

\- Ejecutar las pruebas equivalentes con PostgreSQL.

\- Comparar los resultados de ambos motores.

\- Completar la tabla de decisión.



La elección final del motor permanece pendiente.



