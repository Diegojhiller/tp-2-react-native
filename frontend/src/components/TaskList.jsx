import TaskItem from "./TaskItem";

/**
 * TaskList - Contenedor que renderiza la lista de tareas
 * =======================================================
 * Responsabilidades:
 * 1. Recibe array de tareas (ya filtradas por búsqueda en App)
 * 2. Si no hay tareas, muestra mensaje vacío
 * 3. Si hay tareas, mapea cada una y crea un TaskItem
 * 4. Cada TaskItem es independiente y maneja su propia UI
 *
 * Nota: No tiene lógica de negocio, es un componente "presentacional".
 * La acción ocurre en los TaskItem (editar, eliminar, toggle).
 */
export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-slate-600">
        No hay tareas para mostrar.
      </div>
    );
  }

  return (
    <ul className="mt-5 list-none space-y-3 p-0">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
