ctableCtrl.$inject = ['$state', 'ArticalStore', '$scope', 'getArticalList', 'deletePost']
function ctableCtrl($state, ArticalStore, $scope, getArticalList, deletePost) {
    if (!ArticalStore.raw_data) {
        //console.log("usring requested data")
        var articalListPromise = getArticalList.promise()
        articalListPromise.then(
            function(data) {
                ArticalStore.raw_data = data
                ArticalStore.addIndex(ArticalStore.raw_data)
                ArticalStore.incorporate(ArticalStore.raw_data)
                $scope.articalList = ArticalStore.raw_data
            },
            function(error) {

            })
    } else {
        //console.log("useing raw_data")
        $scope.articalList = ArticalStore.raw_data
        //console.log(ArticalStore.raw_data)
    }
    $scope.deleteArtical = function(index) {
        var slug = ArticalStore.raw_data[index].slug
        var deletePromise = deletePost.del(slug)
        deletePromise.then(
            function successCallback(response) {
                ArticalStore.raw_data.splice(index, 1)
                delete(ArticalStore.slug)
                },
            function errorCallback(response) {
                console.log(response.status)
        })
        //console.log(ArticalStore.raw_data)
    }
    $scope.editArtical = function(slug) {
        $state.go('write', {slug: slug})
    }
}

exports.ctableCtrl = ctableCtrl
