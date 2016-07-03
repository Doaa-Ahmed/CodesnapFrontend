angular
	.module('myApp')
	.factory('snippetService', snippetService);

function snippetService($http,authService,$cookies) {
	var service = {
		getLangSnippets : getLangSnippets,
		getSnippet : getSnippet,
		getSnippets : getSnippets,
		createSnippet : createSnippet
	};

	return service;
	
	function getLangSnippets(feature,fname) {

		var obj =$cookies.get("access_token");
	    return $http({
	            method: 'GET',
	            url: 'http://www.koodet.com:6543/api/explore/' +feature+'/'+ fname + '/snippets',
	            crossDomain: true, 
	            xhrFields: { withCredentials: true},
	            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
	                
	         })
	}

	function getSnippet(sid) {
		//var obj =$cookies.get("access_token");
        return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/snippets/' + sid,
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {"Cookie":"obj"}
        })
	}

	function getSnippets() {
		//var obj =$cookies.get("access_token");
        return $http({
            method: 'GET',
            url: 'http://www.koodet.com:6543/api/snippets',
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {"Cookie":"obj"}
        })
	}

	function createSnippet(snippet) {
		//var obj =$cookies.get("access_token");
		return $http({
            method: 'POST',
            url: 'http://www.koodet.com:6543/api/snippets/',
            data: snippet,
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
           
	})
	
    }	
	
	function compileSnippet(code) {
		var obj =$cookies.get("access_token");
		return $http({
            method: 'POST',
            url: 'http://www.koodet.com/6543/api/compile', code,
            crossDomain: true, 
            xhrFields: { withCredentials: true},
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
	})
	
    }
}