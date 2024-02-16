import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { FrontendChatbot } from './FrontendChatbot'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FrontendChatbot />
  </React.StrictMode>,
)
