export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li className="task-card">
      <button
        type="button"
        className={`btn btn-toggle ${task.completed ? "is-active" : ""}`}
        onClick={() => onToggle(task.id, !task.completed)}
      >
        {task.completed ? "Hecha" : "Pendiente"}
      </button>

      <span
        className={`task-title ${task.completed ? "is-completed" : ""}`}
        onClick={() => onToggle(task.id, !task.completed)}
      >
        {task.title}
      </span>

      <button type="button" className="btn btn-danger" onClick={() => onDelete(task.id)}>
        Eliminar
      </button>
    </li>
  );
}
