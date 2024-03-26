import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const CustomSnackbar = ({ state, setState }) => {
  const { isAlertOpen, alertMessage, alertStatus } = state;
  const handleClose = () => {
    setState({ alertMessage: "", alertStatus: "", isAlertOpen: false });
  };
  return (
    <Snackbar
      open={isAlertOpen}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={TransitionUp}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alertStatus}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
};

export default CustomSnackbar;
