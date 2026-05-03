import { createContext, useContext, useEffect, useReducer } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskRequest,
} from "../api/taskApi";

/**
 * TaskContext
 * =============
 * Contexto global que almacena todo el estado de tareas.
 * Actúa como un "contenedor" donde todos los componentes pueden acceder
 * al estado sin necesidad de prop drilling.
 *
 * Qué contiene:
 * - tasks: lista de todas las tareas
 * - loading: booleano que indica si está cargando desde el servidor
 * - error: mensaje de error si algo falla
 */
const TaskContext = createContext(null);

/**
 * Estado inicial de todas las tareas
 * =================================
 * Cuando la app arranca, el estado empieza vacío.
 * Mientras se cargan datos del servidor, loading es true.
 * Si falla algo, error guarda el mensaje.
 */
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

/**
 * taskReducer - La máquina de estado predictible
 * ================================================
 * Esta es la ÚNICA función que puede cambiar el estado.
 * Recibe el estado actual y una acción, devuelve el estado nuevo.
 *
 * Patrones:
 * - SET_LOADING: usamos cuando comienza/termina una operación
 * - SET_ERROR: guardamos errores para mostrar en la UI
 * - SET_TASKS: reemplazamos toda la lista (ej: al cargar inicialmente)
 * - ADD_TASK: agregamos tarea nueva a la lista
 * - EDIT_TASK: buscamos por ID y reemplazamos esa tarea
 * - DELETE_TASK: filtramos para remover por ID
 */
function taskReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
}

/**
 * TaskProvider - El proveedor de estado global
 * ============================================
 * Este componente:
 * 1. Maneja el estado de tareas con useReducer
 * 2. Define funciones async que conectan con la API
 * 3. Dispara acciones al reducer después de cada respuesta del servidor
 * 4. Expone todo via useContext para que otros componentes lo consuman
 *
 * Ventaja: cambios en estado fluyen automáticamente a todos los componentes
 * que usen useContext(TaskContext).
 */
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const fetchTasks = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const data = await getTasks();
      dispatch({ type: "SET_TASKS", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addTask = async (title) => {
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const newTask = await createTask(title);
      dispatch({ type: "ADD_TASK", payload: newTask });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  };

  const editTask = async (id, payload) => {
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const updatedTask = await updateTask(id, payload);
      dispatch({ type: "EDIT_TASK", payload: updatedTask });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  };

  const removeTask = async (id) => {
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      await deleteTaskRequest(id);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  };

  const setErrorMessage = (message) =>
    dispatch({ type: "SET_ERROR", payload: message });

  const clearError = () => dispatch({ type: "SET_ERROR", payload: null });

  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    state,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    setErrorMessage,
    clearError,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

/**
 * useTasks - Hook personalizado para acceder al contexto
 * ======================================================
 * Cada componente que necesite estado/acciones de tareas hace:
 *   const { state, addTask, editTask, removeTask } = useTasks();
 *
 * El error que lanza aquí es una guardrail: si alguien usa este hook
 * fuera de TaskProvider, sabrá de inmediato que algo está mal.
 */
export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks debe usarse dentro de TaskProvider");
  }

  return context;
}
