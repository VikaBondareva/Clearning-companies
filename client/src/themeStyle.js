import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({ 
  typography: { useNextVariants: true },
  palette: {
    common: {
      black :"#000",
      white: "#fff"
    },
    background:{
      paper:"rgba(214, 225, 149, 1)",
      default:"rgba(255, 255, 255, 1)"
    },
    primary:{
      light:"#12af81",
      main:"#2EAA86",
      dark:"##12af81",
      contrastText:"#fff"
    },
    secondary:{
      light:"rgba(29, 194, 75, 1)",
      main:"#FCE770",
      dark:"rgba(62, 39, 49, 1)",
      contrastText:"#fff"
    },
    "error":{
      "light":"#e57373",
      "main":"#F27152",
      "dark":"#EA4C25",
      "contrastText":"#fff"
    },
    "text":{
        "primary":"rgba(43, 37, 37, 0.87)",
        "secondary":"rgba(53, 75, 56, 0.54)",
        "disabled":"rgba(82, 61, 61, 0.38)",
        "hint":"rgba(0, 0, 0, 0.38)"
      }
    }
});

export default theme;