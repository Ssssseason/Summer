import { mainReducer } from "./views/main/reducers";
import { createStore, compose, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistedItemsReducer } from "./persisteditems/reducers";
import { loginReducer } from "./views/login/reducers";
import { recitationReducer } from "./views/recitation/reducers";
import { settingReducer } from "./views/setting/reducers";
import { wordbookcategoryReducer } from "./views/wordbookcategory/reducers";
import { examReducer } from "./views/exam/reducers";
import { userdefinedReducer } from "./views/userdefined/reducers";

const rootReducer = persistReducer(
    {
        key: 'summer',
        storage,
        whitelist: ['persisteditems']
    },
    combineReducers({
        persisteditems: persistedItemsReducer,
        main: mainReducer,
        login: loginReducer,
        recitation: recitationReducer,
        exam: examReducer,
        userdefined: userdefinedReducer,
        setting: settingReducer,
        wordbookcategory: wordbookcategoryReducer,
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


