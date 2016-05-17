var showdown = require('showdown')

function md2html () {
    return function(md) {
        var converter = new showdown.Converter()
        return converter.makeHtml(md || '')
    }
}

exports.md2html = md2html
