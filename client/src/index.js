import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store/store';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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
    "primary":{
      "light":"rgba(21, 95, 36, 1)",
      "main":"rgba(26, 134, 104, 1)",
      "dark":"rgba(61, 88, 72, 1)",
      "contrastText":"#fff"
    },
    "secondary":{
      "light":"rgba(29, 194, 75, 1)",
      "main":"rgba(60, 128, 54, 1)",
      "dark":"rgba(62, 39, 49, 1)",
      "contrastText":"#fff"
    },
    "error":{
      "light":"#e57373",
      "main":"rgba(224, 60, 48, 1)",
      "dark":"#d32f2f",
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


ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
     document.getElementById('root')
);

serviceWorker.unregister();
