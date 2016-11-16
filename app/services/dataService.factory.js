/**
 * @ngdoc service
 * @name app.common.dataService
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('workTimeTracker.services.activities')
    .constant('API_URL','http://localhost:3000/')
    .config(configuration)
    .factory('dataService', dataService);



  /* @ngInject */
  function configuration(RestangularProvider, API_URL){

    RestangularProvider.setBaseUrl(API_URL+'api/');

  }
  /* @ngInject */
  function dataService(Restangular, $localStorage){

    var employee = {

      getOneEmployee : function (employee) {
        console.log(employee);
        return Restangular.one('employee').one('me').get(employee);
      },
      updateEmployee : function (time) {
        return Restangular.one('employee').one('me').post('', time);
      }


    };


    return {
      employee : employee
    };

  }

}());
