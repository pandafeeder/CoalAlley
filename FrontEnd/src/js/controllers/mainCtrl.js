mainCtrl.$inject = ['modifyStyle', 'Authentication', '$http', '$localStorage', '$scope', '$rootScope', '$location', '$state']

function mainCtrl (modifyStyle, Authentication, $http, $localStorage, $scope, $rootScope, $location, $state) {
    //check if the user has logged in by retriving localStorage.currentUser
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        $scope.isLoggedin = true
        } else {
            $scope.isLoggedin = false
        }

        //this is for slide memu bar
        $scope.showMenu = false

        //this is for loginForm
        $scope.showLogin = false

        //this is for ctable switch button when @media is mobile size
        $scope.ctableSwitch = function(e) {
            modifyStyle.switchClass()
            e.stopPropagation()
        }

        //function as menu button's ng-click event handler
        $scope.menuSwitch = function(e) {
            $scope.showMenu = !$scope.showMenu
            e.stopPropagation()
        }

        //fucntion for dealing with ESC pressed and clicked event
        //this will close the slide menu bar
        $scope.closeMenu = function() {
            $scope.showMenu = false
        };

        //function as login button's ng-click event handler
        $scope.loginFormSwitch = function() {
            $scope.showLogin = !$scope.showLogin
            $scope.showCloseLoginFormBtn = !$scope.showCloseLoginFormBtn
        }

        //function to write new post button
        $scope.writePost = function(e){
            $state.go('write')
            //this will prevent loginForm from showing up when back from write page
            $scope.showLogin = false
        }

        $rootScope.$on("escapePressed", _closeMenu)
        $rootScope.$on("documentClicked", _closeMenu)
        $rootScope.$on("logoutEvent", function () {
            Authentication.Logout()
            $scope.isLoggedin = false
            $scope.showLogin = false
        })
        $rootScope.$on("loginEvent", function () {
            $scope.isLoggedin = true
            $scope.showLogin = false
        })

        function _closeMenu() {
        //use $apply to run javascript in Angular's context
            $scope.$apply(function() {
                $scope.closeMenu()
                modifyStyle.removeClass('ctable', 'active')
            })
        }
}

exports.mainCtrl = mainCtrl 
