import { Schema, model } from "mongoose";

const todoSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", todoSchema);
export default Todo;
