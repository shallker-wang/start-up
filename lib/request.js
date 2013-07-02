var Request = (function() {

  function constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  constructor.prototype = (function() {

    this.notFound = function() {
      this.res.writeHead(404);
      this.res.end();
    }

    this.notModified = function() {
      this.res.writeHead(304);
      this.res.end();
    }

    this.code = function(number) {
      this.res.writeHead(number);
      this.res.end();
    }

    return this;
  }).call({});

  return constructor;
})();

module.exports = Request
