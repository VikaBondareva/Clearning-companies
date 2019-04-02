import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ConnectedRouter as Router  } from 'connected-react-router'
import { ThemeProvider } from "@material-ui/styles";
import theme from './themeStyle';
import * as serviceWorker from './serviceWorker';
import {history} from './helpers';
import store from './store/store';
import App from './containers/AppContainer';
import { initializePreviousToken } from "./helpers/authentication";
import './index.css';

initializePreviousToken(store);

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
