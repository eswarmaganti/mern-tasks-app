import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["Raleway", "sans-serif"].join(","),
  },
  palette: {
    secondary: red,
  },
});

export default theme;
