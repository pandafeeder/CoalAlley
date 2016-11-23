'use strict'
const User = require('../models/User')
const njwt = require('njwt')
const secretKey = require('./signToken').secretKey


function verifyToken (req, res, next) {
    if (req.headers.authentication) {
        var token = req.headers.authentication.split(' ')[1]
        njwt.verify(token, secretKey, (err, verifiedJwt) => {
            if(err) {
                res.status(403).send(err.message)
            }
            if(verifiedJwt) {
                next()
            }
        })
    } else {
        res.sendStatus(403)
    }
}


exports = module.exports = verifyToken
