'use strict';

TasksController.$inject = ['tasksService'];

function TasksController(tasksService) {
  var vm = this;
  var t = TrelloPowerUp.iframe();
  var id;

  vm.noTasks = false;

  var error = function (response) {
    console.log(response);
    vm.loader = false;
  }

  function nameCallback(data) {
    var success = function (response) {
        vm.loader = false;
        if (response.data.errors) {
          vm.noTasks = true;
        } else {
          vm.tasks = response.data;
          if (vm.tasks.length === 0) {
            vm.noTasks = true;
          }
        }
      }
      // emdash
    id = data.name.split('—')[0].trim();
    tasksService.getTasks(id).then(success, error);
  }

  vm.loader = true;
  nameCallback({
    name: '66163950240'
  });
 //t.card('name').then(nameCallback, error);


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
      'State': task.State
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
