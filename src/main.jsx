import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Father } from './event/index'
import Hoc from './Hoc'
import Modal from './customModal'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Modal></Modal>
  </React.StrictMode>
)
