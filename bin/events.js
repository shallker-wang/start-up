/* @author shallker.wang@profero.com */

var Events = (function() {
  function constructor() {
    this._callbacks = {}
  }

  constructor.prototype = (function() {
    this.bind = function(evt, callback) {
      this._callbacks[evt] || (this._callbacks[evt] = []);
      this._callbacks[evt].push(callback);
    }

    this.trigger = function() {
      var args, ev, callbacks;
      args = 1 <= arguments.length ? [].slice.call(arguments) : [];
      evt = args.shift();
      callbacks = this._callbacks[evt];
      if (!callbacks) return;
      for (var k in callbacks) {
        var call = callbacks[k];
        if (call.apply(this, args) === false) break;
      }
    }

    return this;
  }).call({});

  return constructor;
})();

module.exports = Events;
