'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial', 'ngResource']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'components/user-list/user-listTemplate.html',
                controller: 'UserListController'
            }).
            when('/users/:userId', {
                templateUrl: 'components/user-detail/user-detailTemplate.html',
                controller: 'UserDetailController'
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            when('/login-register', {
                templateUrl: 'components/login-register/login-registerTemplate.html',
                controller: 'login-registerController'
            }).
            otherwise({
                redirectTo: '/users'
            });
    }]);

cs142App.controller('MainController', ['$scope', '$resource', '$location', '$rootScope', '$http',
    function ($scope, $resource, $location, $rootScope, $http) {
        $scope.main = {};
        $scope.main.title = 'Users';
        $scope.main.toolBar = '';

        var version = $resource('http://localhost:3000/test/:param', {param: 'info'}, {});
        var object = version.get({param: 'info'}, function() {
            $scope.main.version = object.__v;
        }); 

        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if (!$scope.noOneIsLoggedIn()) {
                // no logged user, redirect to /login-register unless already there
                if (next.templateUrl !== "components/login-register/login-registerTemplate.html") {
                    $location.path("/login-register");
                }
            }
        });

        $scope.noOneIsLoggedIn=function() {
            return false;
        };
    }]);
