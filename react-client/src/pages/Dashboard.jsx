import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Header from "../components/Header";
import AddNewTask from "../components/tasks/AddNewTask";
import TasksSection from "../components/tasks/TasksSection";

const Dashboard = () => {
  return (
    <Box>
      <Header />
      <TasksSection />
    </Box>
  );
};

export default Dashboard;
