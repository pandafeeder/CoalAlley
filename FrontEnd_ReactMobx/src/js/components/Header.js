import React from 'react'
const glamor = require('glamor')

const Header = (props) => (
        <header className={`${headerStyle}`}>
            <a {...glamor.merge(aStyle, articleListSlideBar)}
                onClick={e => { e.preventDefault()
                                props.articleListslideBarToogle()
                                e.stopPropagation()
                             }}
                href="#0">☰</a>
            <a className={`${aStyle}`} href="/">{props.header}</a>
            <a className={`${aStyle}`} style={{float: 'right', marginRight: '10px'}}
                onClick={e => { e.preventDefault()
                                props.slideBarToogle()
                                e.stopPropagation()
                              }} 
                href="#0">☰</a>
        </header>
)

export default Header

let headerStyle = glamor.style({
    height: '300px',
    backgroundImage: 'url("/ocean.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
    boxShadow: '3px 3px 3px grey',
    marginBottom: '5px'
})
let aStyle = glamor.style({
    fontFamily: 'Optima,Lucida Console,Arial,serif',
    fontWeight: 'bold',
    textShadow: '0px 0px 5px white',
    display: 'inline-block',
    lineHeight: '100px',
    marginTop: '100px',
    fontSize: '3.5em',
    color: '#213854',
    ':visted': {
        color: '#213854',
    }
})
let articleListSlideBar = glamor.style({
    display: 'none',
    float: 'left',
    marginLeft: '10px',
    '@media(max-width: 800px)': {
        display: 'inline-block'
    }
})
