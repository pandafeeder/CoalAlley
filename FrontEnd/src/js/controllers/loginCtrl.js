loginCtrl.$inject = ['$scope', 'Authentication']
function loginCtrl($scope, Authentication) {
    //console.log("loginCtrl working too")
    function closeLoginForm () {
        $scope.showLogin = false
        $scope.showLoginNav = false
        $scope.showCloseLoginFormBtn = true
    }
    $scope.loginSubmit = function () {
        var loginPromise = Authentication.Login($scope.username, $scope.passwd)
        loginPromise.then(
            function successCallback(msg) {
                closeLoginForm()
                $scope.$emit("loginEvent")
            },
            function errorCallback(msg) {
                $scope.authFail = true
            }
        )
    }
    $scope.$on("closeLoginForm", function () {
        $scope.authFail = false
    })
}

exports.loginCtrl = loginCtrl
