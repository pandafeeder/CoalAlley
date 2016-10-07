import mobx, { extendObservable, action, transaction } from 'mobx'
import fetch from 'isomorphic-fetch'
import API from '../services/API'

//mobx.useStrict(true)

class Store {
    constructor() {
        extendObservable(this, {
                articleList: [],
                login: false,
                fetching: false,
                fetched: false,
                fetchError: '',
        })
    }
    fetchArticleList = 
        action('fetch articleList', () => {
            this.fetching = true
            fetch(API.articles)
                .then(action(response => {
                    //if (response.status >= 400) {
                    //    this.fetchError = "Bad response from server"
                    //    return
                    //}
                    //return response.json()
                    return [{
                        title: 'title1',
                        slug: 'slug1',
                        created: 'created1',
                    },
                    {
                        title: 'title2',
                        slug: 'slug2',
                        created: 'created2',
                    }
                    ] 
                }))
                .then(action(json => {
                    //transaction makes these following 3 mutations trigger autorun only once
                    transaction(() => {
                        this.articleList = json.map(article => new Article({...article}))
                        this.fetched = true
                        this.fetching = false
                    })
                }))
        })

    fetchArticle = 
        action('fetch single article', slug => {
            let article = this.articleList.find(article => article.slug === slug)
            article.fetchArticle() 
        })

    checkLoginStatus = 
        action('check login status', () => {
            if (localStorage.currentUser) {
                this.login = true
            }
        })
}

class Article {
    constructor({content, slug, created, title}) {
        extendObservable(this, {
            content,
            slug,
            created,
            title,
            fetched: false,
            fetching: false,
            fetchError: ''
        })
    }
    fetchArticle = 
        action(() => {
            this.fetching = true
            fetch(API.article+this.slug)
                .then(action( response => {
                    //if (response.status >= 400) {
                    //    this.fetchError = "Bad response from server"
                    //}
                    //return response.json()   
                    return {content: 'THIS IS MOCKED CONTENT'}
                }))
                .then(action( json => {
                    transaction(() => {
                        this.fetching = false
                        this.fetched = true
                        this.content = json.content
                    })
                }))
        })
}

const store = new Store
window.store = store
export default store
