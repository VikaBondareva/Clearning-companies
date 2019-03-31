import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createBrowserHistory } from 'history';
import {   BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import theme from './themeStyle';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import App from './routes/routes';

import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router history={history}  >
              <App/>
          </Router>
        </ThemeProvider>
    </Provider>,
     document.getElementById('root')
);

serviceWorker.unregister();
