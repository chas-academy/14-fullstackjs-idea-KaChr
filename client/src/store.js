// Import from Redux
import { createStore, applyMiddleware, compose } from 'redux';
// Import thunk middleware
import thunk from 'redux-thunk';
// Import reducer
import rootReducer from './reducers';

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

// Holds the state tree of the app
const store = createStore(rootReducer, enhancer);

export default store;
