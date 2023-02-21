import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { postApi } from './app/services/posts'

import { BrowserRouter } from 'react-router-dom'
import { ApiProvider } from '@reduxjs/toolkit/query/react'

// Initialize the msw worker, wait for the service worker registration to resolve, then mount
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ApiProvider api={postApi}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ApiProvider>
    </React.StrictMode>
  )

