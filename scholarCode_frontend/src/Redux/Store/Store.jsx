import { configureStore,combineReducers } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import MentorsSlice from "../Slices/MentorsSlice";
import MentorDetailSlice from "../Slices/MentorDetailSlice";
import UserDetailsSlice from "../Slices/UserDetailsSlice";
import CoursesListSlice from "../Slices/CoursesListSlice";
import CategoryListSlice from "../Slices/CategoryListSlice";
import CourseDetailsSlice from "../Slices/CourseDetailsSlice";
import TasksListSlice from "../Slices/TasksListSlice";
import TaskEditSlice from "../Slices/TaskEditSlice";
import AdminAuthSlice from "../Slices/AdminAuthSlice";
import usersListSlice from '../Slices/UserListSlice'
import MentorAuthSlice from "../Slices/MentorAuthSlice";
import UserAuthSlice from "../Slices/UserAuthSlice";


const rootReducer = combineReducers({
    userList :usersListSlice,
    Mentors : MentorsSlice,
    Mentor:MentorDetailSlice,
    User:UserDetailsSlice,
    Courses:CoursesListSlice,
    Course:CourseDetailsSlice,
    Categories:CategoryListSlice,
    Tasks:TasksListSlice,
    Task:TaskEditSlice,
    AdminToken:AdminAuthSlice,
    MentorToken:MentorAuthSlice,
    UserToken:UserAuthSlice

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
