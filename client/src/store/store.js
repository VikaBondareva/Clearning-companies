import {createStore, compose, applyMiddleware} from 'redux';
import rootReduce from '../reducers/index';
import {createLogger} from 'redux-logger';

const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const namespace = "mega-clean"

const getMiddleware = () => {
    // if (process.env.NODE_ENV === 'production') {
    //     return applyMiddleware(save({
    //         namespace}));
    // } else {
        return applyMiddleware( createLogger());
    // }
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