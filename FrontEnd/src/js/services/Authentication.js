Authentication.$inject = ['$q', '$http', 'API', '$localStorage']
function Authentication($q, $http, API, $localStorage) {
    var service = {}
    service.Login = Login
    service.Logout = Logout
    return service

    function Login (username, passwd) {
        var deferred = $q.defer()
        var req = {
            method: 'POST',
            url: API.JWTtokenURL,
            data: {
                'username': username,
                'password': passwd,
            }
        }
        $http(req).then(
            function successCallback (response) {
                $localStorage.currentUser = {'username': username, 'token': response.data.token}
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
                deferred.resolve('loginSuccessed')
            },
            function errorCallback (response) {
                console.log(response.status)
                deferred.reject('loginFailed')
            }
        )
        return deferred.promise
    }

    function Logout () {
        delete $localStorage.currentUser
        $http.defaults.headers.common.Authorization = ''
    }
}

exports.Authentication = Authentication
