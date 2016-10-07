import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/App'
import './index.css'
import store from './js/stores'
import mobx from 'mobx'

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
)
