deletePost.$inject = ['API', '$q', '$http']

function deletePost(API, $q, $http) {
    return {
        del: function (slug) {
            var deferred = $q.defer();
            $http.delete(API.artical+slug).then(
                function successCallback(response) {
                    deferred.resolve(response.status);
                },
                function errorCallback(response) {
                    deferred.reject(response.status);
            });
            return deferred.promise;
            }
    }
}

exports.deletePost = deletePost
