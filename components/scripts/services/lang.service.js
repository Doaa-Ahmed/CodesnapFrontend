angular
    .module('myApp')
    .factory('langService', langService);

langService.$inject = ['$http', 'authService'];

function langService($http, authService) {
    var service = {
        getLangs: getLangs,
        getLang: getLang
    };

    return service;

    function getLangs() {
        //get all languages
    }

    function getLang(langId) {
        //get a specific language
    }
}