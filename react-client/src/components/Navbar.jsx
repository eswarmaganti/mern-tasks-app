import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import DashboardIcon from "@mui/icons-material/DashboardRounded";
import AccountIcon from "@mui/icons-material/AccountCircleRounded";

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
            fontFamily="Montserrat"
            color="primary"
            textTransform="uppercase"
            fontWeight="bold"
          >
            Tasks Tracker
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
              color={`${pathname === "/" ? "primary" : "inherit"}`}
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/account"
              size="small"
              color={`${pathname === "/account" ? "primary" : "inherit"}`}
              startIcon={<AccountIcon />}
            >
              Account
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
