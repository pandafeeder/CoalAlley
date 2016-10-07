import React, { Component } from 'react'
import Login from './Login'
import { observer } from 'mobx-react'

let styleSheet = {
    div: {
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: 300,
        backgroundColor: 'green',
    },
}


const Slide = observer(class Slide extends Component {
    constructor(props) {
        super(props)
        this.state = {show: false}
    }
    render() {
        let content = this.props.login 
            ? <div>
                <button>LOGOUT</button>
                <button>WRITE POSST</button>
              </div>
            : <button>LOGIN</button>
        return (
            <div style={this.props.show ? {...styleSheet.div}
                                   : {...styleSheet.div, display: 'none'}
                        }>
                {content}
                <a href="#">GITHUB</a>
                <Login />
            </div>
        )
    }
})

export default Slide
