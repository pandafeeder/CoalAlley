import React from 'react'
const glamor = require('glamor')

const Footer = () => (
    <footer className={`${containerStyle}`}>
        <a href="mailto:pandafeeder@gmail.com">pandafeeder@gmail.com</a>
    </footer>
)


export default Footer

let containerStyle = glamor.style({
    display: 'inline-block',
    lineHeight: '100px',
    textAlign: 'center',
    width: '100%',
})
