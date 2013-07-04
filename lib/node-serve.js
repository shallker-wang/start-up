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
    this.exampleFolder = __dirname + '/../example/';
    this.configName = 'ns.config';
  }

  constructor.prototype = (function() {
    this.debug = true;

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

    this.createProject = function(name) {
      var self = this;
      self.log('create project', name);
      name = name || './';
      NCP.limit = 16;
      NCP(this.exampleFolder, name, function(err) {
        if (err) return self.err('NCP error ' + err);
      });
    }

    this.createConfig = function() {
      var self = this;
      self.log('create config');
      NCP.limit = 16;
      NCP(this.exampleFolder + this.configName, this.configName, function(err) {
        if (err) return self.err('NCP error ' + err);
      })
    }

    this.log = function() {
      if (!this.debug) return;
      console.log.apply(console, arguments);
    }

    this.err = function(msg) {
      throw msg;
      return false;
    }

    return this;
  }).call({})

  return constructor;
})();


module.exports = new NodeServe();
