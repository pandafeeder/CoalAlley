loginCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', 'API', 'Authentication']
function loginCtrl($rootScope, $scope, $location, $http, API, Authentication) {
    //console.log("loginCtrl working too")
    function closeLoginForm () {
        $scope.showLogin = false
        $scope.showLoginNav = false
        $scope.showCloseLoginFormBtn = true
    }
    function openLoginForm () {
        $scope.showLogin = true
        $scope.showLoginNav = true
        $scope.showCloseLoginFormBtn = false
    }
    if ($location.path() == '/login') {
        openLoginForm()
    }
    $scope.loginSubmit = function () {
        var loginPromise = Authentication.Login($scope.username, $scope.passwd)
        loginPromise.then(
            function successCallback(msg) {
                closeLoginForm()
                $scope.$emit("loginEvent")
            },
            function errorCallback(msg) {
                console.log(msg)
            }
        )
    }
}

exports.loginCtrl = loginCtrl
