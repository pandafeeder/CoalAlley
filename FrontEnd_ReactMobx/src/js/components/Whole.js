import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Header from './Header'
import Slide from './Slide'
import Footer from './Footer'
import Login from './Login'


const Whole = observer(class Whole extends Component {
    constructor(props) {
        super(props)
        this.state = {showSlideFuncBar: false,
                      showLogin: false}
        this.showSlideFunc = this.showSlideFunc.bind(this)
        this.showLoginFunc = this.showLoginFunc.bind(this)
        this.closeLoginFunc = this.closeLoginFunc.bind(this)
        this.keyupHandler = this.keyupHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    showSlideFunc() {
        this.setState({showSlideFuncBar : true})
    }

    showLoginFunc() {
        this.setState({showLogin: true})
    }
    closeLoginFunc() {
        this.setState({showLogin: false})
    }

    keyupHandler(e) {
        if (e.keyCode === 27) {
            this.setState({showSlideFuncBar: false})
        }
    }
    clickHandler(e) {
        this.setState({showSlideFuncBar: false})
    }

    componentDidMount() {
        this.whole.addEventListener('keyup', e => this.keyupHandler(e))
        this.whole.addEventListener('click', e => this.clickHandler(e))
    }

    componentWillUnmount() {
        this.whole.removeEventListener('keyup', e=> this.keyupHandler(e))
        this.whole.removeEventListener('click', e => this.clickHandler(e))
    }

    render() {
        return(
            <div ref={ref => this.whole = ref}>
                <Header header="Coal Alley"
                        showSlideFunc={this.showSlideFunc}
                />
                <Slide login={this.props.route.store.login} show={this.state.showSlideFuncBar} showLoginFunc={this.showLoginFunc}/>
                <Login closeLoginFunc={this.closeLoginFunc} show={this.state.showLogin}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
})

export default Whole
