'use strict';

TasksService.$inject = ['$http'];

function TasksService($http) {
  var vm = this;
  vm.getTasks = function (ref) {
    var promise = $http({
      method: 'GET',
      url: '/api/tasks/' + ref
    });

    return promise;
  }
}

module.exports = TasksService;
