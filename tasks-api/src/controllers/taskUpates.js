import TaskUpdates from "../models/taskUpdates.js";

export const addTaskUpdate = async (req, res) => {
  try {
    const { taskid } = req.params;
    const { description } = req.body;
    console.log(description);

    const newUpdate = await TaskUpdates({
      description: description,
      taskid: taskid,
    });
    await newUpdate.save();
    return res.status(201).json({
      message: "Task update successfully saved",
      status: "success",
      data: newUpdate,
    });
  } catch (error) {
    console.error(
      `*** Error: Unable to create an update for task: ${error.message}`
    );
    res.status(500).json({
      message:
        "Something went wrong while creating an update for task, please try later",
      status: "success",
    });
  }
};

export const getTaskUpdates = async (req, res) => {
  try {
    const { taskid } = req.params;
    const taskUpdates = await TaskUpdates.find({ taskid: taskid }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: "Task updates fetched successfully",
      status: "success",
      data: taskUpdates,
    });
  } catch (error) {
    console.error(
      `*** Error: Error occured while fetching the task updates: ${error.message} ***`
    );
    res.status(500).json({
      message:
        "Something went wrong while fetching task updates, try again later",
      status: "error",
    });
  }
};

export const deleteTaskUpdate = async (req, res) => {};
