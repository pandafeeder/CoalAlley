//css
require('../css/pure.css')
require('../css/grids-responsive.css')
require('../css/app.css')
require('../css/animate.css')
require('../css/prism.css')

//third party lib
const angular   = require('angular')
const uirouter  = require('angular-ui-router')
const ngStorage = require('ngStorage')
const ngSantize = require('angular-sanitize')
const ngAnimate = require('angular-animate')

//controllers
const mainCtrl           = require('./controllers/mainCtrl')
const ctableCtrl         = require('./controllers/ctableCtrl')
const contentCtrl        = require('./controllers/contentCtrl')
//const coverCtrl          = require('./controllers/coverCtrl')
const loginCtrl          = require('./controllers/loginCtrl')
const postWriteLeftCtrl  = require('./controllers/postWriteLeftCtrl')
const postWriteRightCtrl = require('./controllers/postWriteRightCtrl')

//services
const modifyStyle    = require('./services/modifyStyle')
const Authentication = require('./services/Authentication')
const API            = require('./services/API')
const ArticalStore   = require('./services/ArticalStore')
const deletePost     = require('./services/deletePost')
const getArtical     = require('./services/getArtical')
const getArticalList = require('./services/getArticalList')
const MD2HTML        = require('./services/MD2HTML')

var app = angular.module('Myapp', ['ui.router', 'ngStorage', 'ngAnimate', 'ngSanitize'])

//associate controllers to app
var controllers = [mainCtrl, ctableCtrl, contentCtrl, loginCtrl, postWriteLeftCtrl, postWriteRightCtrl]
controllers.forEach(function(item, index) {
        app.controller(item)
})

//associate service-facotry to app
var services = [modifyStyle, Authentication, deletePost, getArtical, getArticalList, MD2HTML]
services.forEach(function(item, index) {
        app.factory(item)
})

//associate service-constant to app
app.constant(API)

//associate service-service to app
app.service(ArticalStore)


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('')
    $stateProvider
        .state('root', {
            abstract: true,
            template: require('../templates/top.html')
        })
        .state('root.home', {
            abstract: true,
            views: {
                'nav@root'    : {template: require('../templates/nav.html')},
                'ctable@root' : {template: require('../templates/ctable.html')},
                'content@root': {template: require('../templates/content.html')},
                'content@root': {template: require('../templates/content.html')},
                'foot@root'   : {template: require('../templates/foot.html')},
                'sidebar@root': {template: require('../templates/sidebar.html')},
                'login@root'  : {template: require('../templates/login.html')},
            }
        })
        .state('root.home.cover', {
            url: '',
            views: {
                '@root.home': {template: require('../templates/cover.html')},
            }
        })
        .state('root.home.artical', {
            url: '/artical/:slug',
            views: {
                '@root.home': {template: require('../templates/artical.html')},
            },
        })
        .state('write', {
            url: '/write/:slug',
            template: require('../templates/write.html'),
        })
}])

app.run(['$window', '$rootScope', '$localStorage', '$http', '$location', function($window, $rootScope, $localStorage, $http, $location) {
        document.addEventListener("keyup", function(e) {
        if (e.keyCode == 27) {
            $rootScope.$broadcast("escapePressed", e.target)
        }
        })
        document.addEventListener("click", function(e) {
            $rootScope.$broadcast("documentClicked", e.target)
        })
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var restrictPage = /\/write\/.*/i
            if ($location.path().match(restrictPage) && !$localStorage.currentUser) {
                console.log("restrict page")
                //add this to prevent rendering write page
                $location.path('')
                //window.location.herf is browser side navgation
                $window.location.href = '/'
            }
        })
}])