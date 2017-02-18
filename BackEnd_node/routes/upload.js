'use strict'
const verifyToken = require('../middleware/verifyToken')
const upload = require('express').Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), '../FrontEnd_ReactMobx/media'))
    }, 
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploader = multer({storage: storage})

upload.post('/', verifyToken, uploader.array('img'), (req, res) => {
    res.sendStatus(200)
})


module.exports = upload
