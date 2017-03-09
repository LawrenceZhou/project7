'use strict';

cs142App.controller('LoginRegisterController', ['$scope', '$routeParams', '$resource', '$location','$rootScope', '$http',
  function($scope, $routeParams, $resource, $location, $rootScope, $http) {
      $scope.login = {};
      $scope.login.loginName = "";
      $scope.login.password = "";
      $scope.login.statusInfo = "";

      $scope.loginClick = function() {
          var url = '/admin/login';
          var modelObj = JSON.stringify({login_name: $scope.login.loginName, password: $scope.login.password});
          $http.post(url, modelObj).then(function successfCallback(response){
              if(response.status === 200) {
                  console.log("log in successful");
                  $location.path("/user/" + $rootScope.session._id);
              }             
          }, function errorCallback(response){
              if(response.status === 400) {
                  $scope.login.statusInfo = response.data;
              }
          }); 
            


      }


  }]);
