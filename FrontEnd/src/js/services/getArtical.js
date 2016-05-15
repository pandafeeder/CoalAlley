getArtical.$inject = ['$http', '$q', 'API']

function getArtical($http, $q, API) {
    return {
        getPromise: function (slug) {
            var deferred = $q.defer()
            $http.get(API.artical+slug).then(
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

exports.getArtical = getArtical
