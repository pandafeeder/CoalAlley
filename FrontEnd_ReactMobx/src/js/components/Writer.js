import React from 'react'
import { observer } from 'mobx-react'
import { action, transaction } from 'mobx'
import { browserHistory } from 'react-router'
const glamor = require('glamor')

const Writer = observer((props) => {
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
                <table style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <th><p>Title:</p></th>
                            <th>
                                <input className={`${inputTextStyle}`}
                                    onChange={e => action(() => props.article.title = e.target.value)()} 
                                    name="title" type="text" value={props.article.title}/>
                            </th>
                            <th>
                                <input rowSpan='2' type="submit"/>
                            </th>
                        </tr>
                        <tr>
                            <th><p>Slug:</p></th>
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
    height: '90vh',
    resize: 'none',
})
