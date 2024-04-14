import { addTaskUpdate, getTaskUpdates } from "../controllers/taskUpates.js";
import { Router } from "express";

const taskUpdatesRouter = Router();

taskUpdatesRouter.post("/:taskid", addTaskUpdate);
taskUpdatesRouter.get("/:taskid", getTaskUpdates);

export default taskUpdatesRouter;
