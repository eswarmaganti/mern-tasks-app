import { Schema, model } from "mongoose";

const tasksSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "in progress", "completed"],
    },
    tag: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", tasksSchema);
export default Task;
