import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware obligatorios
app.use(cors()); // Permite que React se conecte
app.use(express.json()); // Permite recibir datos en formato JSON

// Datos iniciales (Simulamos una DB)
let tasks = [
  { id: 1, title: "Aprender React Native", completed: false },
  { id: 2, title: "Entregar TP Nro 2", completed: false },
];

// RUTAS (Endpoints)

// 1. Listar todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Crear una tarea
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title)
    return res.status(400).json({ error: "El título es obligatorio" });

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
// Actualizar un elemento (PUT)
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    const { title, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});

// Eliminar una tarea
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});
// Obtener un elemento por ID (GET)
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' }); // Manejo error 404 
    res.json(task);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
