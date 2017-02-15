'use strict'
const express = require('express')
const mongoose = require('mongoose')
const api = require('./routes/api')
const auth = require('./routes/auth')
const upload = require('./routes/upload')
const path = require('path')

//const user = process.env.MONGO_USER
const user = 'articleUser'
//const pswd = process.env.MONGO_PWD
const pswd = 'changeme'
//const mongodbUrl = `mongodb://${user}:${pswd}@localhost:27017/articles`

const mongodbUrl = `mongodb://${user}:${pswd}@mongo1:27017,mongo2:27017,mongo3:27017/articles?replicaSet=replset`

mongoose.connect(mongodbUrl)
mongoose.connection.once('open', () => {
    console.log("DB connected")
})
mongoose.connection.on('error', (err) => {
    console.log("DB connections error:")
    console.log(err)
})

const app = express()
app.use(express.static('../FrontEnd_ReactMobx/build'))

app.use('/api', api)
app.use('/', auth)
app.use('/upload', upload)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd_ReactMobx/build/index.html'))
})

app.listen(3000,"0.0.0.0", () => {
    console.log(Date()+'LISTENING...')
})
