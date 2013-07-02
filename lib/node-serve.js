#!/usr/bin/env node

/* @author shallker.wang@profero.com */

var STYLUS = require('stylus'),
    NCP = require('ncp').ncp,
    CONFIGER = require('./configer'),
    COMPILER = require('./compiler'),
    SERVER = require('./server');

var NodeServe = (function() {
  function constructor() {
    this.config = {};
    this.example = __dirname + '/../example/';
  }

  constructor.prototype = (function() {
    this.run = function() {
      this.loadConfig();
      this.server = this.initServer();
      this.compiler = this.initCompiler();
    }

    this.initServer = function() {
      return new SERVER(this.config.port, this.config.host);
    }

    this.initCompiler = function() {
      return new COMPILER(this.config.compile); 
    }

    this.loadConfig = function() {
      try {
        this.config = CONFIGER.load();
      } catch (err) {
        console.warn(err);
        console.warn('Loading config file failed.');
      }
    }

    this.create = function(name) {
      console.log('create', name);
      name = name || './';
      NCP.limit = 16;
      NCP(this.example, name, function(err) {
        if (err) return console.log('NCP error', err);
      });
    }

    return this;
  }).call({})

  return constructor;
})();


module.exports = new NodeServe();
