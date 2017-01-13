var angular = require('angular');
var app = angular.module('app', []);

app.controller('tasksController', require('./tasks.controller'));
app.service('tasksService', require('./tasks.service'));
