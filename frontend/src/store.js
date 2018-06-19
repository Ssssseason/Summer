import { mainReducer } from "./views/main/reducers";
import { createStore, compose, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistedItemsReducer } from "./persisteditems/reducers";
import { loginReducer } from "./views/login/reducers";
import { recitationReducer } from "./views/recitation/reducers";

const rootReducer = persistReducer(
    {
        key: 'summer',
        storage,
        whitelist: ['persistedItemsReducer']
    },
    combineReducers({
        persisteditems: persistedItemsReducer,
        main: mainReducer,
        login: loginReducer,
        recitation: recitationReducer,
    })
)
// const rootReducer = combineReducers({
//     persistitem: persistItemReducer,
//     main: mainReducer,
// })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export const persistor = persistStore(store);


