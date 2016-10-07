import React from 'react'

let styleSheet = {
    header: {
        height: 200,
        width: '100%',
        backgroundColor: 'grey',
        textAlign: 'center',
    },
    span: {
        display: 'inline-block',
        fontSize: 50,
        color: 'white',
        marginTop: 75,
    },
    a: {
        textDecoration: 'none',
    }
}


const Header = (props) => {
    return(
        <header style={styleSheet.header}>
            <span style={styleSheet.span}>
            <a href="#" style={styleSheet.a}>{props.header}</a>
            </span>
            <span style={{...styleSheet.span, float: 'right'}}>
            <a onClick={e => {e.preventDefault(); props.showSlide()} } href="#" style={styleSheet.a}>☰</a>
            </span>
        </header>
    )
}

export default Header
