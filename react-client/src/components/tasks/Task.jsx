import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/OpenInNewOutlined";
import DeleteIcon from "@mui/icons-material/ClearOutlined";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { blue, orange, green, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { useDeleteTaskMutation } from "../../store/api/tasksApi";

const Task = ({ task }) => {
  const getCardStatusColor = (status) => {
    if (status == "new") return blue[200];
    if (status == "in progress") return orange[200];
    if (status == "completed") return green[200];
  };

  const [deleteTask, { isError, isSuccess, isLoading, data }] =
    useDeleteTaskMutation();

  const handleDeleteTask = () => {
    deleteTask(task._id);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        marginY: ".5rem",
        borderColor: getCardStatusColor(task.status),
        transition: "all 150ms ease-in",
        // "&:hover": {
        //   backgroundColor: getCardStatusColor(task.status),
        // },
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
        />
        <Stack width="100%" direction="row" justifyContent="flex-end">
          <IconButton
            size="small"
            color="error"
            type="button"
            onClick={handleDeleteTask}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Task;
