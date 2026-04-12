// Simulamos una base de datos en memoria.
let tasks = [
  { id: 1, title: "Aprender React Native", completed: false },
  { id: 2, title: "Entregar TP Nro 2", completed: false },
];

export function getAllTasks() {
  return tasks;
}

export function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

export function createTask(title) {
  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };

  tasks.push(newTask);
  return newTask;
}

export function updateTaskById(id, data) {
  const task = getTaskById(id);
  if (!task) return null;

  const { title, completed } = data;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  return task;
}

export function deleteTaskById(id) {
  const previousLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length < previousLength;
}
