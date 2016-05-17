describe('contentCtrl test', function() {
    beforeEach(module('Myapp'))
    var $controller, ArticalStore, $httpBackend, contentReqHandler
    beforeEach(inject(function($injector) {
        $controller  = $injector.get('$controller')
        ArticalStore = $injector.get('ArticalStore')
        //$stateParams = $injector.get('$stateParams')
        $httpBackend = $injector.get('$httpBackend')
        contentReqHandler = $httpBackend.when('GET', '/artical/slug1')
                                .response({
                                           content: 'content1',
                                           slug: 'slug1'
                                           title: 'title1',
                                        })
    }))

    describe('when no data cached in ArticalStore, ctrl should make a request according to slug in url',
       function() {
           it('$scope.articalshould equal to data', function() {
                ArticalStore = {}
                var data = {content: 'content1', slug: 'slug1', title: 'title1'}
                var scope = {}
                var slug = 'slug1'
                var contentCtrl = $controller('contentCtrl', {$scope: $scope})
                $scope.retriveArtical(slug, ArticalStore, getArtical)
                expect($scope.artical).toEqual(data)
           })
    }) 

    describe('when cached data in ArticalStore, ctrl should retrive data from ArticalStore',
        function() {

    })
})
