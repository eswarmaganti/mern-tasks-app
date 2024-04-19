import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { DateField } from "@mui/x-date-pickers";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import AddIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";

import dayjs from "dayjs";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAddNewTaskMutation } from "../../store/api/tasksApi";
import CustomSnackbar from "../utils/CustomSnackbar";

const TaskSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be minimum 3 characters long")
    .required("Title is required"),
  description: Yup.string()
    .min(3, "Description must be minimum 3 characters long")
    .required("Description are required"),
  start_date: Yup.string().required("Start Date is required"),
  end_date: Yup.string().required("End Date is required"),
  status: Yup.mixed().oneOf(["new", "in progress", "completed"]),
});

const AddNewTask = () => {
  // state hook for alert
  const [alertState, setAlertState] = useState({
    isAlertOpen: false,
    alertMessage: "",
    alertState: "",
  });
  // state hook to handle the open/close of dialog
  const [open, setOpen] = useState(false);

  // handler to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // handler to open dialog
  const handleDialogOpen = () => {
    setOpen(true);
  };

  // react-hook-form initilization
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(TaskSchema),
    defaultValues: {
      status: "new",
    },
  });

  // redux state mutation
  const [
    addNewTask,
    { isSuccess, isError, isLoading, data: addNewTaskData, error },
  ] = useAddNewTaskMutation();

  // form handler to dispatch action
  const addNewTaskHandler = (data) => {
    console.log(data);
    addNewTask(data);
  };

  // effect hook to handle api call
  useEffect(() => {
    if (isSuccess || isError)
      setAlertState({
        isAlertOpen: true,
        alertMessage: addNewTaskData?.message,
        status: addNewTaskData?.status,
      });
  }, [isSuccess, isError]);

  // effect hook to clear the form after task is saved successfully
  useEffect(() => {
    if (isSuccess) {
      reset({ title: "", description: "", end_date: "", status: "", tag: "" });
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  }, [isSuccess]);

  return (
    <Box>
      <Button
        endIcon={<AddIcon />}
        onClick={handleDialogOpen}
        variant="contained"
        color="primary"
        size="small"
      >
        New Task
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="primary" textAlign="center">
          Add New Task
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(addNewTaskHandler)}>
            <TextField
              {...register("title")}
              name="title"
              type="text"
              variant="standard"
              fullWidth
              margin="normal"
              label="Title"
              helperText={
                errors?.title?.message && `*** ${errors?.title?.message} ***`
              }
              error={Boolean(errors?.title?.message)}
            />
            <TextField
              {...register("description")}
              name="description"
              variant="standard"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              label="Task Description"
              helperText={
                errors?.description?.message &&
                `*** ${errors?.description?.message} ***`
              }
              error={Boolean(errors?.description?.message)}
            />
            <DateField
              {...register("start_date")}
              name="start_data"
              variant="standard"
              color="primary"
              fullWidth
              label="Task Start Date"
              margin="normal"
              defaultValue={dayjs()}
              helperText={
                errors?.start_date?.message &&
                `*** ${errors?.start_date?.message} ***`
              }
              error={Boolean(errors?.start_date?.message)}
            />
            <DateField
              {...register("end_date")}
              name="end_date"
              variant="standard"
              color="primary"
              fullWidth
              label="Task End Date"
              margin="normal"
              helperText={
                errors?.end_date?.message &&
                `*** ${errors?.end_date?.message} ***`
              }
              error={Boolean(errors?.end_date?.message)}
            />

            <FormControl margin="normal">
              <FormLabel>Task Status</FormLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field} value={getValues("status")}>
                    <FormControlLabel
                      value="new"
                      control={<Radio />}
                      label="New"
                    />
                    <FormControlLabel
                      label="In Progress"
                      control={<Radio />}
                      value="in progress"
                    />
                    <FormControlLabel
                      label="Completed"
                      control={<Radio />}
                      value="completed"
                    />
                  </RadioGroup>
                )}
              />
              <FormHelperText error={Boolean(errors?.status?.message)}>
                {errors?.status?.message &&
                  `*** ${errors?.status?.message} ***`}
              </FormHelperText>
            </FormControl>
            <TextField
              {...register("tag")}
              name="tag"
              type="text"
              label="Tag"
              margin="normal"
              fullWidth
              color="primary"
              variant="standard"
            />
            <DialogActions>
              <Button
                size="small"
                type="button"
                variant="outlined"
                color="error"
                endIcon={<CloseIcon />}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                size="small"
                type="submit"
                variant="outlined"
                color="success"
                endIcon={
                  !isLoading ? (
                    <SaveIcon />
                  ) : (
                    <CircularProgress size={20} color="success" />
                  )
                }
              >
                Save Task
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <CustomSnackbar state={alertState} setState={setAlertState} />
    </Box>
  );
};

export default AddNewTask;
