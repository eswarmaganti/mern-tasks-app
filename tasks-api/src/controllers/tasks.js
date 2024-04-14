import Task from "../models/tasks.js";
export const addATask = async (req, res) => {
  try {
    const { title, description, status, start_date, end_date, tag } = req.body;
    console.log(`StartDate: ${start_date}`);
    console.log(`EndDate: ${end_date}`);

    const task = await Task({
      title,
      description,
      status,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      tag,
    });
    task.save();
    return res.status(201).json({
      status: "success",
      message: "Task saved successfully",
      data: task,
    });
  } catch (err) {
    console.error(
      `*** Error: Something went wrong while saving a new task: ${err.message} ***`
    );
    return res.status(400).json({
      status: "error",
      message: `Oops! someting went wrong, unable to add todo: ${err.message}`,
    });
  }
};

export const deleteATask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const task = await Task.findOne({ _id: taskid });
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: `No task available to delete`,
      });
    }

    await Task.deleteOne({ _id: taskid });

    return res.status(200).json({
      status: "success",
      message: `Task deleted successfully`,
    });
  } catch (err) {
    console.error(
      `*** Error: Something went wrong while deleting the task: ${err.message} ***`
    );
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to delete the todo",
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const task_status = ["new", "in progress", "completed"];
    const tasks = {};
    for (let status of task_status) {
      const data = await Task.find({ status: status });
      tasks[status] = data;
    }

    return res.status(200).json({
      status: "success",
      message: "Successfully fetched tasks data",
      tasks: tasks,
    });
  } catch (error) {
    console.error(
      `*** Error: Something went wrong while fething tasks: ${error.message} ***`
    );
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to get the tasks available",
    });
  }
};

export const getATask = async (req, res) => {
  try {
    const { taskid } = req.params;

    const task = await Task.findOne({ _id: taskid });

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "No Task is available",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Successfully fetched task description",
      data: task,
    });
  } catch (error) {
    console.error(
      `*** Error: Something went wrong while fetching task: ${error.message} ***`
    );
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to get the task",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const { title, details, status, start_date, end_date, tag } = req.body;

    const updatedTask = await Todo.findByIdAndUpdate(taskid, {
      title,
      details,
      status,
      start_date,
      end_date,
      tag,
    });

    return res.status(200).json({
      message: "Task updated successfully",
      status: "success",
      data: updatedTask,
    });
  } catch (error) {
    console.error(
      `*** Error: Something went wrong while updating the task : ${error.message} ***`
    );
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to update the task",
    });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const task_status = ["new", "in progress", "completed"];
    const data = {};
    for (let status of task_status) {
      const count = await Task.find({ status: status }).count();
      data[status] = count;
    }

    return res.status(200).json({
      data: data,
      message: "Task stats fetched successfully",
      status: "success",
    });
  } catch (error) {
    console.error(
      `*** Error: Something went wrong while fetchig task stats : ${error.message} ***`
    );
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to fetch the task stats",
    });
  }
};
