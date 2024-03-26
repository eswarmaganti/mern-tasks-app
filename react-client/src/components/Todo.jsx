import React, { useEffect, useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import { blue, green } from "@mui/material/colors";
import dayjs from "dayjs";
import { Stack } from "@mui/material";

import { useDeleteTodoMutation } from "../store/api/todoApi";
import CustomSnackbar from "./utils/CustomSnackbar";

import { useNavigate } from "react-router-dom";

const Todo = ({ todo }) => {
  const navigate = useNavigate();

  const [deleteTodo, { isError, isSuccess, isLoading, data, error }] =
    useDeleteTodoMutation();

  const [state, setState] = useState({
    isAlertOpen: false,
    alertMessage: "",
    alertStatus: "",
  });
  const { isAlertOpen } = state;
  const { _id, title, isCompleted, createdAt, updatedAt } = todo;

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
    }
  }, [isSuccess, isError]);

  const handleDeleteTodo = () => {
    deleteTodo(_id);
  };

  const handleEditTodo = () => {
    navigate(`/edit-todo/${_id}`);
  };
  return (
    <>
      <TableRow
        sx={{ backgroundColor: `${isCompleted ? green[100] : "inherit"}` }}
      >
        <TableCell>{dayjs(createdAt).format("DD/MM/YYYY")}</TableCell>
        <TableCell>{dayjs(updatedAt).format("DD/MM/YYYY")}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell
          sx={
            isCompleted
              ? { color: green[600], fontWeight: "500" }
              : { color: blue[600], fontWeight: "500" }
          }
        >
          {isCompleted
            ? "Completed".toUpperCase()
            : "In Progress".toUpperCase()}
        </TableCell>
        <TableCell align="center">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap=".5rem"
          >
            <IconButton color="primary" size="small" onClick={handleEditTodo}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" size="small" onClick={handleDeleteTodo}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      {isAlertOpen && <CustomSnackbar state={state} setState={setState} />}
    </>
  );
};

export default Todo;
