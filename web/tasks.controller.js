'use strict';

TasksController.$inject = ['tasksService'];

function TasksController(tasksService) {
  var vm = this;
  var t = TrelloPowerUp.iframe();
  var id;

  var success = function (response) {
    vm.tasks = response.data;
    //vm.test = JSON.parse(response).Tasks;
  }

  var error = function (response) {
    console.log(response);
  }

  function nameCallback(data) {
    // emdash
    id = data.name.split('—')[0].trim();
    tasksService.getTasks(id).then(success, error);
  }

  t.card('name').then(nameCallback, error);


}

module.exports = TasksController;
