#!/usr/bin/env node

/* @author shallker.wang@profero.com */

var NCP = require('ncp').ncp,
    Server = require('./server');
    Configer = require('./configer'),
    Compiler = require('./compiler'),
    liverefresh = require('live-refresh');

var StartUp = (function() {
  function constructor() {
  }

  constructor.prototype = (function() {
    this.debug = true;
    this.config = {};
    this.exampleFolder = __dirname + '/../example/';
    this.configName = 'ns.config';

    this.serve = function() {
      this.config = this.loadConfig();
      this.initServer(this.config.server);
      if (this.config.compile) {
        this.initCompiler(this.config.compile)
      }
      if (this.config.liverefresh) {
        liverefresh.refresh(this.config.liverefresh);
      }
    }

    this.initServer = function(config) {
      this.server = new Server(config);
    }

    this.initCompiler = function(config) {
      this.compiler = new Compiler(config); 
    }

    this.loadConfig = function() {
      try {
        return Configer.load();
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


module.exports = new StartUp();
