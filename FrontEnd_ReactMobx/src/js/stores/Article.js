import { extendObservable, action, transaction } from 'mobx'
import fetch from 'isomorphic-fetch'
import API from '../services/API'
import flasher from './Flasher'

export default class Article {
    constructor({content, slug, created, title}) {
        extendObservable(this, {
            content,
            slug,
            created,
            title,
            fetched: false,
            fetching: false,
        })
    }

    fetchArticle = 
        action(() => {
            this.fetching = true
            fetch(API.article+this.slug)
                .then(action( response => {
                    if (response.status >= 400) {
                        throw new Error(response.statusText)
                    }
                    return response.json()   
                }))
                .then(action( json => {
                    transaction(() => {
                        this.fetching = false
                        this.fetched = true
                        this.content = json.content
                    })
                }))
                .catch(err =>{
                    flasher.flash(err.message)
                })
        })

    publish = 
        action((store) => {
            fetch(API.articles, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Bearer '+localStorage.token
                },
                body: JSON.stringify({
                    title: this.title,
                    content: this.content,
                    slug: this.slug
                })
            })
            .then(action((response) => {
                if (response.status >= 400) {
                    throw new Error(response.statusText)
                }
                return 'OK'
            }))
            .then(action((text) => {
                store.articleList.push(this)
            }))
            .catch(err => {
                flasher.flash(err.message)
            })
        })

    del = 
        action((store) => {
            fetch(API.article+this.slug, {
                method: 'DELETE',
                headers: {
                    'Authentication': 'Bearer '+localStorage.getItem('token')
                }
            }).then(action( response => {
                if(response.status >= 400) {
                    throw new Error(response.statusText)
                }
                return 'OK'
            })).then(action((text) => {
                store.articleList = store.articleList.filter(i => i.slug !== this.slug)
            }))
            .catch(err => {
                flasher.flash(err.message)
            })
        })

    put = 
        action(() => {
            fetch(API.article+this.slug, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Bearer '+localStorage.getItem('token')
                },
                body: JSON.stringify({
                    title: this.title,
                    content: this.content,
                    slug: this.slug
                })
            }).then(response => {
                if (response.status >= 400) {
                    throw new Error(response.statusText)
                } else {
                    return 'OK'
                }
            }).then(text => {
                flasher.flash('Update succeeded!')
            }).catch(err => {
                flasher.flash(err.message)
            })
        })
}
