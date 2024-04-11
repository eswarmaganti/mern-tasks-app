import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

import TasksListByCategory from "./TasksListByCategory";
import AddNewTask from "./AddNewTask";

const TasksSection = () => {
  return (
    <Container sx={{ py: "1rem" }}>
      <AddNewTask />
      <TasksListByCategory />
    </Container>
  );
};

export default TasksSection;
