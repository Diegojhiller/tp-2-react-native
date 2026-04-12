import { Router } from "express";
import {
  listTasks,
  getTask,
  createTaskHandler,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = Router();

router.get("/", listTasks);
router.get("/:id", getTask);
router.post("/", createTaskHandler);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
