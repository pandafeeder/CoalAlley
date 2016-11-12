import React from 'react'
import { action, transaction } from 'mobx'
import { observer } from 'mobx-react'

import Writer from './Writer'
import Renderer from './Renderer'
import { Article } from '../stores'
const glamor = require('glamor')


const WriteAndRender = observer((props) => {
    let article, articleOrig
    let store = props.route.store
    if (props.params.slug) {
        if (store.fetching) {
            return <div>LOADING...</div>
        }
        if (store.fetchError) {
            return <div>FETCHING FAILED...</div>
        }
        transaction(() => {
            articleOrig = store.articleList.find(i => (
                i.slug === props.params.slug
            ))
            if (!articleOrig.content) {
                articleOrig.fetchArticle()
            }
            let {title, slug, content} = articleOrig
            article = new Article({
                title, slug, content
            })
        })
    } else {
        article = new Article({
            title: '',
            slug: '',
            content: ''
        })
    }
    return (
        <div className={`${containerStyle}`}>
            <Writer slug={props.params.slug} store={store} article={article} articleOrig={articleOrig}/>
            <Renderer store={store} article={article}/>
        </div>
    )
})

export default WriteAndRender

let containerStyle= glamor.style({
    display: 'flex',
    width: '100%',
})
