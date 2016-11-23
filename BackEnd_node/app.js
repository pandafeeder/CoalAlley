'use strict'
const express = require('express')
const mongoose = require('mongoose')
const api = require('./routes/api')
const auth = require('./routes/auth')
const upload = require('./routes/upload')
const path = require('path')

const mongodb = 'mongodb://username:password@localhost:27017/articles'
mongoose.connect(mongodb)
mongoose.connection.once('open', () => {
    console.log("DB connected")
})
mongoose.connection.on('error', () => {
    console.log("DB connections error")
})

const app = express()
app.use(express.static('../FrontEnd_ReactMobx/build'))

app.use('/api', api)
app.use('/', auth)
app.use('/upload', upload)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd_ReactMobx/build/index.html'))
})

app.listen(3000, () => {
    console.log(Date()+'LISTENING...')
})
