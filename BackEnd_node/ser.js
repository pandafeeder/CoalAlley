'use strict'
const express = require('express')
const Article = require('./models/Article')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const signToken = require('./middleware/signToken')
const verifyToken = require('./middleware/verifyToken')

const urlencodedParser = bodyParser.urlencoded({extended: false})
const jsonParser = bodyParser.json()

const mongodb = 'mongodb://articleUser:huangbajian@localhost:27017/articles'
mongoose.connect(mongodb)
mongoose.connection.once('open', () => {
    console.log("DB connected")
})
mongoose.connection.on('error', () => {
    console.log("DB connections error")
})


const app = express()
app.use(express.static('../FrontEnd_ReactMobx/build'))

app.get('/api/articals', (req, res) => {
    Article.find({}, (err, articles) => {
        if(err) {
            res.sendStatus(500)
        }
        res.send(articles)
    })
})

app.post('/api/articals', jsonParser, verifyToken, (req, res) => {
    var article = new Article({
        title : req.body.title,
        slug: req.body.slug,
        content: req.body.content
    })
    article.save()
    res.sendStatus(201)
})

app.get('/api/articals/:slug', (req, res) => {
    var slug = req.params.slug
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

app.put('/api/articals/:slug', jsonParser, verifyToken, (req, res) => {
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
            }
    )
})

app.delete('/api/articals/:slug', verifyToken, (req, res) => {
    Article.findOne({'slug': req.params.slug}, (err, article) => {
        if (err) {
            res.sendStatus(500)
        }
        if (article) {
            article.remove()
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    })
})

app.post('/api-token-auth', jsonParser, signToken)
app.post('/api-verify-token', verifyToken, (req, res) => {
    res.sendStatus(200)
})
app.get('*', (req, res) => {
    res.sendFile('/Users/qusr/GitHub/learnDjango/CoalAlley/FrontEnd_ReactMobx/build/index.html')
})

app.listen(3000, () => {
    console.log(Date()+'LISTENING...')
})
