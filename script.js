(function() {
  var app = angular.module("githubViewer", []);

  var MainCtrl = function($scope, github, $interval, $log, $anchorScroll, $location) {
    
    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };

    var onRepos = function(data) {
      $scope.repos = data;
      $location.hash("userdetails");
      $anchorScroll();
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data";
    };

    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    var countdownInterval = null;

    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.search = function(username) {
      $log.info('Searching for username: ' + username);
      github.getUser(username).then(onUserComplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    };

    $scope.username = "cochsen";
    $scope.message = "Github Viewer";
    $scope.repoSortOrder = "updated_at";
    $scope.countdown = 5;
    startCountdown();
  }; // end MainCtrl

  app.controller("MainCtrl", ["$scope", "github", "$interval", "$log", "$anchorScroll", "$location", MainCtrl]);

})();