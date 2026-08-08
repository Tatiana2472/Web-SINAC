# 🌿 Proyecto SINAC - Sede Caño Negro (UTN)

## 1. Descripción General

Este proyecto consiste en el rediseño de la página web oficial del Sistema Nacional de Áreas de Conservación (SINAC), específicamente para la Sede Caño Negro.

El desarrollo se realiza como parte de un proyecto académico en la Universidad Técnica Nacional (UTN). Los principales propósitos son:

- Modernizar la presencia digital del SINAC en la región.
- Promover el turismo sostenible y la conservación de la biodiversidad.
- Facilitar el acceso a la información sobre áreas protegidas y programas de conservación.
- Conectar a las personas con la riqueza natural de Costa Rica.

---

## 2. Objetivos del Proyecto

- Modernizar la interfaz de usuario para hacerla más atractiva y funcional.
- Visibilizar las áreas protegidas y programas de conservación de la región.
- Conectar a los visitantes con la naturaleza a través de una experiencia digital fluida.
- Implementar buenas prácticas de desarrollo (control de versiones, ramas, documentación).

---

## 3. Tecnologías Utilizadas

- HTML5 → Para la estructura de la página.
- CSS3 / Tailwind → Para los estilos y diseño responsivo (que se vea bien en celulares, tablets y computadoras).
- TypeScript → Para la lógica y funcionalidad interactiva.
- Vite → Como entorno de desarrollo y empaquetado (permite recargar rápido y optimizar el código final).
- Git y GitHub → Para el control de versiones y el trabajo colaborativo entre el equipo.

---

## 4. Estructura del Proyecto

La carpeta del proyecto está organizada así:

- .gitignore → Contiene la lista de archivos que NO se suben a GitHub (por ejemplo, node_modules).
- index.html → Es la página principal del landing.
- package.json → Lista de dependencias y scripts que usa el proyecto.
- package-lock.json → Bloquea las versiones exactas de las dependencias.
- postcss.config.mjs → Configuración de PostCSS (para procesar CSS).
- vite.config.ts → Configuración de Vite.
- README.md → Descripción rápida del repositorio (lo que ve la gente al entrar a GitHub).
- DOCUMENTACION.md → Este archivo, con la documentación completa del proyecto.
- src/ → Carpeta donde está el código fuente (componentes, estilos, imágenes, etc.).
- public/ → Carpeta para archivos estáticos como el favicon o imágenes que no se procesan.

---

## 5. Estrategia de Ramas (Git Flow)

Para trabajar en equipo sin pisarnos el código, usamos tres tipos de ramas:

- Rama main → Es la rama estable, la que se usa para la versión final o en producción. No se toca directamente, solo se actualiza cuando tenemos una versión probada y funcional.
- Rama develop → Es la rama principal de desarrollo. Aquí es donde se van juntando todas las nuevas funciones una vez que están listas.
- Ramas feature/* → Son ramas para cada nueva funcionalidad. Cada persona crea una rama con el nombre de lo que va a hacer. Ejemplo: feature/chatbot, feature/header, feature/formulario.

### Comandos básicos que usaremos:

- Para clonar el proyecto por primera vez:
  git clone https://github.com/esmoliname/Landig-SINAC.git

- Para cambiar a la rama develop:
  git checkout develop

- Para crear una nueva rama para una tarea:
  git checkout -b feature/nombre-de-tu-tarea

- Para subir tus cambios (cuando tengas avances importantes):
  git add .
  git commit -m "Descripción clara de lo que hiciste"
  git push

---

## 6. Bitácora de Cambios (Control del Proyecto)

Aquí vamos anotando todo lo que se va haciendo en el proyecto, para llevar un control claro y saber en qué vamos.

Formato de cada registro:
- Fecha: (día en que se hizo el cambio)
- Autor: (nombre de quien lo hizo)
- Rama: (en qué rama se trabajó)
- Descripción: (explicación breve del cambio)
- Estado: (Completado / En progreso / Pendiente)

Registros hasta ahora:

- Fecha: 2026-06-21 | Autor: esmoliname | Rama: feature/chatbot | Descripción: Creación de la rama e inicio de documentación. | Estado: Completado
- Fecha: 2026-06-21 | Autor: esmoliname | Rama: main | Descripción: Subida inicial del proyecto y configuración de Git. | Estado: Completado
- Fecha: 2026-06-21 | Autor: esmoliname | Rama: main | Descripción: Creación del archivo DOCUMENTACION.md con la estructura completa. | Estado: Completado

(Agrega una nueva línea cada vez que termines una tarea importante.)

---

## 7. Cómo Ejecutar el Proyecto Localmente

Si algún compañero quiere correr el proyecto en su propia computadora, debe seguir estos pasos:

1. Clonar el repositorio:
   git clone https://github.com/esmoliname/Landig-SINAC.git

2. Entrar a la carpeta del proyecto:
   cd Landig-SINAC

3. Instalar las dependencias necesarias:
   npm install

4. Levantar el servidor de desarrollo:
   npm run dev

5. Abrir el navegador en la dirección que aparezca (generalmente http://localhost:5173) y listo.

---

## 8. Equipo de Trabajo

- Desarrollador Principal / Coordinador: (Coloca tu nombre aquí)
- Institución: Universidad Técnica Nacional (UTN) - Sede Caño Negro
- Colaboradores: (Agrega aquí los nombres de tus compañeros)

---

## 9. Contacto y Recursos

- Repositorio en GitHub: https://github.com/esmoliname/Landig-SINAC
- Sitio web oficial del SINAC: www.sinac.go.cr

---

Última actualización: 21 de junio de 2026