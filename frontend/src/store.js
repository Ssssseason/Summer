import {mainReducer }from "./views/main/reducers";
import { createStore, compose } from 'redux';


import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    main: mainReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
const store = createStore(
    mainReducer,
    composeEnhancers()
);

export default store;

