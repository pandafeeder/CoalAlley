import React from 'react'
import { observer } from 'mobx-react'
import Article from './Article'
import ArticleList from './ArticleList'
import fetch from 'isomorphic-fetch'
import API from '../services/API'

let styleSheet = {
    container: {
        display: 'flex',
        border: '2px solid red',
        justifyContent: 'center',
    }
}

const Main = observer((props) => {
    if (props.route.store.fetching) {
        return <div style={styleSheet.container}>LOADING...</div>
    }
    if (props.route.store.fetchError) {
        return <div style={styleSheet.container}>FETCHING FAILED...</div>
    }
    let slug = props.params.slug || props.route.store.articleList[0].slug
    let article = props.route.store.articleList.find(article=> article.slug === slug)
    props.route.store.fetchArticle(slug)
    return(
        <div style={styleSheet.container}>
            <ArticleList store={props.route.store}/>
            <Article login={props.route.store.login} article={article}>
            </Article>
        </div>
    )
})


export default Main
