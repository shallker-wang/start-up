/* Log level */
/*
  0 EMERGENCY system is unusable
  1 ALERT action must be taken immediately
  2 CRITICAL the system is in critical condition
  3 ERROR error condition
  4 WARNING warning condition
  5 NOTICE a normal but significant condition
  6 INFO a purely informational message
  7 DEBUG messages to debug an application
*/

var fs = require('fs'),
    dev, pro;

function readFileJSON(path) {
  var json = fs.readFileSync(path, {encoding: 'utf8'});
  return JSON.parse(json);
}

function defaultConfig() {
  return {
    "level": {
      "EMERGENCY": 0,
      "ALERT": 1,
      "CRITICAL": 2,
      "ERROR": 3,
      "WARNING": 4,
      "NOTICE": 5,
      "INFO": 6,
      "DEBUG": 7
    },
    "output": {
      "0": true,
      "1": true,
      "2": true,
      "3": true,
      "4": true,
      "5": true,
      "6": true,
      "7": false 
    },
    "throw": false
  }
}

try { dev = readFileJSON(__dirname + '/../dev.json') } catch (e) {}
try { pro = readFileJSON(__dirname + '/../pro.json'); } catch (e) {}

config = dev || pro || defaultConfig();

function debug(args) {
  args.unshift('[Debug]');
  console.log.apply(console, args);
}

function info(args) {
  args.unshift('[Info]');
  console.info.apply(console, args)
}

function notice(args) {
  args.unshift('[Notice]');
  console.log.apply(console, args);
}

function warn(args) {
  args.unshift('[Warn]');
  console.warn.apply(console, args);
}

function error(err) {
  if (config["throw"]) {
    throw err;
  } else {
    var args = ['[Error]'];
    err.name && (err.name += ':') && (args.push(err.name));
    args.push(err.message);
    console.log.apply(console, args);
  }
  return false;
}

exports.debug = function(from) {
  return function() {
    if (!config.output[config.level['DEBUG']]) return;
    var args = Array.prototype.slice.call(arguments);
    from && (from += ':') && args.unshift(from);
    return debug(args);
  }
}

exports.info = function(from) {
  return function() {
    if (!config.output[config.level['INFO']]) return;
    var args = Array.prototype.slice.call(arguments);
    from && (from += ':') && args.unshift(from);
    return info(args);
  }
}

exports.notice = function(from) {
  return function() {
    if (!config.output[config.level['NOTICE']]) return;
    var args = Array.prototype.slice.call(arguments);
    from && (from += ':') && args.unshift(from);
    return notice(args);
  }
}

exports.warn = function(from) {
  return function() {
    if (!config.output[config.level['WARNING']]) return;
    var args = Array.prototype.slice.call(arguments);
    from && (from += ':') && args.unshift(from);
    return warn(args);
  }
}

exports.error = function(from) {
  return function() {
    if (!config.output[config.level['ERROR']]) return;
    var args = Array.prototype.slice.call(arguments);
    var err = new Error(args.join(' '));
    from && (err.name = from);
    return error(err);
  }
}
