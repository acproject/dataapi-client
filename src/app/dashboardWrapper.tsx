"use client"

import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import {  store } from '@/store/store';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from '@/lib/queryClient';
import axiosInstance from '@/lib/axios';
if (typeof window !== 'undefined') {
  axiosInstance.defaults.baseURL = process.env.TOKEN_URL;
}
const DashboardWrapper = ({children}:{children: React.ReactNode}) => {
  return (
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}>
     <QueryClientProvider client={queryClient}> */}
      {children}
      {/* </QueryClientProvider>
    </PersistGate> */}
  </Provider>
  )
}

export default DashboardWrapper