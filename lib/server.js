/* @author shallker.wang@profero.com */

var HTTP   = require('http'),
    Events = require('./events'),
    Static = require('./static');

var Server = (function(Parent) {
  function constructor(config) {
    Parent.apply(this, arguments);
    this.port = config.port || this.port;
    this.host = config.host || this.host;
    this.createServer(this.port, this.host);
  }

  constructor.prototype = (function() {
    this.debug = true;
    this.host = '';
    this.port = 8989;

    this.createServer = function(port, host) {
      var self = this;
      this.server = HTTP.createServer(this.onRequest.bind(this));
      try {
        this.server.listen(port);
      } catch (err) {
        return self.err('create server failed', err);
      }
      this.server.on('error', function(err) {
        if (err.code === 'EADDRINUSE') {
          return self.err('port ' + port + ' in use.');
        }
        return self.err(err);
      })
      this.log('created');
      this.log('host', '"' + host + '"');
      this.log('port', port);
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

    this.err = function(msg) {
      if (typeof msg === 'string') msg = 'Server error ' + msg;
      throw msg;
      return false;
    }

    return this;
  }).call(new Parent());

  return constructor;
})(Events);

module.exports = Server
