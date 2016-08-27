(function() {
  
  var app = angular.module("githubViewer");

  var UserCtrl = function($scope, github, $routeParams) {
    
    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };

    var onRepos = function(data) {
      $scope.repos = data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data";
    };

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = "updated_at";
    github.getUser($scope.username).then(onUserComplete, onError);
  };

  app.controller("UserCtrl", UserCtrl);

})();