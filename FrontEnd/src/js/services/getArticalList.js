getArticalList.$inject = ['$http', '$q', 'API']

function getArticalList($http, $q, API) {
    return {
        promise: function() {
            var deferred = $q.defer()
            $http.get(API.articalListUrl).then(
                function successCallback(response) {
                    deferred.resolve(response.data)
                },
                function errorCallback(response) {
                    deferred.reject(response.status)
            })
            return deferred.promise
        },
    }
}

exports.getArticalList = getArticalList
