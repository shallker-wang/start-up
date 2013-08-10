start-up
==========

Development hosting with live compile of Jade, CoffeeScript, Stylus and more.

## Installation
```
sudo npm install start-up -g
```

## Quick Start
Create an example to start your new project:
```bash
start example project-x
```

Jump inside, run `start up` and start your development:
```bash
cd project-x
start up
```

## You will love the config file
In your project directory, put a file `start.json`:
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

## Todo
* ~~livereload~~
* performance
* add ETag support
* add 'If-Modified-Since' header support
* remove ncp dependency
* remove commands pre-installed requirements
* remove .gitkeep, create build directories before compile
