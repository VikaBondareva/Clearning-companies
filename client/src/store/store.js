import {createStore, compose, applyMiddleware} from 'redux';
import rootReduce from '../reducers/index';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// const namespace = "mega-clean"

const getMiddleware = () => {
   const  middleware = [createLogger(),thunk];
    // if (process.env.NODE_ENV === 'production') {
    //     return applyMiddleware(save({
    //         namespace}));
    // } else {
    return applyMiddleware( ...middleware);
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