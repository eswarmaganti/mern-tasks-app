import Todo from "../models/todo.js";
export const addATodo = async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    if (title.length < 3) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Todo title, must be at least 3 characters",
      });
    }

    const todo = await Todo({ title, isCompleted });
    todo.save();
    return res.status(201).json({
      status: "success",
      message: "Todo saved successfully",
      data: todo,
    });
  } catch (err) {
    console.error(`*** Error: Something went wrong: ${err.message} ***`);
    return res.status(400).json({
      status: "error",
      message: `Oops! someting went wrong, unable to add todo: ${err.message}`,
    });
  }
};

export const deleteATodo = async (req, res) => {
  try {
    const { todoid } = req.params;
    const todo = await Todo.findOne({ _id: todoid });
    if (!todo) {
      return res.status(404).json({
        status: "error",
        message: `No todo available to delete`,
      });
    }

    await Todo.deleteOne({ _id: todoid });

    return res.status(200).json({
      status: "success",
      message: `Todo deleted successfully`,
    });
  } catch (err) {
    console.error(`*** Error:Something went wrong: ${err.message} ***`);
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to delete the todo",
    });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});

    return res.status(200).json({
      status: "success",
      message: "Successfully fetched todo data",
      data: todos,
    });
  } catch (error) {
    console.error(`*** Error: Something went wrong : ${error.message} ***`);
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to get the todos available",
    });
  }
};

export const getATodo = async (req, res) => {
  try {
    const { todoid } = req.params;

    const todo = await Todo.findOne({ _id: todoid });

    if (!todo) {
      return res.status(404).json({
        status: "error",
        message: "No Todo found in DB",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Successfully fetched todo data",
      data: todo,
    });
  } catch (error) {
    console.error(`*** Error: Something went wrong : ${error.message} ***`);
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to get the todo",
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { todoid } = req.params;
    const { isCompleted, title } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(todoid, {
      title,
      isCompleted,
    });

    return res.status(200).json({
      message: "Todo updated successfully",
      status: "success",
      data: updatedTodo,
    });
  } catch (error) {
    console.error(`*** Error: Something went wrong : ${error.message} ***`);
    return res.status(500).json({
      status: "error",
      message: "Oops!, something went wrong, unable to update the todo",
    });
  }
};
