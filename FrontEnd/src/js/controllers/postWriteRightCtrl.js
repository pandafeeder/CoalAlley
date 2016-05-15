var showdown = require('showdown')

postWriteRightCtrl.$inject = ['MD2HTML', '$scope']

function postWriteRightCtrl(MD2HTML, $scope) {
    $scope.ToHTML = function () {
        var converter = new showdown.Converter()
        var text = MD2HTML.writing
        var html = converter.makeHtml(text)
        return html
    }
}

exports.postWriteRightCtrl = postWriteRightCtrl
