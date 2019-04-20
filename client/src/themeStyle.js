import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({ 
  typography: { useNextVariants: true },
  palette: {
    common: {
      black :"#000",
      white: "#fff"
    },
    background:{
      paper:"rgb(246, 247, 220)",
      default:"rgba(255, 255, 255, 1)"
    },
    primary:{
      light:"#71debe",
      main:"#008e6e",
      // main:"#46a78a",
      dark:"#138462",
      contrastText:"#fff"
    },
    secondary:{
      light:"#f8f8f8",
      main:"#647fcc",
      dark:"rgba(62, 39, 49, 1)",
      contrastText:"#a8c6c3"
    },
    "error":{
      "light":"#e57373",
      "main":"#ef4d27",
      "dark":"#d40404",
      "contrastText":"#fff"
    },
    "text":{
        "primary":"#49344f",
        "secondary":"rgba(45, 68, 48, 0.77)",
        "disabled":"rgba(82, 61, 61, 0.38)",
        "hint":"rgb(71, 91, 93)"
      }
    }
});

export default theme;