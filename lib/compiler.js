/* @author shallker.wang@profero.com */

var CHILD_PROCESS = require('child_process'),
    EVENTS = require('./events');

function error(msg) {
  throw msg;
  return false;
}

var Compiler = (function(Parent) {
  function constructor(config) {
    Parent.apply(this, arguments);
    if (!config) return error('Configuration for Compiler is missing.');
    this.config = config;
    this.compileness = [];
    this.compile();
  }

  constructor.prototype = (function() {
    this.debug = true;
    this.config = null;

    this.compile = function() {
      if (this.config.jade) this.compileJade(this.config.jade);
      if (this.config.stylus) this.compileStylus(this.config.stylus);
      if (this.config.coffee) this.compileCoffee(this.config.coffee);
    }

    this.compileJade = function(config) {
      var jade = new Jade(config);
      this.compileness.push('jade');
      this.exec(jade.execute());
    }

    this.compileCoffee = function(config) {
      var coffee = new Coffee(config);
      this.compileness.push('coffee');
      this.exec(coffee.execute());
    }

    this.compileStylus = function(config) {
      stylus = new Stylus(config);
      this.compileness.push('stylus');
      this.exec(stylus.execute());
    }

    this.spawn = function(command, options) {}

    this.exec = function(command) {
      var self = this;
      self.log('exec', command);
      var exec = CHILD_PROCESS.exec(command, this.onExec.bind(this));
      exec.stdout.on('data', function(data) {
        self.log('output', data);
      })
      exec.stderr.on('data', function(data) {
        self.log('error', data);
      })
      exec.on('close', function(code) {
        self.log('close', code);
      })
      process.on('message', function(msg) {
        self.log('message', msg);
      })
    }

    this.onExec = function(err, stdout, stderr) {
      if (err) return error(err);
      this.log(stdout);
      this.afterExec();
    }

    this.afterExec = function() {
      this.compileness.shift();
      if (this.compileness.length === 0) this.trigger('after compile');
    }

    this.log = function() {
      if (!this.debug) return;
      var args = [].slice.call(arguments);
      args.unshift('Compiler');
      console.log.apply(console, args);
    }

    return this;
  }).call(new Parent());

  return constructor;
})(EVENTS);


var Command = (function() {
  function constructor(config) {
    for (var key in config) {
      this[key] = config[key];
    }
    this.options = [];
    this.watch = true;
  }

  constructor.prototype = (function() {
    this.command = '';
    this.input = '';
    this.output = '';
    this.watch = false;
    this.compress = false;
    this.options = [];

    this.setOptions = function() {
      if (this.options.length !== 0) return;
    }

    this.execute = function() {
      this.setOptions();
      return this.command + ' ' + this.options.join(' ');
    }

    return this;
  }).call({})

  return constructor;
})()


var Jade = (function(Parent) {
  // jade -w -P -O ./ src/B*/*.jade
  function constructor(config) {
    Parent.apply(this, arguments)
  }

  constructor.prototype = (function() {
    __parent = this.__proto__;
    this.command = 'jade';

    this.setOptions = function() {
      __parent.setOptions.call(this);
      if (this.options.length !== 0) return;
      if (this.watch) this.options.push('--watch');
      if (this.pretty) this.options.push('--pretty');
      if (this.output) this.options.push('--out ' + this.output);
      if (this.input) this.options.push(this.input);
    }

    return this;
  }).call(new Parent());

  return constructor;
})(Command);


var Coffee = (function(Parent) {
  // coffee -w -o ./js/ ./src/js/*.coffee
  function constructor(config) {
    Parent.apply(this, arguments);
  }

  constructor.prototype = (function() {
    __parent = this.__proto__;
    this.command = 'coffee';

    this.setOptions = function() {
      __parent.setOptions.call(this);
      if (this.options.length !== 0) return;
      this.options.push('--compile');
      if (this.watch) this.options.push('--watch');
      if (this.output) this.options.push('--output ' + this.output);
      if (this.input) this.options.push(this.input);
    }

    return this;
  }).call(new Parent());

  return constructor;
})(Command);


var Stylus = (function(Parent) {
  // stylus --watch --compress --out ./css/ ./src/css/*.styl
  function constructor(config) {
    Parent.apply(this, arguments)
  }

  constructor.prototype = (function() {
    __parent = this.__proto__;
    this.command = 'stylus';

    this.setOptions = function() {
      __parent.setOptions.call(this);
      if (this.options.length !== 0) return;
      if (this.watch) this.options.push('--watch');
      if (this.compress) this.options.push('--compress');
      if (this.output) this.options.push('--out ' + this.output);
      if (this.input) this.options.push(this.input);
    }

    return this;
  }).call(new Parent());

  return constructor;
})(Command);


module.exports = Compiler;
