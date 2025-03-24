import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from "redux-persist";
import dialogReducer from "./dialogSlice"
import {encryptTransform} from "redux-persist-transform-encrypt";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    transforms: [
        encryptTransform({
            secretKey: import.meta.env.VITE_SECURE_LOCAL_STORAGE_HASH_KEY,
            onError: function (error) {
                console.error(error)
            },
        }),
    ],
}

const rootReducer = combineReducers({
    auth: authReducer,
    dialog : dialogReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
})

export const persistor = persistStore(store)