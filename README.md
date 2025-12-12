#+ Credit Card System

Proyecto de ejemplo que incluye una API en Node/Express (backend) y una aplicación cliente en React + Vite (frontend) para gestionar tarjetas de crédito de prueba.

**Estructura del repositorio**
- **`backend`**: API REST con Express y Supabase.
- **`frontend`**: Aplicación React creada con Vite (interfaz de usuario).

**Objetivo**: Proveer un proyecto completo y minimalista para una prueba técnica — incluye endpoints CRUD para tarjetas y una UI para visualizarlas/editar.

**Estado**: listo para desarrollo local. Usa Supabase como backend de datos.

**Contenido de este README**
- **Requisitos**: versiones y herramientas necesarias.
- **Instalación y ejecución**: pasos para correr backend y frontend.
- **Variables de entorno**: ejemplo de `.env` y cómo obtener las claves de Supabase.
- **Endpoints**: resumen de la API disponible.
- **Herramientas usadas**: lista y breve descripción.
- **Solución de problemas**: errores comunes y soluciones rápidas.

**Nota**: los archivos principales de referencia son [backend/server.js](backend/server.js) y [frontend/package.json](frontend/package.json).

**Requisitos previos**
- **Node.js**: recomendado >= 18.x (instalar desde https://nodejs.org/).
- **npm**: viene con Node; `npm --version` para comprobar.
- **Git** (opcional): para clonar el repositorio.

**Instalación global (opcional)**
- En Windows, use PowerShell o CMD con permisos de usuario normal.

-- Instalar Node: descarga desde https://nodejs.org/

-- Clonar el repositorio (si aplica):

```bash
git clone <repo-url>
cd credit_card_system
```

**Variables de entorno**
La API del backend requiere credenciales de Supabase. Cree un archivo `.env` dentro de la carpeta `backend` con al menos estas variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=public-anon-key
PORT=5000 # opcional, por defecto 5000
```

Cómo obtener las claves de Supabase:
- Regístrese o inicie sesión en https://supabase.com.
- Cree un proyecto y vaya a la sección "Settings → API" para copiar `URL` y `anon key`.

Backend (API)
----------------
Requisitos: Node.js + npm.

1) Abrir terminal y entrar en la carpeta `backend`:

```bash
cd backend
```

2) Instalar dependencias:

```bash
npm install
```

3) Asegurarse de tener el archivo `.env` con `SUPABASE_URL` y `SUPABASE_ANON_KEY`.

4) Iniciar en modo desarrollo (con reinicio automático):

```bash
npm run dev
```

O en modo producción simple:

```bash
npm start
```

La API quedará escuchando en `http://localhost:5000` (o el puerto definido en `PORT`).

Rutas principales de la API
- `GET /api/cards` — listar tarjetas.
- `GET /api/cards/:id` — obtener tarjeta por id.
- `POST /api/cards` — crear tarjeta (payload JSON).
- `PUT /api/cards/:id` — actualizar tarjeta.
- `DELETE /api/cards/:id` — eliminar tarjeta.

Puede ver la implementación en [backend/src/routes/cardRoutes.js](backend/src/routes/cardRoutes.js) y la lógica en [backend/src/controllers/cardController.js](backend/src/controllers/cardController.js).

Frontend (React + Vite)
------------------------

1) Abrir terminal y entrar en la carpeta `frontend`:

```bash
cd frontend
```

2) Instalar dependencias:

```bash
npm install
```

3) Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Por defecto Vite servirá la app en `http://localhost:5173` (o el puerto que indique Vite). La app está configurada para hablar con la API en `http://localhost:5000/api` (ver [frontend/src/services/cardService.js](frontend/src/services/cardService.js)). Si su backend está en otro host/puerto, actualice la constante `API_BASE_URL`.

Construir para producción:

```bash
npm run build
npm run preview
```

Configuración rápida (ambos en paralelo)
- Abrir dos terminales:
	- Terminal A: `cd backend && npm install && npm run dev`
	- Terminal B: `cd frontend && npm install && npm run dev`

Herramientas y librerías principales utilizadas
- **Node.js**: entorno de ejecución JavaScript.
- **Express**: framework HTTP para la API (`backend`).
- **Supabase**: backend-as-a-service para almacenamiento y autenticación (se usa SDK `@supabase/supabase-js`).
- **Vite**: bundler y servidor de desarrollo para el frontend.
- **React**: biblioteca UI del frontend.
- **Tailwind CSS**: utilidades CSS (dependencia incluida en `frontend`).
- **react-toastify**: notificaciones en el frontend.
- **nodemon**: reinicio automático en desarrollo del backend.

Buenas prácticas y notas
- Mantenga sus claves privadas fuera del control de versiones: añada `backend/.env` a `.gitignore`.
- Use HTTPS y variables secretas para despliegues en producción.
- Para cambiar el endpoint de la API en el frontend edite [frontend/src/services/cardService.js](frontend/src/services/cardService.js).

