import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./themeStyle";
import * as serviceWorker from "./serviceWorker";
import { history } from "./utils";
import store from "./store/store";
import App from "./containers/AppContainer";
import axios from "axios";
import { initializePreviousToken } from "./utils/authentication";
import "./index.css";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.default.timeout = 3000;
initializePreviousToken(store);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
