import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Father } from './event/index'
import Hoc from './Hoc'
import { VirtualList } from './virtualList'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VirtualList />
  </React.StrictMode>
)
