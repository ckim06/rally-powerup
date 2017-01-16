'use strict';

TasksController.$inject = ['tasksService'];

function TasksController(tasksService) {
  var vm = this;
  var t = TrelloPowerUp.iframe();
  var id;

  var error = function (response) {
    console.log(response);
  }

  function nameCallback(data) {
    var success = function (response) {
        vm.tasks = response.data;
      }
      // emdash
    id = data.name.split('—')[0].trim();
    tasksService.getTasks(id).then(success, error);
  }

  // nameCallback({
  //   name: '66163950224—'
  // });
t.card('name').then(nameCallback, error);


  var updateSuccess = function (response) {
    vm.tasks.forEach(function (task) {
      if (task.ObjectID === response.data.ObjectID) {
        task = response.data;
      }
    });
    vm.tasks.find(function (element) {
      return element.ObjectID == response.data.ObjectID;
    });
  };

  vm.updateStatus = function (task) {

    tasksService.updateTask({
      'State': task.State
    }, task.ObjectID).then(updateSuccess, error);
  };

  vm.updateHours = function (task) {
    tasksService.updateTask({
      'Actuals': task.Actuals
    }, task.ObjectID).then(updateSuccess, error);
  }

}

module.exports = TasksController;

// 66163950224
