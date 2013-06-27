/* @author shallker.wang@profero.com */

var HTTP   = require('http'),
    PATH   = require('path'),
    FS     = require('fs'),
    URL    = require('url'),
    MIME   = require('mime'),
    EVENTS = require('./events');

var CWD = process.cwd();

var Server = (function(Parent) {
  function constructor(port, host) {
    Parent.apply(this, arguments);
    this.port = port || this.port;
    this.host = host || this.host;
    this.createServer(this.port);
  }

  constructor.prototype = (function() {
    this.host = '';
    this.port = 8989;

    this.createServer = function(port) {
      this.server = HTTP.createServer(this.onRequest.bind(this));
      this.server.listen(port);
      this.log('created');
      this.log("host '" + this.host + "'");
      this.log('port ' + this.port);
    }

    this.parseRequestFile = function(req) {
      if (req.url === '/') return '/index.html';
      return URL.parse(req.url).pathname;
    }

    this.static = function(req, res) {
      var file;
      file = CWD + '/' + this.host + this.parseRequestFile(req);
      file = PATH.normalize(file);
      console.log(file);
      FS.stat(file, function(err, stat) {
        if (err) {
          res.writeHead(404);
          return res.end();
        }
        res.writeHead(200, {
          'Content-Type': MIME.lookup(file)
        });
      });
      FS.createReadStream(file, {bufferSize: 8 * 1024}).pipe(res);
    }

    this.onRequest = function(req, res) {
      if (req.url == '/favicon.ico') return;
      this.trigger('on request', arguments);
      this.static(req, res);
    }

    this.log = function(msg) {
      console.log('Server: ' + msg);
    }

    return this;
  }).call(new Parent());

  return constructor;
})(EVENTS);


module.exports = Server
