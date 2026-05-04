import { memo, useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskItem({ task }) {
  const { editTask, removeTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggle = () => {
    editTask(task.id, { completed: !task.completed });
  };

  const handleDelete = () => {
    removeTask(task.id);
  };

  const handleSaveTitle = () => {
    const normalized = editTitle.trim();
    if (!normalized) return;
    editTask(task.id, { title: normalized });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <li className="task-card">
      <button
        type="button"
        className={`btn btn-toggle ${task.completed ? "is-active" : ""}`}
        onClick={handleToggle}
      >
        {task.completed ? "Hecha" : "Pendiente"}
      </button>

      {isEditing ? (
        <div className="flex-1 flex gap-2">
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
          <button
            type="button"
            className="btn bg-green-500 text-white hover:bg-green-600"
            onClick={handleSaveTitle}
          >
            ✓
          </button>
          <button
            type="button"
            className="btn bg-gray-400 text-white hover:bg-gray-500"
            onClick={handleCancelEdit}
          >
            ✕
          </button>
        </div>
      ) : (
        <span
          className={`task-title ${task.completed ? "is-completed" : ""} cursor-pointer hover:underline`}
          onClick={() => setIsEditing(true)}
        >
          {task.title}
        </span>
      )}

      <button type="button" className="btn btn-danger" onClick={handleDelete}>
        Eliminar
      </button>
    </li>
  );
}
//memo memoriza componentes para evitar renderizados innecesarios.
// memo evita re-render si la tarea no cambió y se recomienda en listas para mejorar rendimiento con muchos items.
export default memo(TaskItem);
