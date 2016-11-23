const mongoose = require('mongoose')

var ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    created: {type: Date, default: Date.now},
    content: {type: String, required: true},
    slug: {type:String, unique: true, required: true}
})


var Article = mongoose.model('Article', ArticleSchema)

exports = module.exports = Article
