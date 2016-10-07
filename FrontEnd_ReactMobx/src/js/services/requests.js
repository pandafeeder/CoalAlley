import fetch from 'isomorphic-fetch'
import store from '../stores'
import API from './API'

export function fetchArticleList() {
    store.fetching = true
    fetch(API.articles)
        .then(response => {
            if (response.status >= 400) {
                store.fetchError = "Bad response from server"
                return
            } 
            return response.json()
        })
        .then(json => {
            store.articleList = json
            store.fetched = true
            store.fetching = false
        })
}

//export function fetchArticle(slug) {
//
//}
//
//export function login() {
//
//}
