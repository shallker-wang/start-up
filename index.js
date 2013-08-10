var startup = require('./lib/start-up');

exports.version = '1.0.1';

exports.createProject = function(name) {
  startup.createProject(name);
}

exports.createConfig = function() {
  startup.createConfig();
}

exports.serve = function() {
  startup.serve();
}
