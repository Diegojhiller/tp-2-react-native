import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { useTasks } from "./context/TaskContext";

/**
 * App - Componente raíz de la aplicación
 * =======================================
 * Responsabilidades:
 * 1. Lee estado de tareas desde el contexto global (useTasks)
 * 2. Maneja el estado LOCAL del filtro de búsqueda
 * 3. Renderiza TaskForm (agregar tareas) y TaskList (mostrar tareas filtradas)
 * 4. Muestra loading y errores globales
 *
 * Nota: Ya NO maneja estado de tareas aquí, solo lo consume del contexto.
 * Esto hace el código más limpio y mantenible.
 */
export default function App() {
  /**
   * Consumir el contexto global
   * ===========================
   * Aquí accedemos al estado compartido del contexto:
   * - tasks: lista de todas las tareas
   * - loading: boolean que indica si está cargando desde la API
   * - error: mensaje de error si algo falla
   *
   * Cuando cualquier componente (TaskForm, TaskItem) modifica esto
   * a través del contexto, App automáticamente se re-renderiza
   * y actualiza la UI.
   */
  const {
    state: { tasks, loading, error },
  } = useTasks();

  /**
   * Estado LOCAL de búsqueda
   * =======================
   * El filtro de búsqueda es LOCAL porque no afecta el servidor,
   * solo a qué se muestra en la UI.
   * No forma parte del contexto global, cada App tiene su propio filtro.
   */
  const [search, setSearch] = useState("");

  /**
   * Filtrado local: busca en el título de tareas
   * Esto ocurre cada vez que 'tasks' o 'search' cambian.
   */
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
