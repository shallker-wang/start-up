node-serve
==========

Development hosting with live compile of Jade, CoffeeScript, Stylus and more.

## Installation
```
sudo npm install git://github.com/shallker-wang/node-serve.git -g
```

## Quick Start
Create an example to start your new project:
```bash
node-serve example my-new-project
```

Jump inside, run `node-serve` and start your development:
```bash
cd my-new-project
node-serve
```

## You will love the config file
In your project directory, put a file `ns.config`:
```
{
  "host": "./build",
  "port": 8899,
  "compile": {
    "jade": {
      "input": "./src/html",
      "output": "./build",
      "pretty": true
    },
    "coffee": {
      "input": "./src/js",
      "output": "./build/js"
    },
    "stylus": {
      "input": "./src/css",
      "output": "./build/css",
      "compress": true
    }
  },
  "livereload": [
    "./build/js",
    "./build/css"
  ]
}
```


## Before you run
With `jade`, `coffee`, `stylus` commands installed if you wan to compile three of them:
```
sudo npm install jade -g
sudo npm install coffee-script -g
sudo npm install stylus -g
```

## Todo
* css livereload
* performance
* ~~command `node-serve example`~~
* add ETag support
* remove ncp dependency
* remove commands pre-installed requirements
* remove .gitkeep, create build directories before compile
