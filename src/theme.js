import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "darkred",
          backgroundColor: "#fff",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#f3a683",
    },
    secondary: {
      main: "#f19066",
    },
    error: {
      main: red.A400,
    },

    disabled: {
      main: "#979797",
      dark: "#9A9696",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
