import { Router } from "express";
import {
  getAllTodos,
  addATodo,
  deleteATodo,
  getATodo,
  updateTodo,
} from "../controllers/todo.js";
const todoRouter = Router();

todoRouter.get("/", getAllTodos);
todoRouter.post("/", addATodo);
todoRouter.get("/:todoid", getATodo);
todoRouter.delete("/:todoid", deleteATodo);
todoRouter.put("/:todoid", updateTodo);

export default todoRouter;
