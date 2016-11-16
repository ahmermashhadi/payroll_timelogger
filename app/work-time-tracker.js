(function(){
  'use strict';

  angular
    .module('workTimeTracker', [
      'ui.bootstrap',
      'dyFlipClock',
      'ngRoute',
      'ngAnimate',
      'angularModalService',
      'restangular',
      'ngStorage',

      'workTimeTracker.components.main',
      'workTimeTracker.components.settings',
      'workTimeTracker.components.statistics',
      'workTimeTracker.directives.navigation'
    ])
    .config(workTimeTrackerConfig)
    .run(workTimeTrackerRun);

  workTimeTrackerConfig.$inject = ['$routeProvider'];
  function workTimeTrackerConfig($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  }

  workTimeTrackerRun.$inject = ['activitiesService', '$rootScope', '$localStorage'];
  function workTimeTrackerRun (activitiesService, $rootScope, $localStorage) {
    activitiesService.addNew('Working', 'default');
    activitiesService.addNew('Eating', 'primary');
    activitiesService.addNew('Rest', 'info');
    activitiesService.addNew('Web surfing', 'success');
    activitiesService.addNew('Off-topic', 'warning');
    activitiesService.addNew('Consulting', 'danger');

    if ($localStorage.token) {
      $rootScope.loggedIn = true;
      $rootScope.name = $localStorage.name;
    }
    else{
      $rootScope.loggedIn = false;
    }

    console.log($rootScope.loggedIn);

  }
}());
