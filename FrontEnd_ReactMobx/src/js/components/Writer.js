import React from 'react'
import { observer } from 'mobx-react'
import { action, transaction } from 'mobx'
import { browserHistory } from 'react-router'
import Uploader from './Uploader'
const glamor = require('glamor')

const Writer = observer((props) => {
    let fileinput
    if (props.article.fetching) {
        return <div>LOADING...</div>
    } 
    if (props.article.fetchError) {
        return <div>FETCHING FAILED</div>
    }
    return(
        <div className={`${containerStyle}`}>
            <form onSubmit={e => {
                e.preventDefault()
                if (props.article.title && props.article.slug && props.article.content) {
                    if (props.slug) {
                        props.article.put()
                        transaction(action(() => {
                                props.articleOrig.title = props.article.title
                                props.articleOrig.slug = props.article.slug
                                props.articleOrig.content = props.article.content
                        }))
                    } else {
                        props.article.publish(props.store)
                    }
                    browserHistory.push('/')
                }
            }}>
                <table style={{width: '80%', marginBottom:'10px'}}>
                    <tbody>
                        <tr>
                            <th style={{textAlign:'left', width: '10%'}}>Title:</th>
                            <th style={{width: '80%'}}>
                                <input className={`${inputTextStyle}`}
                                    onChange={e => action(() => props.article.title = e.target.value)()} 
                                    name="title" type="text" value={props.article.title}/>
                            </th>
                            <th style={{width: '10%', verticalAlign:'middle', textAlign:'center'}} rowSpan="2">
                                <input style={{fontSize: '1.2em', border:'none', borderRadius: '2px', backgroundColor:'lightgreen', height:'100%', width:'100%'}} type="submit"/>
                            </th>
                        </tr>
                        <tr>
                            <th style={{textAlign:'left'}}>Slug:</th>
                            <th>
                                <input className={`${inputTextStyle}`}
                                    onChange={e => action(() => props.article.slug = e.target.value)()} 
                                    name="slug"  type="text" value={props.article.slug}/>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <textarea className={`${textAreaStyle}`}
                    onChange={e => action(() => {
                                props.article.content = e.target.value
                    })()}
                    name="content" 
                    value={props.article.content}
                    >
                </textarea>
            </form>
            <Uploader/>
        </div>
    )
})

export default Writer

let containerStyle = glamor.style({
    width: '50%',
    padding: '5px',
})
let inputTextStyle = glamor.style({
    display: 'block',
    width: '100%',
})
let textAreaStyle = glamor.style({
    display: 'block',
    width: '100%',
    height: '88vh',
    resize: 'none',
})
