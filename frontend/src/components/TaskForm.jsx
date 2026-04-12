import { useState } from "react";

export default function TaskForm({ onCreateTask, onError }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      onError("El titulo es obligatorio");
      return;
    }

    onError(null);

    try {
      await onCreateTask(normalizedTitle);
      setTitle("");
    } catch (err) {
      onError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label
          className="mb-2 block text-sm font-semibold text-slate-700"
          htmlFor="newTask"
        >
          Nueva tarea
        </label>
        <input
          id="newTask"
          className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition-all duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Agregar
      </button>
    </form>
  );
}
