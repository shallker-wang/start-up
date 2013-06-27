#!/usr/bin/env node

/* @author shallker.wang@profero.com */

var CONFIGER = require('./configer'),
    STYLUS = require('stylus'),
    COMPILER = require('./compiler'),
    SERVER = require('./server');

var NodeServe = (function() {
  function constructor() {
    this.config = {};
    this.loadConfig();
    this.server = this.initServer();
    this.compiler = this.initCompiler();
    // this.compiler.compile();
    // this.server.bind('before request', beforeRequest.bind(this));
    // this.compiler.bind('after compile', afterCompile.bind(this));
    // function beforeRequest(next) {
      // this.compiler.compile();
      // this.NEXT = next;
      // next();
    // }
    // function afterCompile() {
      // this.NEXT()
    // }
  }

  constructor.prototype = (function() {
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

    this.example = function() {}

    return this;
  }).call({})

  return constructor;
})();


module.exports = new NodeServe();
