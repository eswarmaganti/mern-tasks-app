import React from "react";
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

const TasksListByCategory = () => {
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
              <Task key={task._id} task={task} />
            ))
          ) : (
            <Container sx={{ mt: "1rem" }}>
              <Alert variant="outlined" severity="info">
                No Tasks Available
              </Alert>
            </Container>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default TasksListByCategory;
