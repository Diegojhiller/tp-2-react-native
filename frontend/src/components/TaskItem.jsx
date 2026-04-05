export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={() => onToggle(task.id, !task.completed)}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: "10px" }}>
        Eliminar
      </button>
    </li>
  );
}
