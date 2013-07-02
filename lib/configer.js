/* @author shallker.wang@profero.com */

var FS = require('fs')
  , PATH = require('path');

/* public error helper */
function error(msg) {
  throw msg;
  return false;
}

function Configer() {

  this.file = './ns.config';

  /* parse config file string into an object */
  this.parse = function(string) {
    var result;
    try {
      result = JSON.parse(string);
    } catch (err) {
      return error('Invalid JSON in config file.');
    }
    return result;
  }

  /* read and parse config file */
  this.read = function(file) {
    var string = FS.readFileSync(file, 'utf8');
    return this.parse(string);
  }

  /* make sure the config file exists before read, otherwise throw an error */
  this.exist = function(file) {
    if (FS.existsSync(file)) return true;
    else return error('Config file ' + file + ' does not exist.');
  }

  /* assume there's a configuration file under current folder and load the result */
  this.load = function() {
    if (this.exist(this.file)) return this.read(this.file);
  }
}

module.exports = new Configer();
