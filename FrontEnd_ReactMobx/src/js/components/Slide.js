import React, { Component } from 'react'
import { Link } from 'react-router'
import { observer } from 'mobx-react'
import { action } from 'mobx'
const glamor = require('glamor')

const Slide = observer(props => {
    let content = props.store.login 
        ? <div className={`${buttonDiv}`}>
            <button className={`${buttonStyle}`} 
                    onClick={e => {
                        localStorage.removeItem('token')
                        action(() => props.store.login = false)()
                    }}
            >
                <span className={`${logoutwriteStyle}`}>LOGOUT</span>
            </button><br/>
            <button className={`${buttonStyle}`}>
                <Link className={`${logoutwriteStyle}`} to={{pathname: 'write'}}>WRITE POST</Link>
            </button>
          </div>
        : <div className={`${buttonDiv}`}>
            <button onClick={(e) => {
                props.showLoginFunc()
                }}
                className={`${buttonStyle}`}
            >
            <i className="fa fa-sign-in" style={{fontSize: '50px'}}></i>
            </button>
          </div>
    return (
        <div className={`${containerStyle}`} style={props.show ? {right: '0px'} : {right: '-300px'}}>
            {content}
            <div className={`${githubStyle}`}>
                <a href="https://github.com/pandafeeder/CoalAlley">
                    <i style={{fontSize: '60px'}} className="fa fa-github"></i>
                </a>
            </div>
        </div>
    )
})

export default Slide


let containerStyle = glamor.style({
    position: 'fixed',
    top: 0,
    height: '100%',
    width: '300px',
    backgroundColor: '#F0FFFF',
    transition: 'all ease-in-out 0.5s',
    boxShadow: '-2px 0px 2px grey'
})
let buttonDiv = glamor.style({
    marginTop: '125px',
    width: '100%',
    textAlign: 'center',
})
let buttonStyle = glamor.style({
    border: 'none',
    backgroundColor: 'inherit',
    outline: 'none',
    ':hover': {
        cursor: 'pointer',
    },
    ':active': {
        transform: 'translateY(4px)'
    }
})
let githubStyle = glamor.style({
    width: '100%',
    position: 'absolute',
    bottom: 80,
    textAlign: 'center',
})
let logoutwriteStyle = glamor.style({
    display: 'inline-block',
    border: '2px solid black',
    lineHeight: '50px',
    width: '150px',
    backgroundColor: 'yellow',
    boxShadow: '8px 8px 8px grey',
    textAlign: 'center',
    borderRadius: '5px',
    marginBottom: '50px',
})
