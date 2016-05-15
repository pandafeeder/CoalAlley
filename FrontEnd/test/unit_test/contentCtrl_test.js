describe('contentCtrl test', function() {
    beforeEach(module('Myapp'))
    var $controller, ArticalStore, $httpBackend, contentReqHandler
    beforeEach(inject(function($injector) {
        $controller  = $injector.get('$controller')
        ArticalStore = $injector.get('ArticalStore')
        //$stateParams = $injector.get('$stateParams')
        $httpBackend = $injector.get('$httpBackend')
        contentReqHandler = $httpBackend.when('GET', '/artical/:id')
    }))

    describe('when no data cached in ArticalStore, ctrl should make a request according to slug in url',
       function() {

    }) 

    describe('when cached data in ArticalStore, ctrl should retrive data from ArticalStore',
        function() {

    })
})
