import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/DeleteForeverRounded";
import CancelIcon from "@mui/icons-material/CancelRounded";
import { CircularProgress } from "@mui/material";

const DeleteDialog = ({
  dialogState,
  setDialogState,
  handleAction,
  isActionLoading,
}) => {
  const handleDialogClose = () => {
    setDialogState(false);
  };
  return (
    <Dialog open={dialogState} onClose={handleDialogClose}>
      <Box p="1rem">
        <DialogTitle>Are you sure to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will delete the item perminently and cannot be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            endIcon={<CancelIcon />}
            color="primary"
            variant="outlined"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            endIcon={
              !isActionLoading ? (
                <DeleteIcon />
              ) : (
                <CircularProgress size={20} color="inherit" />
              )
            }
            color="error"
            onClick={() => handleAction()}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;
