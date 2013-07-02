var MIME = require('mime');
var PATH = require('path');
var URL = require('url');
var FS = require('fs');
var Request = require('./request');

var Static = (function(Parent) {

  function constructor(req, res, host) {
    Parent.apply(this, arguments);
    this.host = host;
    if (req.url == '/favicon.ico') return this.favicon();
    this.send( this.parseURL(req.url) );
  }

  constructor.prototype = (function() {

    this.cacheTime = 60 * 60 * 24;
    this.index = 'index.html';

    this.favicon = function() {
      this.res.end();
    }

    this.parseURL = function(url) {
      var file = URL.parse(url).pathname;
      file = this.host + file;
      return PATH.normalize(file);
    }

    this.stat = function(path, onStat) {
      FS.stat(path, (function(err, st) {
        if (err) return this.code(404);
        if (st.isDirectory()) {
          var index = path.replace(/\/$/, "") + '/' + this.index;
          return this.send(index);
        }
        this.st = st;
        onStat.call(this, st);
      }).bind(this));
    }

    this.send = function(file) {
      this.stat(file, (function() {
        this.read(file);
      }).bind(this))
    }

    this.read = function(file) {
      var type = MIME.lookup(file);
      var charset = MIME.charsets.lookup(type);
      var date = new Date();
      this.res.writeHead(200, {
        'Content-Type': type + (charset ? '; charset=' + charset : ''),
        'Date': date.toUTCString(),
        'Last-Modified': new(Date)(this.st.mtime).toUTCString(),
        'Cache-Control': 'public, max-age=' + this.cacheTime,
        'Content-Length': this.st.size
      });
      FS.createReadStream(file).pipe(this.res);
    }

    return this;
  }).call(new Parent());

  return constructor;
})(Request);

module.exports = Static;
