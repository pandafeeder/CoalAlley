//var Prism = require('prismjs')
//npm installed prismjs somehow doesn't highlight properly, 
//use file downloaded from prismjs.org instead
var Prism = require('../prism/prism')

contentCtrl.$inject = ['getArtical', 'ArticalStore', '$scope','$stateParams']
function contentCtrl(getArtical, ArticalStore, $scope, $stateParams) {
    var slug = $stateParams.slug
    //console.log('content working')
    $scope.retriveArtical = function(slug, ArticalStore, getArtical) {
        if (!ArticalStore[slug] || !ArticalStore[slug]['content']) {
            //console.log('use requested data')
            var getPromise = getArtical.getPromise(slug)
            getPromise.then(
                function successCallback(data) {
                    $scope.artical = data
                    //is there a better solution for following if/else? this is clumsy
                    if (ArticalStore[slug]) {
                        ArticalStore[slug]['content'] = data.content
                    } else {
                        ArticalStore[slug] = {}
                        ArticalStore[slug]['content'] = data.content
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
    $scope.retriveArtical(slug, ArticalStore, getArtical)
    //use $watch to push its argument function into digest cycle
    $scope.$watch(function () {
        //console.log("WATCHing...")
        Prism.highlightAll()
    })
}

exports.contentCtrl = contentCtrl
