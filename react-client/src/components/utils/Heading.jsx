import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

const Heading = ({ title }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ py: "2rem" }}
    >
      <Typography
        textTransform="uppercase"
        fontWeight="600"
        color="secondary"
        variant="subtitle1"
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            width: "2rem",
            height: ".2rem",
            borderRadius: "1rem",
            bgcolor: red[500],
            display: "block",
            position: "absolute",
            bottom: 0,
            right: 0,
          },
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default Heading;
