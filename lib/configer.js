/* @author shallker.wang@profero.com */

var FS = require('fs'),
    PATH = require('path'),
    info = require('../util/info')('configer'),
    debug = require('../util/debug')('configer'),
    error = require('../util/error')('configer');


function exist(file) {
  return FS.existsSync(file);
}

function read(file) {
  if (!exist(file)) return error('File', file, 'does not exist.');
  return FS.readFileSync(file, 'utf8');
}


var configer = new Object;

configer.file = './start.json';

/* parse configuration string into an object */
configer.parse = function(configJSON) {
  var result;
  try {
    result = JSON.parse(configJSON);
  } catch (e) {
    return error('Invalid JSON in config');
  }
  return result;
}

/* load the configuration file */
configer.load = function(configFile) {
  configFile = configFile || configer.file;
  if (exist(configFile)) {
    return configer.parse(read(configFile));
  } else {
    return error('Config file', configFile, 'does not exist.');
  }
}

module.exports = Object.create(configer);
