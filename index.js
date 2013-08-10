var startup = require('./lib/start-up');

exports.version = '1.0.2';

exports.initConfig = function() {
  startup.initConfig()
}

exports.initProject = function() {
  startup.initProject()
}

exports.start = function() {
  startup.start();
}
