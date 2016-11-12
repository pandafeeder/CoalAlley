import React from 'react'
import { observer } from 'mobx-react'
import Article from './Article'
import ArticleList from './ArticleList'
import * as StoreModule from '../stores'
const glamor = require('glamor')

//container for ArticleList and Article
const Main = observer((props) => {
        if (props.route.store.fetching) {
            return <div className={`${containerStyle}`}>LOADING...</div>
        }
        if (props.route.store.fetchError) {
            return <div className={`${containerStyle}`}>FETCHING FAILED...</div>
        }
        let article
        if (props.route.store.articleList.length > 0) {
            let slug = props.params.slug || props.route.store.articleList[0].slug
            article = props.route.store.articleList.find(article=> article.slug === slug)
            if (!article.content) {
                article.fetchArticle()
            }
        } else {
            article = new StoreModule.Article({content: 'No article yet'})
        }
        return(
            <div className={`${containerStyle}`}>
                <ArticleList store={props.route.store}/>
                <Article login={props.route.store.login} article={article} store={props.route.store} />
            </div>
        )
})


export default Main

let containerStyle = glamor.style({
    display: 'flex',
    justifyContent: 'center',
    minHeight: '300px',
})
