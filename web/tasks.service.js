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
  };

  vm.updateTask = function (task, ref) {
    var promise = $http({
      method: 'PUT',
      data: task,
      url: '/api/defect/' + ref
    });

    return promise;
  };

  vm.addTask = function(name, ref) {
    var promise = $http({
      method: 'POST',
      data: name,
      url: '/api/tasks/' + ref
    });

    return promise;
  }
}

module.exports = TasksService;
