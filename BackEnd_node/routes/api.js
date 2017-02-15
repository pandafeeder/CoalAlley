const api = require('express').Router()
const bodyParser = require('body-parser')
const verifyToken = require('../middleware/verifyToken')
const Article = require('../models/Article')

const urlencodedParser = bodyParser.urlencoded({extended: false})
const jsonParser = bodyParser.json()

api.get('/articles', (req, res) => {
    Article.find({}, null, {sort: {created: -1}}, (err, articles) => {
        if (err) {
            res.sendStatus(500)
        }
        res.send(articles)
    })
})
api.post('/articles', verifyToken, jsonParser, (req, res) => {
    var article = new Article({
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        created: req.body.created
    })
    article.save()
    res.sendStatus(201)
})
api.get('/articles/:slug', (req, res) => {
    Article.findOne({'slug': req.params.slug}, (err, article) => {
        if (err) {
            res.sendStatus(500)
        }
        if (article) {
            res.send(article)
        } else {
            res.sendStatus(404)
        }
    })
})
api.put('/articles/:slug', verifyToken, jsonParser, (req, res) => {
    Article.findOneAndUpdate({'slug': req.params.slug},
            {
                title: req.body.title,
                slug: req.body.slug,
                content: req.body.content
            },
            (err, doc) => {
                if (err) {
                    res.sendStatus(500)
                }
                if (doc) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(404)
                }
            })
})
api.delete('/articles/:slug', verifyToken, (req, res) => {
    Article.findOneAndRemove({'slug': req.params.slug},
            (err, doc) => {
                if (err) {
                    res.sendStatus(500)
                }
                if (doc) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(404)
                }
            })
})

module.exports = api
