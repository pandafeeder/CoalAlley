import React, { Component } from 'react'
import { observer } from 'mobx-react'
import '../css/App.css'
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
//weird, import it from history directely failed
import { createHashHistory } from '../../node_modules/react-router/node_modules/history'
import fetch from 'isomorphic-fetch'
import Whole from './components/Whole'
import Write from './components/Write'
import Main from './components/Main'
import store from './stores'


const appHistory = useRouterHistory(createHashHistory)({queryKey: false})


const App = observer(class App extends Component{
    componentWillMount() {
        store.checkLoginStatus()
        store.fetchArticleList()
    }
    render() {
        return(
            <Router history={appHistory}>
                <Route path='/' component={Whole} store={this.props.store}>
                    <IndexRoute component={Main} store={this.props.store}/>
                    <Route path='article/:slug' component={Main} store={this.props.store}/>
                </Route>
                <Route path='write' component={Write}/>
            </Router>
        )
    }
})

export default App
