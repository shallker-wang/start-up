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
    this.configName = 'start.json';

    this.start = function() {
      this.config = Configer.load();
      if (this.config === false) return;
      this.initServer(this.config.server);
      if (this.config.compile) {
        this.initCompiler(this.config.compile)
      }
      if (this.config.liverefresh) {
        liverefresh.watch(this.config.liverefresh);
      }
    }

    this.initServer = function(config) {
      this.server = new Server(config);
    }

    this.initCompiler = function(config) {
      this.compiler = new Compiler(config); 
    }

    this.loadConfig = function(callback) {
      var result = Configer.load();
      if (result) callback(result);
    }

    this.initProject = function() {
      var self = this;
      self.log('init project');
      NCP.limit = 16;
      NCP(this.exampleFolder, './', function(err) {
        if (err) return self.err('NCP error ' + err);
      });
    }

    this.initConfig = function() {
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
