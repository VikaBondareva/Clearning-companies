import {createStore, compose, applyMiddleware} from 'redux';
import rootReduce from '../reducers/index';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from "connected-react-router";
import {history,jwtCheck} from '../utils';

const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const getMiddleware = () => {
    const  middlewareDev = [createLogger(),jwtCheck,thunk, routerMiddleware(history)];
    const middlewareProd = [jwtCheck,thunk, routerMiddleware(history)];
    if (process.env.REACT_APP_NODE_ENV === 'production') {
        return applyMiddleware(...middlewareProd);
    } else {
        return applyMiddleware( ...middlewareDev);
    }
};

const configureStore = preloadedState => (
    createStore(
        rootReduce,
        preloadedState,
        composeEnhancers(getMiddleware())
    )
);

const store = configureStore({});

export default store;