const auth = require('express').Router()
const signToken = require('../middleware/signToken')
const verifyToken = require('../middleware/verifyToken')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

auth.post('/api-token-auth', jsonParser, signToken)
auth.post('/api-verify-token', verifyToken, (req, res) => {
    res.sendStatus(200)
})

module.exports = exports = auth
