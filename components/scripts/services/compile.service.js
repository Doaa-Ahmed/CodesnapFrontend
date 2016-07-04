angular
    .module('myApp')
    .factory('compileService', compileService);

function compileService($http) {
    var service = {};

    service.getLanguages = getLanguages;
    service.getLangSample = getLangSample;
    service.compileSnippet = compileSnippet;

    return service;

    function getLanguages() {
        return $http.get('http://localhost:6543/api/languages')
                    .then(handleSuccess, handleError('Error getting Languages'));
    }

    function getLangSample(languageID) {
        return $http.get('http://localhost:6543/api/compile/' + languageID)
                    .then(handleSuccess, handleError('Error getting Languages'));
    }

    function compileSnippet(language, snippet, stdin) {
        return $http.post('http://localhost:6543/api/compile', {"language":language, "snippet":snippet, "stdin":stdin})
                    .then(handleSuccess, handleError('Error creating presentation'));
    }

    function handleSuccess(res) {
        return { success: true, data: res.data };
    }

    function handleError(error) {
        return { success: false, message: error };
    }

}