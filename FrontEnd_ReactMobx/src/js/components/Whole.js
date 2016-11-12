import React, { Component } from 'react'
import { observer } from 'mobx-react'
const glamor = require('glamor')

import Header from './Header'
import Slide from './Slide'
import Footer from './Footer'
import Login from './Login'
import ArticleListSlideBar from './ArticleListSlideBar'


const Whole = observer(class Whole extends Component {
    constructor(props) {
        super(props)
        this.state = {showSlideBar: false,
                      showArticleListSlideBar: false,
                      showLogin: false}
        this.showLoginFunc = this.showLoginFunc.bind(this)
        this.slideBarToogle = this.slideBarToogle.bind(this)
        this.articleListslideBarToogle = this.articleListslideBarToogle.bind(this)
        this.closeLoginFunc = this.closeLoginFunc.bind(this)
        this.keyupHandler = this.keyupHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    slideBarToogle() {
        this.setState({showSlideBar : !this.state.showSlideBar})
    }
    articleListslideBarToogle() {
        this.setState({showArticleListSlideBar: !this.state.showArticleListSlideBar})
    }
    showLoginFunc() {
        this.setState({showLogin: true})
    }
    closeLoginFunc() {
        this.setState({showLogin: false})
    }

    keyupHandler(e) {
        if (e.keyCode === 27) {
            this.setState({showSlideBar: false})
            this.setState({showArticleListSlideBar: false})
        }
    }
    clickHandler(e) {
        this.setState({showSlideBar: false})
        this.setState({showArticleListSlideBar: false})
    }

    componentDidMount() {
        this.whole.addEventListener('keyup', e => this.keyupHandler(e))
    }

    componentWillUnmount() {
        this.whole.removeEventListener('keyup', e=> this.keyupHandler(e))
    }

    render() {
        return(
            <div ref={ref => this.whole = ref} className={`${containerStyle}`}
                 style={
                     this.state.showSlideBar ? {right: '300px'} : {right: '0px'}
                 }
                 onClick={e => this.clickHandler(e)}
            >
                <Header header="Coal Alley"
                        slideBarToogle={this.slideBarToogle}
                        articleListslideBarToogle={this.articleListslideBarToogle}
                />
                <ArticleListSlideBar store={this.props.route.store} show={this.state.showArticleListSlideBar} />
                <Slide store={this.props.route.store} show={this.state.showSlideBar} showLoginFunc={this.showLoginFunc}/>
                <Login store={this.props.route.store} closeLoginFunc={this.closeLoginFunc} show={this.state.showLogin}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
})

export default Whole

let containerStyle = glamor.style({
    position: 'relative',
    transition: 'all ease-in-out 0.5s',
})
