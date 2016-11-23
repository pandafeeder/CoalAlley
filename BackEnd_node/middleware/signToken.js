'use strict'
const User = require('../models/User')
const njwt = require('njwt')
const uuid = require('node-uuid')
const bcrypt = require('bcryptjs')

//safer, but when thread is dead, this will make all token verifying fail, need user to reauthenticate
const secretKey = uuid.v4()

function signToken(req, res, next) {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (err) {
            res.sendStatus(500)
        }
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.pwd)) {
                var jwt = njwt.create({sub: req.body.email, iss: 'https://pandafeeder.com'}, secretKey)
                jwt.setExpiration(new Date().getTime() + (1000*60*60*24*7))
                var token = jwt.compact()
                res.send({token})
            } else {
                res.status(403).send('Wrong password')
            }
        } else {
            res.status(403).send('No such email')
        }
    })
}

exports = module.exports = signToken
exports.secretKey = secretKey
