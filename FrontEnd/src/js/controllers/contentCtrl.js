var showdown = require('showdown')
//var Prism = require('prismjs')
//npm installed prismjs somehow doesn't highlight properly, 
//use file downloaded from prismjs.org instead
var Prism = require('../prism/prism')

contentCtrl.$inject = ['getArtical', 'ArticalStore', '$scope','$stateParams']
function contentCtrl(getArtical, ArticalStore, $scope, $stateParams) {
    var slug = $stateParams.slug
    var converter = new showdown.Converter()
    //console.log('content working')
    $scope.retriveArtical = function(slug, ArticalStore, getArtical, converter) {
        if (!ArticalStore[slug] || !ArticalStore[slug]['content']) {
            //console.log('use requested data')
            var getPromise = getArtical.getPromise(slug)
            getPromise.then(
                function successCallback(data) {
                    data.content_html = converter.makeHtml(data.content)
                    $scope.artical = data
                    if (ArticalStore[slug]) {
                        ArticalStore[slug]['content'] = data.content
                        ArticalStore[slug]['content_html'] = data.content_html
                    } else {
                        ArticalStore[slug] = {}
                        ArticalStore[slug]['content'] = data.content
                        ArticalStore[slug]['content_html'] = data.content_html
                    }
                },
                function errorCallback(data) {
                    $scope.error = data.msg
                }
            )
        } else {
            //console.log('use ArticalStore data')
            $scope.artical = ArticalStore[slug]
        }
    }
    $scope.retriveArtical(slug, ArticalStore, getArtical, converter)
    //use $watch to push its argument function into digest cycle
    $scope.$watch(function () {
        //console.log("WATCHing...")
        Prism.highlightAll()
    })
}

exports.contentCtrl = contentCtrl
