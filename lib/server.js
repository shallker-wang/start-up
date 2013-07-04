/* @author shallker.wang@profero.com */

var HTTP   = require('http'),
    EVENTS = require('./events'),
    Static = require('./static');

var CWD = process.cwd();

var Server = (function(Parent) {
  function constructor(port, host) {
    Parent.apply(this, arguments);
    this.port = port || this.port;
    this.host = host || this.host;
    this.createServer(this.port);
  }

  constructor.prototype = (function() {
    this.debug = true;
    this.host = '';
    this.port = 8989;

    this.createServer = function(port) {
      this.server = HTTP.createServer(this.onRequest.bind(this));
      this.server.listen(port);
      this.log('created');
      this.log('host', '"' + this.host + '"');
      this.log('port', this.port);
    }

    this.onRequest = function(req, res) {
      this.trigger('on request', arguments);
      new Static(req, res, this.host);
    }

    this.log = function() {
      if (!this.debug) return;
      var args = [].slice.call(arguments);
      args.unshift('Serve');
      console.log.apply(console, args);
    }

    return this;
  }).call(new Parent());

  return constructor;
})(EVENTS);

module.exports = Server
