import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Consumo de API (GET) 
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/tasks");
      if (!res.ok) throw new Error("Error al conectar");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message); // Mostrar errores 
    } finally {
      setLoading(false); // Mostrar estado de carga 
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para Eliminar (DELETE) 
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Función para Actualizar (PUT) 
  const toggleTask = async (id, completedStatus) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: completedStatus }),
    });
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: completedStatus } : t,
      ),
    );
  };

  // Filtrado o búsqueda 
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Gestión de Tareas</h1>
      <TaskForm onTaskCreated={fetchTasks} />
      <input
        placeholder="Filtrar tareas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "10px 0", width: "100%", padding: "8px" }}
      />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
