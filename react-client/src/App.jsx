import react from "react";
// import { Container, Typography, Grid } from "@mui/material";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import TodosList from "./components/TodosList";
import Layout from "./components/Layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TodosList />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/edit-todo/:todo_id" element={<EditTodo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
