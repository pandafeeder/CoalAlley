var showdown = require('showdown')
//var Prism = require('prismjs')
//npm installed prismjs somehow doesn't highlight properly, 
//use file downloaded from prismjs.org instead
var Prism = require('../prism/prism')

contentCtrl.$inject = ['getArtical', 'ArticalStore', 'API','$scope','$stateParams','$http']
function contentCtrl(getArtical, ArticalStore, API, $scope, $stateParams, $http) {
    var id = $stateParams.id
    var converter = new showdown.Converter()
    //console.log('content working')
    if (!ArticalStore[id] || !ArticalStore[id]['content']) {
        console.log("using requested detail data")
        var getPromise = getArtical.getPromise(id)
        getPromise.then(
            function successCallback(data) {
                data.content_html = converter.makeHtml(data.content)
                $scope.artical = data 
                if (ArticalStore[id]) {
                ArticalStore[id]['content'] = data.content
                ArticalStore[id]['content_html'] = data.content_html
                } else {
                    ArticalStore[id] = {}
                    ArticalStore[id]['content'] = data.content
                    ArticalStore[id]['content_html'] = data.content_html
                }
            },
            function errorCallback(data) {
                $scope.error = data.msg
        })
    } else {
        console.log("using ArticalSotre.id")
        $scope.artical = ArticalStore[id]
    }
    $scope.$watch(function () {
        //console.log("WATCHing...")
        Prism.highlightAll()
    })
}

exports.contentCtrl = contentCtrl
