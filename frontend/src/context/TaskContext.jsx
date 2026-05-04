import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask as deleteTaskRequest,
} from "../api/taskApi";

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

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

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  //useCallback memoriza funciones
  // useCallback mantiene estables las referencias de acciones y se recomienda para evitar renders extra en consumidores del contexto.
  const fetchTasks = useCallback(async () => {
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
  }, []);

  const addTask = useCallback(async (title) => {
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const newTask = await createTask(title);
      dispatch({ type: "ADD_TASK", payload: newTask });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  }, []);

  const editTask = useCallback(async (id, payload) => {
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const updatedTask = await updateTask(id, payload);
      dispatch({ type: "EDIT_TASK", payload: updatedTask });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id) => {
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      await deleteTaskRequest(id);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      throw err;
    }
  }, []);

  const setErrorMessage = useCallback(
    (message) => dispatch({ type: "SET_ERROR", payload: message }),
    [],
  );

  const clearError = useCallback(
    () => dispatch({ type: "SET_ERROR", payload: null }),
    [],
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  //useMemo memoriza valores
  // useMemo evita recrear el objeto value en cada render y se recomienda en providers para reducir renders innecesarios.
  const value = useMemo(
    () => ({
      state,
      fetchTasks,
      addTask,
      editTask,
      removeTask,
      setErrorMessage,
      clearError,
    }),
    [
      state,
      fetchTasks,
      addTask,
      editTask,
      removeTask,
      setErrorMessage,
      clearError,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks debe usarse dentro de TaskProvider");
  }

  return context;
}
