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

window.store = store
window.mobx = mobx

let kittyHouse = mobx.observable({
            catsCount: 10,
            foodAtePerCat: 10,
            get totalFoodAte() {
                return this.catsCount * this.foodAtePerCat
            }
})
window.kittyHouse = kittyHouse
