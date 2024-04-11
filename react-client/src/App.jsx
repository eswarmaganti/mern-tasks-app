import react from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TaskView from "./components/tasks/TaskView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/task/:id" element={<TaskView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
