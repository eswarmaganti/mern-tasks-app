import { Router } from "express";
import {
  getATask,
  getAllTasks,
  addATask,
  updateTask,
  deleteATask,
  getTaskStats,
} from "../controllers/tasks.js";
const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/stats", getTaskStats);
taskRouter.post("/", addATask);
taskRouter.get("/:taskid", getATask);
taskRouter.delete("/:taskid", deleteATask);
taskRouter.put("/:taskid", updateTask);

export default taskRouter;
