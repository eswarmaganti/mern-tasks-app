import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import Todo from "./Todo";
import { useFetchAllTodosQuery } from "../store/api/todoApi";
import Heading from "./utils/Heading";

const TodosList = () => {
  const { isLoading, isSuccess, isError, data, error } =
    useFetchAllTodosQuery();

  if (isLoading) {
    <Stack direction="row" justifyContent="center">
      <CircularProgress />
    </Stack>;
  }

  if (isSuccess && data.data.length == 0) {
    return (
      <Container maxWidth="md" sx={{ paddingY: "1rem" }}>
        <Alert variant="filled" severity="info">
          No todos Available!!!
        </Alert>
      </Container>
    );
  }

  if (isSuccess)
    return (
      <Container>
        <Heading title="My Todo's" />
        <TableContainer component={Card} variant="outlined" sx={{ mt: "1rem" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ textTransform: "uppercase" }}>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((todo) => {
                return <Todo todo={todo} key={todo._id} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
};

export default TodosList;
