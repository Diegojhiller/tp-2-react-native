import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle }) {
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
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
