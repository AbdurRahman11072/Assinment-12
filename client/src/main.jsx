import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider'
import Routes from './Routes/routes'
import './index.css'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterProvider router={Routes}></RouterProvider>

      </AuthProvider>
     
    </QueryClientProvider>
 
  </React.StrictMode>,
)
