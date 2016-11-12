import mobx, { extendObservable, action, transaction } from 'mobx'
import fetch from 'isomorphic-fetch'
import API from '../services/API'
import Article from './Article'
import flasher from './Flasher'

export default class Store {
    constructor() {
        extendObservable(this, {
                articleList: [],
                login: false,
                fetching: false,
                fetched: false,
        })
    }

    fetchArticleList = 
        action('fetch articleList', () => {
            this.fetching = true
            fetch(API.articles)
                .then(action(response => {
                    if (response.status >= 400) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                }))
                .then(action(json => {
                    //transaction makes these following 3 mutations trigger autorun only once
                    transaction(() => {
                        if (json.length > 0) {
                            this.articleList = json.map(article => new Article({...article}))
                        }
                        this.fetched = true
                        this.fetching = false
                    })
                }))
                .catch(err => {
                    flasher.flash(err.message, 'danger')
                })
        })

    checkLoginStatus = action(() => {
        if (localStorage.token) {
            fetch(API.verifyToken,{
                method: 'POST',
                headers: {
                    'Authentication': 'Bearer '+localStorage.token
                }})
            .then(action(response => {
                if (response.status >= 400) {
                    throw new Error(response.statusText)
                } 
                return 'OK'
            }))
            .then(action(text => {
                this.login = true
            }))
            .catch(err => {
                localStorage.removeItem('token')
                flasher.flash(err.message)
            })
        } else {
            this.login = false
        }
    })

    getToken = 
        action('get JWTtoken', (email, password) => {
            fetch(API.token, {method: 'POST', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({email: email, password: password})})
            .then(action(response => {
                if (response.status >= 400) {
                    throw newError(response.statusText)
                }
                return response.json()
            }))
            .then(action(json => {
                transaction( () => {
                    localStorage.setItem('token', json.token)
                    this.login = true
                    flasher.flash('Welcome', 'safe')
                })
            }))
            .catch(err => {
                flasher.flash(err.message)
            })
        })
}
