import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import BackIcon from "@mui/icons-material/ChevronLeftOutlined";

import { Link } from "react-router-dom";

import {
  useLazyGetATodoQuery,
  useUpdateTodoMutation,
} from "../store/api/todoApi";
import TodoForm from "./TodoForm";
import CustomSnackbar from "./utils/CustomSnackbar";
import Heading from "./utils/Heading";

const EditTodo = () => {
  const navigate = useNavigate();
  const { todo_id } = useParams();
  const [trigger, result] = useLazyGetATodoQuery();

  const [updateTodo, { error, isSuccess, isError, isLoading, data }] =
    useUpdateTodoMutation();

  const {
    data: todoData,
    isSuccess: isGetTodoSuccess,
    isError: isGetTodoError,
    error: todoError,
    isLoading: isGetTodoLoading,
  } = result;

  const [state, setState] = useState({
    isAlertOpen: false,
    alertMessage: "",
    alertStatus: "",
  });

  const handleUpdateTodo = (data) => {
    updateTodo({ data, todo_id });
  };

  useEffect(() => {
    trigger(todo_id);
  }, [todo_id]);

  useEffect(() => {
    if (isError) {
      setState({
        isAlertOpen: true,
        alertMessage: error?.message,
        alertStatus: error?.status,
      });
    }
    if (isSuccess) {
      setState({
        isAlertOpen: true,
        alertMessage: data?.message,
        alertStatus: data?.status,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [isError, isSuccess]);

  if (isGetTodoLoading) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        py="1rem"
      >
        <CircularProgress color="primary" />
      </Stack>
    );
  }

  if (isGetTodoError) {
    return (
      <Container sx={{ paddingY: "2rem" }} maxWidth="md">
        <Button
          component={Link}
          to="/"
          color="inherit"
          size="small"
          variant="text"
          sx={{ mb: "1rem" }}
          startIcon={<BackIcon />}
        >
          Back
        </Button>
        <Alert severity="error" variant="filled">
          No todo found with {todo_id}
        </Alert>
      </Container>
    );
  }

  if (isGetTodoSuccess) {
    return (
      <Container maxWidth="sm" sx={{ paddingY: "2rem" }}>
        <Button
          component={Link}
          to="/"
          color="inherit"
          size="small"
          variant="outlined"
          sx={{ mb: "1rem" }}
          startIcon={<BackIcon />}
        >
          Back
        </Button>
        <Heading title="Edit The Todo" />
        <TodoForm
          isCompleted={todoData.data.isCompleted}
          title={todoData.data.title}
          isLoading={isLoading}
          submitHandler={handleUpdateTodo}
        />

        {state.isAlertOpen && (
          <CustomSnackbar state={state} setState={setState} />
        )}
      </Container>
    );
  }
};

export default EditTodo;
