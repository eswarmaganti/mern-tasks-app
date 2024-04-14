import React, { useEffect, useState } from "react";

{
  /* -- Imports of MUI Compoenents -- */
}
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import BackIcon from "@mui/icons-material/ChevronLeftRounded";
import UpdateCalendarIcon from "@mui/icons-material/EditCalendarRounded";
import CalanderIcon from "@mui/icons-material/EventAvailableRounded";
import EditTaskIcon from "@mui/icons-material/EditNoteRounded";

// -- Imports of Custom Components and Hooks --
import TipTapEditor from "../TipTapEditor";
import { useGetATaskQuery } from "../../store/api/tasksApi";
import {
  useAddTaskUpdateMutation,
  useGetTaskUpdatesQuery,
} from "../../store/api/taskUpdatesApi";
import CustomSnackbar from "../utils/CustomSnackbar";

{
  /* -- Imports of installed pacages -- */
}
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import parse from "html-react-parser";

const TaskView = () => {
  const { id } = useParams();

  // state hook for alert
  const [alertState, setAlertState] = useState({
    isAlertOpen: false,
    alertMessage: "",
    alertState: "",
  });

  const { isError, isLoading, isSuccess, data } = useGetATaskQuery(id);
  console.log(data);
  const [
    addTaskUpdate,
    {
      isLoading: isTaskUpdateLoading,
      isSuccess: isTaskUpdateSuccess,
      isError: isTaskUpdateError,
      data: taskUpdateData,
    },
  ] = useAddTaskUpdateMutation();

  // handler method to dispatch add task update
  const handleAddTaskUpdate = (description) => {
    addTaskUpdate({ taskid: id, description });
  };

  // effect hook to push snackbar updates
  useEffect(() => {
    if (isTaskUpdateSuccess || isTaskUpdateError)
      setAlertState({
        isAlertOpen: true,
        alertMessage: taskUpdateData?.message,
        status: taskUpdateData?.status,
      });
  }, [isTaskUpdateError, isTaskUpdateSuccess]);

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
          size="small"
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
        {/* -- Create Task updates and Task Updates List Components -- */}
        <Grid item xs={8}>
          <Box py="1rem">
            <Typography
              gutterBottom
              variant="h5"
              sx={{ textDecoration: "underline" }}
            >
              {data?.data?.title}
            </Typography>
            <Typography variant="body2">{data?.data?.description}</Typography>
            <TipTapEditor
              onSubmit={handleAddTaskUpdate}
              isLoading={isTaskUpdateLoading}
            />
          </Box>

          <TaskUpdatesList taskid={id} />
        </Grid>

        {/* -- Task Details Compoenent -- */}
        <Grid item xs={4}>
          <TaskDetailsTable
            startDate={data?.data?.start_date}
            endDate={data?.data?.end_date}
            tag={data?.data?.tag}
            updatedAt={data?.data?.updatedAt}
          />
        </Grid>
      </Grid>

      <CustomSnackbar state={alertState} setState={setAlertState} />
    </Container>
  );
};

const TaskDetailsTable = ({ startDate, endDate, updatedAt, tag }) => {
  return (
    <Table component={Paper} size="small">
      <TableBody>
        <TableRow>
          <TableCell sx={{ fontWeight: "500" }}>Start Date</TableCell>
          <TableCell>
            <Chip
              size="small"
              color="primary"
              variant="outlined"
              clickable
              icon={<CalanderIcon />}
              label={dayjs(startDate).format("DD MMMM YYYY")}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: "500" }}>End Date</TableCell>
          <TableCell>
            <Chip
              size="small"
              color="success"
              variant="outlined"
              clickable
              icon={<CalanderIcon />}
              label={dayjs(endDate).format("DD MMMM YYYY")}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: "500" }}>Last Updated</TableCell>
          <TableCell>
            <Chip
              size="small"
              color="warning"
              variant="outlined"
              clickable
              icon={<CalanderIcon />}
              label={dayjs(updatedAt).format("DD MMMM YYYY")}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: "500" }}>Tag</TableCell>
          <TableCell>
            <Chip
              size="small"
              color="primary"
              variant="filled"
              clickable
              label={tag.toUpperCase()}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const TaskUpdatesList = ({ taskid }) => {
  const { getTaskUpdates, isError, isSuccess, isLoading, data } =
    useGetTaskUpdatesQuery(taskid);
  if (isLoading) return <CircularProgress color="primary" />;
  console.log(data);
  return (
    <Box>
      {data?.data.map((update) => (
        <Card
          key={update._id}
          sx={{ my: "1rem" }}
          className="taskupdates_card"
          variant="outlined"
        >
          <CardContent sx={{ fontFamily: "Rubik" }}>
            {parse(update.description)}
          </CardContent>
          <CardActions>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Stack direction="row" gap={2}>
                <Chip
                  label={dayjs(update.createdAt).format("DD MMMM YYYY")}
                  clickable
                  icon={<CalanderIcon />}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={dayjs(update.updatedAt).format("DD MMMM YYYY")}
                  clickable
                  icon={<UpdateCalendarIcon />}
                  color="warning"
                  variant="outlined"
                />
              </Stack>
              <Stack direction="row" gap={1}>
                <IconButton color="warning">
                  <EditTaskIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default TaskView;
