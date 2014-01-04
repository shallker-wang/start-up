start-up
==========

Development hosting with live compilations of Jade, CoffeeScript, Stylus and more.


## Features
* development hosting
* live compilations of Jade, CoffeeScript and Stylus
* [live refresh](http://github.com/shallker-wang/live-refresh)


## Installation
```bash
sudo npm install start-up -g
```


## Quick Start
Create a project folder, init start-up boilplate inside and run `start up` to start the development:
```bash
mkdir project-x
cd project-x
start init
start up
```


## Configuration file
Inside project folder, put a file `start.json`:

```
{
  "server": {
    "port": 8899,
    "host": "./public/"
  },
  "compile": {
    "jade": {
      "input": "./src/html/",
      "output": "./public/",
      "pretty": true
    },
    "coffee": {
      "input": "./src/js/",
      "output": "./public/js/"
    },
    "stylus": {
      "input": "./src/css/",
      "output": "./public/css/",
      "compress": true
    }
  },
  "liverefresh": "./public/css/"
}
```


## Requirements
With `jade`, `coffee`, `stylus` commands installed if you need to compile three of them:

```
sudo npm install jade -g
sudo npm install coffee-script -g
sudo npm install stylus -g
```


## API
### initProject()
Initialize a start-up boilplate inside the folder.

```javascript
var startup = require('start-up');
startup.initProject();
```

### initConfig()
Initialize a start-up configuration file inside the folder.

```javascript
var startup = require('start-up');
startup.initConfig();
```

### start()
Start the development hosting and live compilations and live refresh and ...

```javascript
var startup = require('start-up');
startup.start();
```


## Command

```bash
Usage: start [options]

Options:

  -h, --help          output usage information
  -V, --version       output the version number
  -i --init [config]  Init a project boilplate or a configuration file
  -u --up             Start the development
```


## Todo
* ~~livereload~~
* performance
* add ETag support
* add 'If-Modified-Since' header support
* remove ncp dependency
* remove commands pre-installed requirements
* remove .gitkeep, create build directories before compile
* ```start build```
* ```start from test.json```


## License (MIT)

Copyright (c) 2013 Shallker Wang

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
