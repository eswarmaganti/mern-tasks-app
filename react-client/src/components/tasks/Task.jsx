import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { blue, orange, green, red } from "@mui/material/colors";

import LinkIcon from "@mui/icons-material/OpenInNewOutlined";
import TagIcon from "@mui/icons-material/SellRounded";
import EditTaskIcon from "@mui/icons-material/EditNoteRounded";
import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";

import { Link } from "react-router-dom";
import dayjs from "dayjs";

import DeleteDialog from "../utils/DeleteDialog";
import { useDeleteTaskMutation } from "../../store/api/tasksApi";
import CustomSnackbar from "../utils/CustomSnackbar";

const Task = ({ task }) => {
  // state hook for alert
  const [alertState, setAlertState] = useState({
    isAlertOpen: false,
    alertMessage: "",
    alertState: "",
  });

  const getCardStatusColor = (status) => {
    if (status == "new") return blue[200];
    if (status == "in progress") return orange[200];
    if (status == "completed") return green[200];
  };

  const [deleteTaskDialogState, setDeleteTaskDialogState] = useState(false);

  const [
    deleteTask,
    {
      isError: isDeleteTaskError,
      isSuccess: isDeleteTaskSuccess,
      isLoading: isDeleteTaskLoading,
      data: deleteTaskData,
    },
  ] = useDeleteTaskMutation();

  // callback function to handle the dispatch of delete task redux action
  const handleDeleteTask = () => {
    console.log(`Task with ${task._id} will be deleted`);
    deleteTask(task._id);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteTaskDialogState(true);
  };

  // effect hook to handle api call
  useEffect(() => {
    if (isDeleteTaskSuccess || isDeleteTaskError)
      setAlertState({
        isAlertOpen: true,
        alertMessage: deleteTaskData?.message,
        status: deleteTaskData?.status,
      });
  }, [isDeleteTaskSuccess, isDeleteTaskError]);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          marginY: ".5rem",
          borderColor: getCardStatusColor(task.status),
          transition: "all 150ms ease-in",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" fontSize="1rem">
              {task.title}
            </Typography>
          }
          subheader={
            <Typography variant="caption">
              {dayjs(task.start_date).format("DD MMM YY")}
            </Typography>
          }
          action={
            <Link to={`/task/${task._id}`}>
              <IconButton color="primary">
                <LinkIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Link>
          }
        />
        <CardContent>
          <Typography variant="body2">{task.description}</Typography>
        </CardContent>
        <CardActions>
          <Chip
            label={task.tag.toUpperCase()}
            size="small"
            variant="outlined"
            color="primary"
            icon={<TagIcon />}
            clickable
          />
          <Stack width="100%" direction="row" justifyContent="flex-end">
            <IconButton
              size="small"
              color="warning"
              type="button"
              onClick={() => {}}
            >
              <EditTaskIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              type="button"
              onClick={handleDeleteDialogOpen}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Card>
      <DeleteDialog
        dialogState={deleteTaskDialogState}
        setDialogState={setDeleteTaskDialogState}
        handleAction={handleDeleteTask}
        isActionLoading={isDeleteTaskLoading}
      />
      <CustomSnackbar state={alertState} setState={setAlertState} />
    </>
  );
};

export default Task;
