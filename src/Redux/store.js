import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


export function configureStore(initialState) {
    let store = "";
    if (window.navigator.userAgent.includes("Chrome") && reduxDevTools) {
        store = createStore(
            reducers,
            initialState,
            compose(
                applyMiddleware(...middlewares),
                reduxDevTools
            )
        );
    } else {
        store = createStore(
            reducers,
            initialState,
            compose(applyMiddleware(...middlewares))
        );
    }

    sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
