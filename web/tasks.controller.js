'use strict';

TasksController.$inject = ['tasksService'];

function TasksController(tasksService) {
  var vm = this;
  var t = TrelloPowerUp.iframe();
  var id;

  var error = function (response) {
    console.log(response);
    vm.loader = false;
  }

  function nameCallback(data) {
    var success = function (response) {
        vm.tasks = response.data;
        vm.loader = false;
      }
      // emdash
    id = data.name.split('—')[0].trim();
    tasksService.getTasks(id).then(success, error);
  }

  vm.loader = true;
  // nameCallback({
  //   name: '66163950224—'
  // });
  t.card('name').then(nameCallback, error);


  var updateSuccess = function (response) {
    vm.loader = false;
    vm.tasks.forEach(function (task, i) {
      if (task.ObjectID === response.data.ObjectID) {
        vm.tasks[i] = response.data;
      }
    });
  };

  vm.updateStatus = function (task) {
    vm.loader = true;
    tasksService.updateTask({
      'State': vm.taskChecked
    }, task.ObjectID).then(updateSuccess, error);
  };

  vm.updateHours = function (task) {
    vm.loader = true;
    tasksService.updateTask({
      'Actuals': task.Actuals
    }, task.ObjectID).then(updateSuccess, error);
  }

}

module.exports = TasksController;

// 66163950224
