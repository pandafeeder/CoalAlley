import React from 'react'
import { observer } from 'mobx-react'
import converter from '../services/Markdown'
const glamor = require('glamor')

const Renderer = observer((props) => {
    if (props.article.fetching) {
        return <div>LOADING...</div>
    } 
    if (props.article.fetchError) {
        return <div>FETCHING FAILED</div>
    }
    return(
        <div className={`${containerStyle}`}>
            <h1 className={`${h1Style}`}>{props.article.title}</h1>
            <div
            dangerouslySetInnerHTML={{__html: converter.makeHtml(props.article.content)}}/>
        </div>
    )
})

export default Renderer

let containerStyle = glamor.style({
    height: '100vh',
    width: '50%',
    overflowY: 'scroll',
    padding: '5px',
})
let h1Style = glamor.style({
    fontSize: '2rem',
    marginBottom: '10px',
})
