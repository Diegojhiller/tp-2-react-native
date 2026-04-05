## Sistema de Gestión de Tareas (Fullstack)
Este proyecto es una aplicación web fullstack desarrollada para el Trabajo Práctico N.º 2 de la materia Taller de Lenguajes de Programación III (React Native). La aplicación permite realizar una gestión completa de tareas (CRUD) conectando un servidor Node.js con una interfaz en React.

## Tecnologías Utilizadas
1.Backend: Node.js con Express.Frontend: 
2.React.js  (Vite).
3.Comunicación: API REST con formato JSON y soporte de CORS.
4.Arquitectura: Modular con ES Modules (import/export).

## Requisitos Previos
1.Tener instalado Node.js (versión 18 o superior recomendada).
2.Contar con un gestor de paquetes como npm.

## Como ejecutarlo:
 El proyecto está organizado en dos carpetas principales: backend y frontend
 1. Configuración del Backend: desde la terminal del editor de codigo

cd backend
npm install
node index.js
# El servidor correrá en: http://localhost:3000

 2. Configuración del Frontend

cd frontend
npm install
npm run dev

# La aplicación estará disponible en la URL que indique la terminal (usualmente http://localhost:5173)

# Funcionalidades Implementadas:
Backend (Node.js + Express)
1. GET /tasks: Lista todas las tareas.
2. GET /tasks/:id: Obtiene una tarea específica por su ID.
3. POST /tasks: Crea una nueva tarea con validación de campos.
4. PUT /tasks/:id: Actualiza el título o el estado de una tarea.
5. DELETE /tasks/:id: Elimina una tarea del sistema.

Frontend (React.js)
1. Hooks: Uso de useState para el manejo de datos y useEffect para el consumo de la API
2. Componentes: Estructura modular con App, TaskForm, TaskList y TaskItem.
3. Búsqueda: Filtro reactivo en tiempo real para localizar tareas.
4. Estados: Manejo visual de estados de carga y errores de conexión

