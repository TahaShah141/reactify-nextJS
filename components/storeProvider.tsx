'use client'
import { persistor, store } from '@/lib/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// import { makeStore, AppStore } from '@/lib/redux/store'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {

  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    {children}
    </PersistGate>
    </Provider>
}