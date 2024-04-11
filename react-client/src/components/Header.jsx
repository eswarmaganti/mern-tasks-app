import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import { useGetTaskStatsQuery } from "../store/api/tasksApi";

import headerBgImage from "../assets/header_bg_image.jpg";
import { CircularProgress } from "@mui/material";
const Header = () => {
  const { getTasksStats, isError, isLoading, isSuccess, data } =
    useGetTaskStatsQuery();
  return (
    <Box
      sx={{
        height: "150px",
        backgroundImage: `url(${headerBgImage})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backdropFilter: "grayscale(100%)",
      }}
    >
      <Container sx={{ paddingY: "1rem" }}>
        <Typography variant="h5" color="white">
          Tasks Dashboard
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Stack direction="row" gap="1rem" mt="2rem">
            <Chip
              clickable
              label={`New - ${data?.data["new"]}`}
              color="primary"
            />
            <Chip
              clickable
              label={`In Progress - ${data?.data["in progress"]}`}
              color="warning"
            />
            <Chip
              clickable
              label={`In Progress - ${data?.data["completed"]}`}
              color="success"
            />
            <Chip clickable label="Over Due" color="error" />
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Header;
