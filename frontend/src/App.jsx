import { useMemo, useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { useTasks } from "./context/TaskContext";

export default function App() {
  const {
    state: { tasks, loading, error },
  } = useTasks();

  const [search, setSearch] = useState("");

  // useMemo evita recalcular el filtro en renders sin cambios en tasks/search y se recomienda cuando el cálculo puede repetirse mucho.
  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) => t.title.toLowerCase().includes(search.toLowerCase())),
    [tasks, search],
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

          <TaskForm />

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
            <TaskList tasks={filteredTasks} />
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
