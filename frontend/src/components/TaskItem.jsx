import { useState } from "react";
import { useTasks } from "../context/TaskContext";

/**
 * TaskItem - Tarjeta individual de cada tarea
 * ==========================================
 * Responsabilidades:
 * 1. Renderiza UNA tarea (título, botones de acción)
 * 2. Maneja interacción: toggle completada, eliminar, editar título
 * 3. Usa el contexto para llamar editTask() y removeTask()
 * 4. Mantiene estado LOCAL de si está en modo edición
 *
 * Props:
 * - task: objeto con { id, title, completed }
 *
 * Estados internos:
 * - isEditing: true si el usuario está editando el título
 * - editTitle: el nuevo título siendo escrito
 */
export default function TaskItem({ task }) {
  const { editTask, removeTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  /**
   * Toggle: marca/desmarca la tarea como completada
   * Llama editTask con solo la propiedad 'completed'
   */
  const handleToggle = () => {
    editTask(task.id, { completed: !task.completed });
  };

  /**
   * Elimina la tarea llamando removeTask del contexto
   */
  const handleDelete = () => {
    removeTask(task.id);
  };

  /**
   * Guarda el nuevo título:
   * 1. Valida que no esté vacío
   * 2. Llama editTask con la propiedad 'title'
   * 3. Cierra el modo edición
   */
  const handleSaveTitle = () => {
    const normalized = editTitle.trim();
    if (!normalized) return;
    editTask(task.id, { title: normalized });
    setIsEditing(false);
  };

  /**
   * Cancela la edición y restaura el título original
   */
  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <li className="task-card">
      {/* Botón toggle: marca/desmarca como completada */}
      <button
        type="button"
        className={`btn btn-toggle ${task.completed ? "is-active" : ""}`}
        onClick={handleToggle}
      >
        {task.completed ? "Hecha" : "Pendiente"}
      </button>

      {/* Mostrar título o input de edición */}
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          {/* Input para editar título */}
          <input
            autoFocus
            type="text"
            className="flex-1 rounded-lg border border-slate-300 px-2 py-1 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveTitle();
              if (e.key === "Escape") handleCancelEdit();
            }}
          />
          {/* Botón guardar cambios */}
          <button
            type="button"
            className="btn bg-green-500 text-white hover:bg-green-600"
            onClick={handleSaveTitle}
          >
            ✓
          </button>
          {/* Botón cancelar edición */}
          <button
            type="button"
            className="btn bg-gray-400 text-white hover:bg-gray-500"
            onClick={handleCancelEdit}
          >
            ✕
          </button>
        </div>
      ) : (
        /* Título clickeable para entrar en modo edición */
        <span
          className={`task-title ${task.completed ? "is-completed" : ""} cursor-pointer hover:underline`}
          onClick={() => setIsEditing(true)}
        >
          {task.title}
        </span>
      )}

      {/* Botón eliminar */}
      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Eliminar
      </button>
    </li>
  );
}
