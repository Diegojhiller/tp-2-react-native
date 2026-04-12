import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} from "../models/taskModel.js";

export function listTasks(req, res) {
  res.json(getAllTasks());
}

export function getTask(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const task = getTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  return res.json(task);
}

export function createTaskHandler(req, res) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio" });
  }

  const newTask = createTask(title);
  return res.status(201).json(newTask);
}

export function updateTask(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const updatedTask = updateTaskById(id, req.body);

  if (!updatedTask) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  return res.json(updatedTask);
}

export function deleteTask(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  deleteTaskById(id);
  return res.status(204).send();
}
