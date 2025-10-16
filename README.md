# AI Vision · Analizador

Proyecto simple para subir una imagen desde un formulario web (front) al backend, donde un modelo de visión analiza la imagen y devuelve una lista de tags descriptivos con un puntaje de 0 a 1 (cercano a 1 significa mayor relación con la imagen).

Principales archivos de orquestación y código:
- [docker-compose.yml](docker-compose.yml)
- Backend:
  - [backend/index.js](backend/index.js) — endpoints: [`POST /upload`](backend/index.js), [`GET /analisis/:filename`](backend/index.js), [`GET /file/:filename`](backend/index.js)
  - [backend/dockerfile](backend/dockerfile)
  - [backend/package.json](backend/package.json)
  - [`get_analisis`](backend/src/get_analisis.js) — llamada al modelo de visión ([backend/src/get_analisis.js](backend/src/get_analisis.js))
  - [`crearArchivo`](backend/src/get_image.js) — carga de imagen a la API de visión ([backend/src/get_image.js](backend/src/get_image.js))
- Frontend:
  - [frontend/package.json](frontend/package.json)
  - [frontend/vite.config.js](frontend/vite.config.js)
  - [frontend/src/UploadImg.jsx](frontend/src/UploadImg.jsx) — componente que sube la imagen (`UploadImg`)
  - [frontend/src/Preview.jsx](frontend/src/Preview.jsx) — componente que solicita y muestra los tags (`Preview`)
  - [frontend/src/App.jsx](frontend/src/App.jsx)

Requisitos
- Docker & Docker Compose (o Node.js 24 / npm si prefieres ejecutar localmente).
- Clave de OpenAI en la variable de entorno OPENAI_API_KEY (ver [.example.env](.example.env) y [.env](.env)).

Cómo levantar con Docker Compose (Recomendado)
1. Copia tu clave en un archivo `.env` en la raíz (o asegúrate de exportarla en el entorno). Puedes usar [.example.env](.example.env) como referencia.
2. Levantar los servicios:
```sh
docker compose up --build
```
- El frontend estará disponible en http://localhost:5173 (puerto mapeado en [docker-compose.yml](docker-compose.yml)).
- El backend escuchará en http://localhost:3000 (configurado en [backend/index.js](backend/index.js) y [docker-compose.yml](docker-compose.yml)).

Endpoints principales (backend)
- Subir imagen (multipart-formdata): [`POST /upload`](backend/index.js) — usado por [frontend/src/UploadImg.jsx](frontend/src/UploadImg.jsx).
  - Respuesta: `{ messaje, filename, size }`
- Solicitar análisis: [`GET /analisis/:filename`](backend/index.js) — invoca [`get_analisis`](backend/src/get_analisis.js) que a su vez usa [`crearArchivo`](backend/src/get_image.js).
  - Respuesta esperada: JSON con formato `{ "tags": [ { "label": "...", "confidence": 0.98 }, ... ] }`
- Mostrar archivo subido: [`GET /file/:filename`](backend/index.js)

Ejecución local sin Docker
- Backend:
  ```sh
  cd backend
  npm install
  npm run dev
  ```
  (script definido en [backend/package.json](backend/package.json))
- Frontend:
  ```sh
  cd frontend
  npm install
  npm run dev -- --host
  ```
  (scripts y configuración en [frontend/package.json](frontend/package.json) y [frontend/vite.config.js](frontend/vite.config.js))

Flujo de uso (resumido)
1. Abrir UI en http://localhost:5173.
2. En [frontend/src/UploadImg.jsx](frontend/src/UploadImg.jsx) seleccionar imagen y enviar a [`POST /upload`](backend/index.js).
3. El front recibe `filename` y llama a [`GET /analisis/:filename`](backend/index.js) desde [frontend/src/Preview.jsx](frontend/src/Preview.jsx).
4. El backend sube la imagen al servicio de visión con [`crearArchivo`](backend/src/get_image.js) y solicita el análisis con [`get_analisis`](backend/src/get_analisis.js). El resultado se devuelve al frontend en formato JSON con `tags`.

Notas y buenas prácticas
- Limite de archivo: 5MB (configurado en [backend/index.js](backend/index.js) con multer).
- Tipos permitidos: PNG, JPG, JPEG, GIF, WEBP (filtro en [backend/index.js](backend/index.js)).
- Para asegurarse de no exponer su clave OPENAI en repositorios públicos; usa `.env` y añade `.env` a `.gitignore` (ya presente).
- Si usas Docker, los volúmenes montados permiten editar el código en caliente.

Archivos útiles en el repositorio
- [docker-compose.yml](docker-compose.yml)
- [backend/index.js](backend/index.js)
- [backend/dockerfile](backend/dockerfile)
- [frontend/src/App.jsx](frontend/src/App.jsx)
- [.example.env](.example.env)
- [.env](.env)

