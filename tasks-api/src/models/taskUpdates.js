import { Schema, model } from "mongoose";
import Task from "./tasks.js";

const taskUpdatesSchema = Schema(
  {
    taskid: { type: Schema.ObjectId, ref: Task },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TaskUpdates = model("TaskUpdates", taskUpdatesSchema);
export default TaskUpdates;
