import  rootReducer  from './reducers/index';
import { createStore, compose, applyMiddleware } from 'redux';
import { save } from 'redux-localstorage-simple';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;


const ConfigureStore = preloadedState => (
    createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            applyMiddleware(save({
                namespace: 'user'
            }))
        ),
    )
);

const store = ConfigureStore({});

export default store