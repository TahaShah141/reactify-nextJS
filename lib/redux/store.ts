import { combineReducers, configureStore } from '@reduxjs/toolkit'
import componentReducer from './slices/componentSlice'
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  components: componentReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const selectComponents = (state: RootState) => state.components
