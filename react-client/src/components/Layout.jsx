import React from "react";

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Layout;
