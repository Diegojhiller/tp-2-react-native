import { useState } from "react";
import { useTasks } from "../context/TaskContext";

/**
 * TaskForm - Formulario para crear nuevas tareas
 * ==============================================
 * Responsabilidades:
 * 1. Maneja estado LOCAL del input (el texto que escribe el usuario)
 * 2. Valida que el título no esté vacío
 * 3. Usa addTask() del contexto para crear la tarea en la API
 * 4. Limpia el input después de crear
 * 5. Usa setErrorMessage() del contexto para mostrar errores globales
 *
 * Flow:
 * Usuario escribe -> onChange actualiza estado local
 * -> Submit valida -> addTask() llama API -> reducer actualiza estado global
 * -> App se re-renderiza con la tarea nueva
 */
export default function TaskForm() {
  const [title, setTitle] = useState("");
  const { addTask, clearError, setErrorMessage } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setErrorMessage("El titulo es obligatorio");
      return;
    }

    clearError();

    try {
      await addTask(normalizedTitle);
      setTitle("");
    } catch {
      return;
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
