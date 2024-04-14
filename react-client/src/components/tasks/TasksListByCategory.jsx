import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import Task from "./Task";

import {
  useFetchAllTasksQuery,
  useDeleteTaskMutation,
} from "../../store/api/tasksApi";
import { Container } from "@mui/material";

// Accepts a callback function as props from parent component to open the delete dialog for the task

const TasksListByCategory = ({ handleOpenDeleteDialog }) => {
  const { fetchAllTasks, isLoading, isError, isSuccess, error, data } =
    useFetchAllTasksQuery();

  if (isLoading) {
    return <CircularProgress color="primary" size={32} />;
  }

  return (
    <Grid container mt="1rem" spacing={2}>
      {["new", "in progress", "completed"].map((category) => (
        <Grid item xs={4} my="1rem" key={category}>
          <Typography
            textAlign="center"
            textTransform="uppercase"
            fontWeight="600"
          >
            {category}
          </Typography>
          {data?.tasks[category].length ? (
            data?.tasks[category].map((task) => (
              <Task
                key={task._id}
                task={task}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
              />
            ))
          ) : (
            <TasksFallbackComponent />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

const TasksFallbackComponent = () => {
  return (
    <Container sx={{ mt: "1rem" }}>
      <Alert variant="outlined" severity="info">
        No Tasks Available
      </Alert>
    </Container>
  );
};

export default TasksListByCategory;
