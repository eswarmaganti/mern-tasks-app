import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AddTodoIcon from "@mui/icons-material/AddTaskOutlined";
import TodoListIcon from "@mui/icons-material/ListOutlined";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <AppBar color="transparent" position="static" sx={{ width: "100%" }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            gutterBottom
            variant="subtitle1"
            textTransform="uppercase"
            color="primary"
            fontWeight="bold"
          >
            Todo Application
          </Typography>
          <Stack
            direction="row"
            gap="2rem"
            justifyContent="flex-end"
            alignItems="center"
            flex={1}
          >
            <Button
              component={Link}
              to="/"
              size="small"
              color={`${pathname === "/" ? "secondary" : "inherit"}`}
              startIcon={<TodoListIcon />}
            >
              My Todos
            </Button>

            <Button
              component={Link}
              to="/add-todo"
              size="small"
              color={`${pathname === "/add-todo" ? "secondary" : "inherit"}`}
              startIcon={<AddTodoIcon />}
            >
              Add Todo
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
