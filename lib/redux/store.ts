"use client"

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import projectReducer from './slices/projectSlice'
import userReducer from './slices/userSlice'
import memoReducer from './slices/memoSlice'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from 'redux-persist'
import snippetsReducer from './slices/snippetsSlice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['snippets'],
}

const reducer = combineReducers({
  project: projectReducer,
  user: userReducer,
  memo: memoReducer,
  snippets: snippetsReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

export const persistor = persistStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const selectProject = (state: RootState) => state.project
export const selectUser = (state: RootState) => state.user
export const selectMemo = (state: RootState) => state.memo
