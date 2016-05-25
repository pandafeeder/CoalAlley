API = {
    articalListUrl: '/api/articals',
    artical: '/api/articals/',
    JWTtokenURL: '/api-token-auth/'
}
/*
API.$inject = ['$http']
function API () {
    this.fetchAPI = function (rootAPI_ID) {
        var ele = document.getElementById(rootAPI_ID),
            api = JSON.parse(ele.innerText)
        $http.get(api.rootApi).then(
                function successCallback(response) {
                    this.articalListUrl = response.articals
                    this.artical = this.articalListUrl+'/'
                    this.JWTtokenURL = response.token
                },
                function failCallback(response) {
                    this.error = response.status
                })
    }
}
*/

exports.API = API
