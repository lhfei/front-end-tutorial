angular.module('docsSimpleDirective', [])
    .controller('Controller', ['$scope', function($scope) {
        $scope.customer = {
            name: 'Naomi',
            address: '1700 Amphitheatre'
        };
    }])
    .directive('myCustomer', function() {
        // return {
        //     template: 'Name: {{customer.name}} Address: {{customer.address}}'
        // };
        return {templateUrl: 'my-customer.html'};
    });
