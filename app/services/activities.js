(function () {
  'use strict';

  angular
    .module('workTimeTracker.services.activities', [])
    .run(run)
    .factory('activitiesService', activitiesService);


  function run($localStorage, $rootScope) {


  }


  activitiesService.$inject = ['$rootScope', '$interval', 'Activity', 'ModalService', 'dataService', '$localStorage'];
  function activitiesService($rootScope, $interval, Activity, ModalService, dataService, $localStorage) {

    var vm = this;

    var activities = [];
    var currentActivity;
    $rootScope.email = "";
    $rootScope.fname = "";
    $rootScope.loggedIn = false;

    var userObject = {};

    $rootScope.show = function () {
      ModalService.showModal({
        templateUrl: '/app/modal-template/check-in-modal.html',
        controller: "MainCtrl"
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (result) {
          $scope.message = "You said " + result;
        });
      });
    };


    $rootScope.checkIn = function () {
      $rootScope.show();
    };

    $rootScope.checkOut = function () {
      $rootScope.loggedIn = !$rootScope.loggedIn;

      var obj = {
        id: $localStorage.token,
        time: $rootScope.timelog
      };
      dataService.employee.updateEmployee(obj).then(function (res) {
          console.log(res);
          delete $localStorage.token;
          delete $localStorage.name;
        },
        function (err) {
          console.log(err);
        });
    };


    $rootScope.validateUser = function () {
      userObject = {
        email: $rootScope.email,
        firstname: $rootScope.fname
      };

      dataService.employee.getOneEmployee(userObject).then(function (res) {
          console.log(res);
          $localStorage.token = res.data._id;
          $localStorage.name = res.data.firstname;
          $rootScope.name = $localStorage.name;
          $rootScope.loggedIn = !$rootScope.loggedIn;
          $rootScope.$apply();
        },
        function (err) {
          console.log(err);

        });
    };


    activities.getSumOfDurations = function () {
      return this.reduce(function (mem, act) {
        return mem + act.getDuration();
      }, 0);
    };

    activities.getDurationInPct = function (activity) {
      return (activity.getDuration() / this.getSumOfDurations()) * 100;
    };

    return {
      getAll: function () {
        activities
          .filter(function (activity) {
            return !activity.name;
          })
          .forEach(this.remove);

        $rootScope.activities = activities;
        return activities;
      },

      remove: function (activity) {
        var index = activities.indexOf(activity);
        if (index > -1) {
          activities.splice(index, 1);
        }
      },

      addNew: function (name, color) {
        activities.push(new Activity(name, color));
      },

      setActive: function (activity) {
        if (activity !== currentActivity) {
          if (currentActivity) {
            currentActivity.stop();
          }
          activity.start();
          currentActivity = activity;
          $rootScope.currentActivity = activity;
        }
      },

      getActive: function () {
        return currentActivity;
      }
    };
  }
}());
