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

  function descCallback(data) {
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
    var ticketData = JSON.parse(data.desc);
    id = ticketData.id;
    tasksService.getTasks(id).then(success, error);
  }

  vm.loader = true;
  // descCallback({
  //   desc: JSON.stringify({'id':'66163950240'})
  // });
t.card('desc').then(descCallback, error);


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


  vm.addNewTask = function(){
    function newTaskSuccess(response) {
      vm.loader = false;
      if(response.errors){
        console.error(response.errors);
      } else {
          vm.tasks.push(response.data);
      }

    }
    vm.loader = true;
    tasksService.addTask({
      'Name': vm.newTask
    }, id).then(newTaskSuccess, error);
  }
}

module.exports = TasksController;

// 66163950224
