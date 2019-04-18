//Import from Redux
import { createStore, applyMiddleware, compose } from 'redux';
//Import thunk middleware
import thunk from 'redux-thunk';
//Import reducer
import rootReducer from './reducers';

//Set initial state to empty obect
const initState = {};

const middleware = [thunk];

//Holds the state tree of the app
const store = createStore(rootReducer, initState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
