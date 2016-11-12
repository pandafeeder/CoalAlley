import mobx from 'mobx'
import flasher from './Flasher'
import Store from './Store'
import Article from './Article'

mobx.useStrict(true)

let store = new Store()

export {store, flasher, Article}
