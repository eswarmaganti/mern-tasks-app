import React, { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import { useAddNewTodoMutation } from "../store/api/todoApi";
import CustomSnackbar from "./utils/CustomSnackbar";
import TodoForm from "./TodoForm";
import Heading from "./utils/Heading";

const AddTodo = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isAlertOpen: false,
    alertMessage: "",
    alertStatus: "",
  });

  const { isAlertOpen, alertMessage, alertStatus } = state;

  const [addNewTodo, { isSuccess, isError, isLoading, data, error }] =
    useAddNewTodoMutation();

  const handleAddTodo = ({ title, isCompleted }) => {
    addNewTodo({ title, isCompleted });
  };

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
  return (
    <Container maxWidth="sm">
      <Heading title="Add New Todo" />
      <TodoForm
        title=""
        isCompleted={false}
        isLoading={isLoading}
        submitHandler={handleAddTodo}
      />

      {isAlertOpen && <CustomSnackbar state={state} setState={setState} />}
    </Container>
  );
};

export default AddTodo;
