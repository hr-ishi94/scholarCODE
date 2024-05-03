import { configureStore,combineReducers } from "@reduxjs/toolkit";
import usersListSlice from '../Slices/UserListSlice'
import MentorsSlice from "../Slices/MentorsSlice";
import MentorDetailSlice from "../Slices/MentorDetailSlice";
import {persistStore,persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import UserDetailsSlice from "../Slices/UserDetailsSlice";


const rootReducer = combineReducers({
    userList :usersListSlice,
    Mentors : MentorsSlice,
    Mentor:MentorDetailSlice,
    User:UserDetailsSlice
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  

const persistor = persistStore(store)

export {store, persistor}
