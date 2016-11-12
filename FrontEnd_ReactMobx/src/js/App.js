import React, { Component } from 'react'
import { observer } from 'mobx-react'
import '../css/App.css'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Whole from './components/Whole'
import FlashMsg from './components/FlashMsg'
import Notfound from './components/Notfound'
import WriteAndRender from './components/WriteAndRender'
import Main from './components/Main'
import { store, flasher } from './stores'


const App = observer(class App extends Component{
    componentWillMount() {
        store.checkLoginStatus()
        store.fetchArticleList()
    }
    render() {
        return(
            <div>
            <Router history={browserHistory}>
                <Route path='/' component={Whole} store={this.props.store}>
                    <IndexRoute component={Main} store={this.props.store}/>
                    <Route path='article/:slug' component={Main} store={this.props.store}/>
                </Route>
                <Route path='write' onEnter={(nextState, replace) => {if (!store.login) {replace({pathname: '/'})}}}>
                    <IndexRoute component={WriteAndRender} store={this.props.store}/>
                    <Route path=':slug' component={WriteAndRender} store={this.props.store}/>
                </Route>
                <Route path="*" component={Notfound} store={this.props.store} />
            </Router>
            <FlashMsg flasher={flasher} />
            </div>
        )
    }
})

export default App
