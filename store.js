import { configureStore } from '@reduxjs/toolkit';
import allReducers from "./public/Reducers/"

const STORE = configureStore({
    reducer: allReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
})});

export default STORE;  