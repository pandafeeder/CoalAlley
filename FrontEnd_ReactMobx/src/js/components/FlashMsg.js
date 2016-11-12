import React from 'react'
import { observer } from 'mobx-react'
const glamor = require('glamor')

const FlashMsg = observer((props) => {
    return (
        <div className={`${containerStyle}`} style={props.flasher.message ? null : {display: 'none'}}>
            <div {...glamor.merge(msgBoxBaseStyle, cate[props.flasher.style])}>{props.flasher.message}</div>
        </div>
    )
})

export default FlashMsg

let msgBoxBaseStyle = glamor.style({
    display: 'inline-block',
    backgroundColor: 'grey',
    lineHeight: '100px',
    width: '300px',
    borderRadius: '3px',
    textAlign: 'center',
    boxShadow: '5px 5px 5px grey'
})

let cate = {}
cate.warn = glamor.style({
    backgroundColor: 'orange'
})
cate.safe = glamor.style({
    backgroundColor: 'green'
})
cate.danger = glamor.style({
    backgroundColor: 'red'
})


let containerStyle = glamor.style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
})
