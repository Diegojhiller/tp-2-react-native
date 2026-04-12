import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskRequest,
} from "./api/taskApi";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Cargar tareas desde la API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Crear tarea
  const handleCreateTask = async (title) => {
    setError(null);
    await createTask(title);
    await fetchTasks();
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    setError(null);
    try {
      await deleteTaskRequest(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Cambiar estado completada/pendiente
  const toggleTask = async (id, completedStatus) => {
    setError(null);
    try {
      const updatedTask = await updateTask(id, { completed: completedStatus });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? updatedTask : t)),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtrado o búsqueda
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-app px-4 py-10">
      <main className="container mx-auto max-w-2xl">
        <section className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 animate-fade-in">
          <header className="mb-5 border-b border-slate-100 pb-4">
            <h1 className="text-3xl font-black text-slate-900">
              Gestión de Tareas
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Organizá tu día con una vista limpia y rápida.
            </p>
          </header>

          <TaskForm onCreateTask={handleCreateTask} onError={setError} />

          <label
            className="mt-4 block text-sm font-semibold text-slate-700"
            htmlFor="searchTasks"
          >
            Buscar tarea
          </label>
          <input
            id="searchTasks"
            className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            placeholder="Filtrar tareas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <p className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-slate-600">
              Cargando...
            </p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          )}

          {error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
