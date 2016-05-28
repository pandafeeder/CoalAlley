//var Prism = require('prismjs')
//npm installed prismjs somehow doesn't highlight properly, 
//use file downloaded from prismjs.org instead
var Prism = require('../prism/prism')

contentCtrl.$inject = ['getArtical', 'ArticalStore', '$scope','$stateParams', '$http', 'API', '$q']
function contentCtrl(getArtical, ArticalStore, $scope, $stateParams, $http, API, $q) {
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
    $scope.retriveLatest = function() {
        if (ArticalStore.latest) {
            $scope.artical = ArticalStore.latest
        } else {
            var deferred = $q.defer()
            $http.get(API.articalListUrl+"?ordering=latest").then(
                 function successCallback(response) {
                     deferred.resolve(response.data)
                 },
                 function errorCallBack(response) {
                     deferred.reject(response.status)
                 })
            deferred.promise.then(
                function successCallback(data) {
                    $scope.artical = data
                    ArticalStore.latest = data
                },
                function errorCallback(error) {
                    $scope.error = error
                })
        }
    }
    if (!slug) {
        $scope.retriveLatest()
    } else {
        $scope.retriveArtical(slug, ArticalStore, getArtical)
    }
    //use $watch to push its argument function into digest cycle
    $scope.$watch(function () {
        //console.log("WATCHing...")
        Prism.highlightAll()
    })
}

exports.contentCtrl = contentCtrl
