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
                controller: 'LoginRegisterController'
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
        $scope.isLoggedIn = false;

        var version = $resource('http://localhost:3000/test/:param', {param: 'info'}, {});
        var object = version.get({param: 'info'}, function() {
            $scope.main.version = object.__v;
        }); 

        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            if (!noOneIsLoggedIn()) {
                // no logged user, redirect to /login-register unless already there
                
                console.log("false", $scope.isLoggedIn);
                if (next.templateUrl !== "components/login-register/login-registerTemplate.html") {
                    $location.path("/login-register");
                }
            }else {
                console.log("true", $scope.isLoggedIn);
            }
        });

        var noOneIsLoggedIn = function() {
            //return true;
            var url = '/isLoggedIn';
            var flag = false;
            $http.get(url).then(function successfCallback(response){
              if(response.status === 200) {
                console.log("server true");
                $scope.isLoggedIn = true;
                flag = true;
                console.log("flag1", flag);
                return true;
              }else{
                console.log("server false");
                $scope.isLoggedIn = false;
                flag = false;
                console.log("flag1", flag);
                return false;
              }             
          });
        };
    }]);
