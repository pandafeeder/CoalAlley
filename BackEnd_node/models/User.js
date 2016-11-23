const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    pwd: String
    },
    {
        collection: 'user'
    }    
)

exports = module.exports = mongoose.model('User', UserSchema)
