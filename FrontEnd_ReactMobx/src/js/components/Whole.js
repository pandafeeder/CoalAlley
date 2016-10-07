import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Header from './Header'
import Slide from './Slide'
import Footer from './Footer'


const Whole = observer(class Whole extends Component {
    constructor(props) {
        super(props)
        this.state = {showSlideBar: false}
        this.showSlide = this.showSlide.bind(this)
        this.keyupHandler = this.keyupHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    showSlide() {
        this.setState({showSlideBar : true})
    }

    keyupHandler(e) {
        if (e.keyCode === 27) {
            this.setState({showSlideBar: false})
        }
    }
    clickHandler(e) {
        this.setState({showSlideBar: false})
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
                        showSlide={this.showSlide}
                />
                <Slide login={this.props.route.store.login} show={this.state.showSlideBar}/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
})

export default Whole
