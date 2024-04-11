import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import BackIcon from "@mui/icons-material/ChevronLeftRounded";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { Link, useParams } from "react-router-dom";

import dayjs from "dayjs";

import { useGetATaskQuery } from "../../store/api/tasksApi";
import { Chip, CircularProgress, colors, Grid, Stack } from "@mui/material";
import TipTapEditor from "../tiptap/TipTapEditor";

const TaskView = () => {
  const { id } = useParams();

  const { getATask, isError, isLoading, isSuccess, data } =
    useGetATaskQuery(id);

  if (isLoading) {
    return (
      <Stack alignContent="center" justifyContent="center">
        <CircularProgress color="primary" />
      </Stack>
    );
  }

  return (
    <Container sx={{ p: "1rem" }}>
      <Box marginY="1rem">
        <Button
          LinkComponent={Link}
          to="/"
          variant="outlined"
          color="warning"
          startIcon={<BackIcon />}
        >
          Dashboard
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box py="1rem">
            <Typography
              gutterBottom
              variant="h5"
              sx={{ textDecoration: "underline" }}
            >
              {data?.data?.title}
            </Typography>
            <Typography variant="body2">{data?.data?.description}</Typography>
            <TipTapEditor />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Last Updated Date</TableCell>
                <TableCell>Tag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {dayjs(data?.data?.start_date).format("DD MMMM YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(data?.data?.end_date).format("DD MMMM YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(data?.data?.updatedAt).format("DD MMMM YYYY")}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    variant="outlined"
                    clickable
                    label={data?.data?.tag.toUpperCase()}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskView;