Solución de problemas comunes
- Error: "Variables de entorno faltantes": asegúrese de tener `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `backend/.env`. El archivo `backend/src/config/supabase.js` valida estas variables.
- CORS: si el frontend no llega al backend, confirme que el backend está levantado y que la URL base en `cardService.js` apunta al puerto correcto.
- Puerto en uso: cambie `PORT` en `backend/.env` o cierre el proceso que ocupa el puerto.

Contacto y contribución
- Si quieres mejorar la documentación o el código, abre un fork/branch y propone un PR.

Archivos de interés
- [backend/package.json](backend/package.json)
- [backend/server.js](backend/server.js)
- [backend/src/config/supabase.js](backend/src/config/supabase.js)
- [frontend/package.json](frontend/package.json)
- [frontend/src/services/cardService.js](frontend/src/services/cardService.js)

Licencia
- Código de ejemplo para pruebas técnicas — úselo como referencia.

**Mapeo frente a la Prueba Técnica**

Resumen: tras revisar el código, el proyecto implementa la mayoría de los requisitos solicitados en ambos bloques. Abajo se muestra el detalle por punto y el estado actual.

Primer Bloque (Front-End)
- 1) Maquetación y validaciones:
	- a) Todos los campos son requeridos: **Implementado** (`CreditCardForm` usa `required` y validaciones en `App.jsx`).
	- b) Editar campos modifica el diseño de la tarjeta en tiempo real: **Implementado** (`CreditCardDisplay` recibe `formData`).
	- c) Campo tarjeta solo números y máximo 16 caracteres: **Implementado** (formatea y restringe en `handleChange` y valida en `validateField`).
	- d) Fecha vencimiento con formato `MM/YY`: **Implementado** (`validateExpiryDate` + validación en `validateField`).
	- e) Validación mes (01-12) y año (hasta año actual +5): **Implementado** (ver `validateField`, usa año actual dinámico). 
	- f) Nombre titular solo letras y tildes, max 20 caracteres: **Implementado** (`maxLength` y regex en `handleChange`/`validateField`).
	- g) Mostrar texto rojo debajo de cada campo inválido: **Implementado** (`errors` mostrado en `CreditCardForm`).

- 2) Al pulsar "Agregar tarjeta":
	- a) Agrega la tarjeta a la lista/tabla: **Implementado** (se llama a la API y se inserta en `cards` en `App.jsx`).
	- b) Cada registro debe contener identificador único: **Implementado** (el backend inserta y devuelve el registro con `id` si Supabase está configurado). La tabla maneja fallback si no hay `id`.
	- c) Validar formulario antes de enviar y mostrar errores: **Implementado** (`handleSubmit` realiza validación y muestra toasts de error).
	- d) Mostrar número enmascarado en la lista (mostrar solo parte y ocultar el resto): **Implementado (tabla)** (`formatCardNumber` en `cardFormatters.js` muestra parte y enmascara). Nota: en la tarjeta visual en tiempo real se muestran los grupos formateados desde `formData` para la vista previa.

- 3) Botón "Cancelar" limpia campos: **Implementado** (`onReset` en `CreditCardForm` resetea `formData`).

Estado primer bloque: **100% de los puntos listados implementados** (según la revisión del código presente).

Segundo Bloque (API / Backend)
- 1) API RESTful con métodos CRUD: **Implementado** (`backend/src/routes/cardRoutes.js` + controladores y `cardService` con Supabase). 
	- a) Contiene rutas `GET`, `POST`, `PUT`, `DELETE`.
	- b) Se usa Express y Supabase (config en `backend/src/config/supabase.js`).
	- c) No existe autenticación (no requerida en la prueba): **Correcto**.

- 2) Conexión entre Frontend y Backend:
	- a) Al agregar, la tarjeta se guarda en la base de datos (Supabase) si las variables de entorno están configuradas: **Implementado** (`cardService.createCard`).
	- b) Backend valida que los campos requeridos sean enviados (devuelve `400` con detalles si faltan): **Implementado** (`validateCardData` en `cardController.js`).
	- c) Los endpoints devuelven códigos HTTP apropiados (200, 201, 400, 404, 500): **Implementado** (ver controladores).

Estado segundo bloque: **~100%** (CRUD completo; depende de que Supabase esté configurado en `backend/.env`).

Puntos no implementados / notas
- No incluye tests automatizados (unit/integration) — recomendable añadir antes de entregar si se pide.
- La vista previa de la tarjeta muestra dígitos en vivo (no enmascarados) para mejor UX; si la evaluación exige enmascarado allí también, puedo cambiarlo.

Instrucciones y ejemplos para probar la API

Ejemplo de `.env` en `backend` (requerido):

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=public-anon-key
PORT=5000
```

Ejemplo de payload para crear tarjeta (POST /api/cards):

```json
{
	"cardHolder": "Juan Pérez",
	"cardNumber": "4111222233334444",
	"expiryDate": "12/27",
	"cvv": "123"
}
```

Comandos `curl` de ejemplo
- Obtener todas las tarjetas:

```bash
curl -s http://localhost:5000/api/cards
```

- Agregar tarjeta:

```bash
curl -X POST http://localhost:5000/api/cards \
	-H "Content-Type: application/json" \
	-d '{"cardHolder":"Juan Pérez","cardNumber":"4111222233334444","expiryDate":"12/27","cvv":"123"}'
```

- Eliminar tarjeta (ej. id = `abc-123`):

```bash
curl -X DELETE http://localhost:5000/api/cards/abc-123
```

SQL sugerido para crear la tabla `cards` en Supabase (Postgres)
-- Cree la tabla desde SQL editor en Supabase. Ajuste nombres si desea usar camelCase.

```sql
create table cards (
	id uuid default gen_random_uuid() primary key,
	cardholder text,
	cardnumber text,
	expirydate text,
	cvv text,
	created_at timestamptz default now()
);
```

Notas:
- En Postgres los identificadores se normalizan a minúsculas; el backend envía objetos con claves `cardHolder`, `cardNumber`, etc. Supabase/PG mapeará estas propiedades a columnas en minúscula si existen (por ejemplo `cardholder`). Si prefiere mantener camelCase, cree las columnas con doble comilla (no recomendado).

¿Qué más quieres que haga ahora?
- Puedo actualizar el `README.md` para incluir payloads de ejemplo en la UI, adaptar el enmascarado en la vista previa, o añadir instrucciones para crear automáticamente la tabla `cards` vía migración. Dime qué prefieres y lo hago.

