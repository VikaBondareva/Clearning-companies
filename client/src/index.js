import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {   BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import theme from './themeStyle';
import * as serviceWorker from './serviceWorker';
import {history} from './helpers';
import store from './store/store';
import App from './components/App';

import './index.css';


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
