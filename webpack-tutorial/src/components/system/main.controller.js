var app = angular.module('iscAiApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, send to /
    $urlRouterProvider.otherwise("/");

    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: 'src/components/system/home.html'
    };
    var predictState = {
        name: 'predict',
        url: '/predict',
        templateUrl: 'src/components/predict/index.html'
    };
    var tlpState = {
        name: 'tlp',
        url: '/tlp',
        templateUrl: 'src/components/tlp/index.html' 
    };

    var simulationState = {
        name: 'simulation',
        url: '/simulation',
        templateUrl: 'src/components/simulation/index.html'
    };

    $stateProvider.state(homeState);
    $stateProvider.state(tlpState);
    $stateProvider.state(predictState);
    $stateProvider.state(simulationState);
});

app.controller('mainCtrl', ['$scope','$http', '$sce', '$rootScope', function($scope, $http, $sce, $rootScope) {
}])

app.directive('iframeDirective', ['$sce', function ($sce) {
    return {
        restrict: 'EA',
        template: '<iframe id="containerIframe" src="{{ trustedUrl }}" frameborder="0" allowfullscreen  width="100%" height="100%" seamless="" class="fill"></iframe>',
        link: function (scope, element, attrs) {
            console.log('==============');
            scope.$watch(
                function() {
                    return element[0].offsetHeight;
                },
                function(newHeight, oldHeight) {

                    if (newHeight != oldHeight) {
                        $timeout(function() {
                            var height = attrs.minheight ? newHeight + parseInt(attrs.minheight) : newHeight;
                            var id = getQsParam("SenderId")
                            var message = "<message senderId=" + id + ">resize(100%," + height + ")</message>";
                            $window.parent.postMessage(message, "*");
                        }, 0); // timeout needed to wait for DOM to update
                    }
                }
            );

        }
    };
}])

