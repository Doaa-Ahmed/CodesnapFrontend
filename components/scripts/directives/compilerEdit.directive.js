angular
    .module('myApp')
    .directive('compileEditor', compileEditor);

// in html use <compileEditor></compileEditor>

function compileEditor() {
    var directive = {
        restrict: 'E',
        templateUrl: 'pages/compilerEdit.html',
        controller: compileController,
        bindToController: true,
    };

    return directive;

    compileController.$inject = ['$scope', '$http', 'compileService'];

    function compileController($scope, $http, compileService) {

        $scope.snippet = {};

        $scope.snippet.compileSnippet = compileSnippet

        compileService.getLanguages().then(
            function(response) {
                $scope.snippet.languages = response.data.languages;
            });

        function compileSnippet() {
            $('#output').empty();
            $('#time').empty();

            compileService.compileSnippet($scope.snippet.language[1], $scope.snippet.code, $scope.snippet.stdin).then(
                function(response) {
                    $scope.snippet.output = response.data.output;
                    //console.log(response.data.output);

                    $scope.checkCodeandPrint($scope.snippet.output);
                });
        }

        $scope.checkCodeandPrint = function(output) {
            console.log(output);
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
            //var _renderer = _editor.renderer;
            $scope._editor = _editor;
            $scope._session = _editor.getSession();
        };

        $scope.aceChanged = function(e) {
            //angular.element(document.querySelector('#lang'))
            $scope.snippet.code = $scope._session.getDocument().getValue();
        };

        $scope.aceUpdate = function() {
            $scope.snippet.mode = $scope.snippet.language[1];
            if ($scope.snippet.mode == 'C-C++') {
                $scope.snippet.mode = 'c_cpp';
            } else if ($scope.snippet.mode == 'C#') {
                $scope.snippet.mode = 'csharp';
            } else if ($scope.snippet.mode == 'Go') {
                $scope.snippet.mode = 'golang';
            }

            compileService.getLangSample($scope.snippet.language[0]).then(
                function(response) {
                    $scope.snippet.codeSample = response.data.code;
                    $scope._editor.setValue($scope.snippet.codeSample, -1);
                    $scope._session.setMode("ace/mode/" + angular.lowercase($scope.snippet.mode));
                    console.log("ace/mode/" + angular.lowercase($scope.snippet.mode));
                });
        }

    }
}