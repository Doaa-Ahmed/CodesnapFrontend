angular
    .module('myApp')
    .directive('compileViewer', compileViewer);

// in html use <compileViewer></compileViewer>

function compileViewer() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/compilerView.html',
        controller: compileController,
        bindToController: true,
        link: function (scope,element,attrs){}
    };

    return directive;

    compileController.$inject = ['$scope', '$http', '$routeParams', 'compileService', 'snippetService'];

    function compileController($scope, $http, $routeParams, compileService, snippetService) {

        $scope.snippetView = {};

        snippetService.getSnippet($routeParams.sid)
                .success(function(data) {
                    $scope.snippetView = data;
                    // $scope.snippetView.language = data.language;
                    // $scope.snippetView.code = data.code;

                    $scope.mode = $scope.snippetView.language;
                    if ($scope.mode == 'C-C++') {
                        $scope.mode = 'c_cpp';
                    } else if ($scope.mode == 'C#') {
                        $scope.mode = 'csharp';
                    } else if ($scope.mode == 'Go') {
                        $scope.mode = 'golang';
                    }
                    $scope._session.setMode("ace/mode/" + angular.lowercase($scope.mode));
                })
                .error(function(data){
                    $scope.mode = $scope.question.language;
                    if ($scope.mode == 'C-C++') {
                        $scope.mode = 'c_cpp';
                    } else if ($scope.mode == 'C#') {
                        $scope.mode = 'csharp';
                    } else if ($scope.mode == 'Go') {
                        $scope.mode = 'golang';
                    }
                    $scope._session.setMode("ace/mode/" + angular.lowercase($scope.mode));
        });

        $scope.compileSnippetView = compileSnippetView

        function compileSnippetView() {
            $('#output').empty();
            $('#time').empty();

            var code = ($scope.snippetView.code !== undefined ? $scope.snippetView.code: $scope.answer.code );
            var language = ($scope.snippetView.language !== undefined ? $scope.snippetView.language: $scope.question.language );

            compileService.compileSnippet(language, code, $scope.snippetView.stdin).then(
                function(response) {
                    $scope.snippetView.output = response.data.output;
                    //console.log(response.data.output);

                    $scope.checkCodeandPrint($scope.snippetView.output);
                });
        }

        $scope.checkCodeandPrint = function(output) {
            if (output.search('runtime') !== -1) {
                var outSplit = output.split('runtime');
                var output = outSplit[0];
                var time = outSplit[1];
                $('#output').html(output);
                $('#time').html('<br>' + "<b>runtime<i>" + time + "</i></b>");
                return 1;
            } else {
                $('#output').html(output);
                return 0;
            }
        }

        $scope.aceLoaded = function(_editor) {
            _editor.setReadOnly(true);
            $scope._session = _editor.getSession();
        };

        $scope.aceChanged = function(e) {
            //angular.element(document.querySelector('#lang'))
            //$scope.snippetView.code = $scope._session.getDocument().getValue();
        };

    }
}