node-serve
==========

Development hosting with live compile of Jade, CoffeeScript, Stylus and more.

### Dummy steps
```
git clone git://github.com/shallker-wang/node-serve.git
cd node-serve
sudo npm install -g
cp -r example ~/my-new-project
cd ~/my-new-project
node-serve
```

### You will love the config file
In your project directory, put a file `ns.config`.
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


### Before you run
With `jade`, `coffee`, `stylus` commands installed if you wan to compile three of them.
```
sudo npm install jade -g
sudo npm install coffee-script -g
sudo npm install stylus -g
```

### Todo
* livereload
* performance
