//this is just for trying flow
describe('coverCtrl test', function() {
    beforeEach(module('Myapp'))
    var $controller
    beforeEach(inject(function(_$controller_){
        $controller= _$controller_
    }))
    it('$scope.name should be ture', function () {
        var $scope = {}
        var coverCtrl = $controller('coverCtrl', {$scope: $scope})
        expect($scope.name).toBe(true)
    })
})
