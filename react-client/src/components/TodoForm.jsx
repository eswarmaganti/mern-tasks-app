import React, { useEffect, useState } from "react";

// MUI Components imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";

// MUI Icons imports
import SendIcon from "@mui/icons-material/SendOutlined";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";

const TodoSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title should be minimum 3 characters")
    .max(200, "Title should be maximum 200 characters")
    .required("Title is required"),
});

const TodoForm = ({ title, isCompleted, isLoading, submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TodoSchema),
    defaultValues: {
      title: title,
      isCompleted: isCompleted,
    },
  });

  return (
    <Card variant="outlined" sx={{ p: "2rem", bgcolor: grey[100] }}>
      <form
        onSubmit={handleSubmit((data) => submitHandler(data))}
        autoComplete="off"
        noValidate
      >
        <TextField
          {...register("title")}
          label="Todo Title"
          required
          fullWidth
          margin="dense"
          helperText={
            errors?.title?.message && `*** ${errors?.title?.message} ***`
          }
          error={Boolean(errors?.title?.message)}
        />
        <FormGroup>
          <FormControlLabel
            label="Completed"
            control={
              <Checkbox
                {...register("isCompleted")}
                defaultChecked={isCompleted}
              />
            }
          />
        </FormGroup>
        <Button
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          startIcon={!isLoading && <SendIcon />}
          sx={{ mt: ".5rem" }}
        >
          {!isLoading ? (
            "Submit"
          ) : (
            <CircularProgress size="24" color="primary" />
          )}
        </Button>
      </form>
    </Card>
  );
};

export default TodoForm;
