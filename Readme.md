Ember Resolver Experience
===

Web server is `http-server`

```
$ cd ember-resolver-experiment
$ npm install
$ npm start
```

In the `2_nd`, `3_rd` and `4_th` folder, you have to run `npm install` and/or `bower install`. It is depend of the project folder.

# 1. First - The Classic

* Create a basic index.html page
* Add jQuery
* Add Ember 1.12 debugger

* [About Ember Template Compiler](http://emberjs.com/blog/2015/02/05/compiling-templates-in-1-10-0.html)

Ember load all modules in the following Object:

```
Ember.__loader.registry
```

```
Ember.keys(Ember.__loader.registry)
> Array[332]
```

With `ember-template-compiler`

```
Ember.keys(Ember.__loader.registry)
> Array[372]
```

* Ember.Application.create() initialize the app.

* x-handlebars scripts are compiled and attached to Ember.TEMPLATES, the script tags removed.

* Setup `app.js` and create an app.

# 2. Second - Manage modules manually

For a more complex solution you need the following js files:

>* jquery.js
>* ember.js
>* ember-template-compiler.js
>* [loader.js](https://github.com/ember-cli/loader.js)
>* [load-initializers.js](https://github.com/ember-cli/ember-load-initializers)
>* [resolver.js](https://github.com/ember-cli/ember-resolver)
>
>
>* shims.js

The above Ember.js create a global `Ember` object, the `shims.js` just define an `ember` module.

Let's create a `vendor` folder:
```
/vendor
  /jquery.js
  /ember.debug.js
  /ember-template-compiler.js
  /loader.js
  /load-initializers.js
  /resolver.js
  /shims.js
```

Import them to an `index.html`

```
<html>
<head></head>
<body>
    <script src="vendor/jquery.js"></script>
    <script src="vendor/ember.debug.js"></script>

    <script src="vendor/loader.js"></script>
    <script src="vendor/shims.js"></script>
    <script src="vendor/resolver.js"></script>
    <script src="vendor/load-initializers.js"></script>
</body>
</html>
```
The `loader.js` provide a `define()` and a `require()` global function. The `define()` register a module in a registry and we can read these modules when need with `require()`.

`require.entries` object will contain all the preloaded modules.

If a module is used, will be "resolved" and it will be stored in the `resolver._cache`.

Let's create our App in `assets` folder.

It is the most basic app, with one `about` route.

```
"use strict";
/* globals define registry requirejs */

define('second-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers'], function(exports, _ember, _emberResolver, _loadInitializers) {
  var App = undefined;

  App = _ember['default'].Application.extend(
    {
      modulePrefix: 'second-app',
      // Resolver: _ember['default'].DefaultResolver
      Resolver: _emberResolver['default']
    }
  );

  _loadInitializers['default'](App, 'second-app');

  exports['default'] = App;
});

define('second-app/router', ['exports', 'ember'], function(exports, _ember) {

  var Router = _ember['default'].Router.extend({
    location: 'auto'
  });

  Router.map(function() {
    this.route('about');
  });

  exports['default'] = Router;
});

// Assign the created application to a global variable for debugging.
var App = require('second-app/app')['default'].create({
  name: 'second-app',
  LOG_RESOLVER: true
});
```
Important steps:

1. Setup `modulePrefix`.
2. Setup the resolver to the new `ember-resolver`. (Before Ember v2.3, it is `ember/resolver`, from v2.3 it is `resolver`.)
3. Using the `ember-load-initializers` to preload initializer modules.
4. Setup the router.
5. Creating the app.

Mandatory:
- modulePrefix
- name
- Resolver

### Where are the templates?

* We save all the `hbs` file in the expected structure in `templates` folder.
* We will use `grunt-ember-templates` to compile

```
npm install --save-dev grunt-ember-templates
```

Because of the dependency, we have to install three other packages, but we will not use all of them, just `grunt-ember-templates` needs those.

TODO: updating `grunt-ember-templates` to work with the latest `htmlbar`, 'handlebar' and removing old dependencies.

```
  "devDependencies": {
    "ember-template-compiler": "^1.9.0-alpha",
    "grunt": "^0.4.5",
    "grunt-ember-templates": "^0.6.0",
    "handlebars": "~2"
  }
```

Two new files in our project: `Gruntfile.js` and `package.json`

### Gruntfile.js configuration

**files**
*(mandatory)*
Final template file and the source file.

**templateCompilerPath**
*(mandatory)*
The location of the actual `ember-template-compiler.js`

**handlebarsPath**
*(mandatory)*
The location of the `handlebars.js`, however in our case


```
//Gruntfile.js

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.initConfig({

    emberTemplates: {
      compile: {
        options: {
          templateCompilerPath: 'vendor/ember-template-compiler.js',
          handlebarsPath: 'vendor/ember-template-compiler.js',
          // templateBasePath: 'templates'
          templateRegistration: function(name, contents) {
            return "define('second-app/" + name + "', ['exports'], function(exports) { exports['default'] = " + contents + "; \n});";
          }
        },
        files: {
          "tmp/templates.js": "templates/**/*.hbs"
        }
      }
    }

  });

  grunt.registerTask('default', ['emberTemplates']);
};
```
It will generate the following:

```
// tmp/templates.js
define('second-app/templates/about', ['exports'], function(exports) { exports['default'] = Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    revision: "Ember@1.12.2",
    ...

define('second-app/templates/application', ['exports'], function(exports) { exports['default'] = Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    revision: "Ember@1.12.2",
    ...
```


If the resolver is the Ember.DefaultResolver, basically without any Resolver, the template grunt task configurations should be the following.

However, in this case you have to put everything in the global namespace and you should use the classic JavaScript naming, like `App.IndexController`, so you cannot use the modern module loader.

```
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ember-templates');

    grunt.initConfig({

        emberTemplates: {
            compile: {
                options: {
                    templateCompilerPath: 'vendor/ember-template-compiler.js',
                    handlebarsPath: 'vendor/ember-template-compiler.js',
                    templateBasePath: 'templates',
                },
                files: {
                    "tmp/templates.js": "templates/**/*.hbs"
                }
            }
        }

    });
    grunt.registerTask('default', ['emberTemplates']);
};
```

It will generate a `tmp/templates.js` file with the compiled content

```
Ember.TEMPLATES["application"] = Ember.HTMLBars.template((function() {...}
Ember.TEMPLATES["about"] = Ember.HTMLBars.template((function() {...}
```

# 3. Third - The Ember-CLI compatible Grunt solution

* Manage assets with bower with `bower.json`
* Node package management with `package.json`
* Manage tasks with Grunt: `Gruntfile.js`
* Transpile code with grunt-babel

```
$ mkdir third
$ cd third
```
### Bower packages

Install vendor files in bower_components folder. Ember bower package will install also the compatible jQuery package.
```
$ bower init
$ bower install --save ember#1.12.2
```
Note for ember-load-initializers
"For those using ember-cli <2.3.0-beta.2, please use ember-load-initializers@0.1.7 instead of the current version."
```
$ bower install --save ember-load-initializers#0.1.7
```
From `ember-resolver` the latest version which supports non Ember-CLI environment is v0.1.21.

```
bower install --save ember-resolver#0.1.21
```
The latest version from `loader.js` should work.
```
bower install --save loader.js#~4.0.1
```
And the ember-cli-shims for modularizing all ember modules, which is nested in ember.js package. The `0.0.6` version is preferred if you are using Ember v2.2 or earlier.

```
bower install -save ember-cli-shims#0.0.6
```

### Grunt packages

* load-grunt-config
   Autoload all grunt task with load-grunt-tasks
   Each config in separate file
   https://github.com/firstandthird/load-grunt-config

* grunt-babel
ES6 transpiler.
* contrib-clean
Clean files and folders.
* contrib-copy
* concat-sourcemap

* ember-templates


```
npm install --save-dev load-grunt-tasks
require('load-grunt-tasks')(grunt);
```

Important steps:

App Folder
/app
  /components
  /controllers
  /templates
  app.js
  index.html
  router.js

Transpilation
/tmp
  /transpiled

Concatenated with source map to
/dist
  /assets

https://github.com/stefanpenner/ember-app-kit/blob/master/Gruntfile.js


## Experiment with `babel-grunt`

In this experiment I installed `grunt-babel`, `babel-preset-es2015` and `babel-plugin-transform-es2015-modules-amd`

```
npm install --save-dev grunt-babel babel-preset-es2015 babel-plugin-transform-es2015-modules-amd
```

```
module.exports = {
  options: {
    sourceMap: true,
    presets: ['es2015'],
    plugins: ['transform-es2015-modules-amd'],
    moduleIds: true,
    sourceRoot: 'app',
    moduleRoot: 'third-app'
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'app/',
      src: ['**/*.js'],
      dest: 'tmp/transpiled/app'
    }]
  }
};
```
Babel configuration options:

* We need source map: `sourceMap: true`
* We would like to use the `es2015` preset: `presets: ['es2015']`
* Transform our code to amd compatible: `plugins: ['transform-es2015-modules-amd']`
* We need a module id: `moduleIds: true`
* We don't want to insert in the module name that extra `app` folder name. `sourceRoute: 'app'`
* Our modulePrefix would be the moduleRoot: `moduleRoot: 'third-app'`

This would generate the following transpiled code, which is not working.

```javascript
define('third-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers'], function (exports, _ember, _resolver, _loadInitializers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ember2 = _interopRequireDefault(_ember);

  var _resolver2 = _interopRequireDefault(_resolver);

  var _loadInitializers2 = _interopRequireDefault(_loadInitializers);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var App = void 0;

  _ember2.default.MODEL_FACTORY_INJECTIONS = true;

  App = _ember2.default.Application.extend({
    modulePrefix: 'third-app',
    Resolver: _resolver2.default
  });

  (0, _loadInitializers2.default)(App, config.modulePrefix);

  exports.default = App;
});
//# sourceMappingURL=app.js.map
```

Because of Babel 6 expect an `__esModule` property in the imported module, which is not exist in Ember.js modules, the above code doesn't work. `_interopRequireDefault` adds an extra default to the module. `_ember2.default.default.Application.extend` would work in this case.

## Experiment with `grunt-rollup`

```
npm i -D grunt-rollup
npm i -D rollup-plugin-babel
```

```javascript
// /tasks/options/rollup.js

var babel = require('rollup-plugin-babel');

module.exports = {
  options: {
    sourceMap: true,
    format: 'amd',
    moduleId: 'third-app',
    moduleName: 'example',
    exports: 'named',

    bundle: '',

    plugins: [
      babel({
        presets: ['es2015-rollup']
      })
    ]
  },

  default: {
    files: [{
      expand: true,
      cwd: 'app/',
      src: ['**/*.js'],
      dest: 'tmp/transpiled/app'
    }]
  }
};

```

The problem with this, rollup doesn't really support dynamically named modules. The `moduleId` appears in each module, but only that


## Concatenating transpiled code and our vendor files

```javascript
module.exports = {
  options: {
    sourceMap: true
  },

  default: {
    files: {
      'dist/assets/app.js': 'tmp/transpiled/app/**/*.js',
      'dist/assets/vendor.js': [
        'bower_components/loader.js/lib/loader/loader.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/ember/ember.debug.js',
        'bower_components/ember/ember-template-compiler.js',
        'bower_components/ember-resolver/dist/ember-resolver.js',
        'bower_components/ember-load-initializers/ember-load-initializers.js',
        'bower_components/ember-cli-shims/app-shims.js'
      ]
    }
  }
};
```

## Back to babel, it works with shim

Added this shim to the project and babel is working. :)

```
(function() {
  /* globals define, require, Ember, DS, jQuery */

  function generateModuleFromGlobal(name, values) {
    define(name, [], function() {
      'use strict';

      return {
        'default': values,
        '__esModule': true
      };
    });
  }

  function addEsModuleProperty(moduleName) {
    Object.defineProperty(require(moduleName), "__esModule", {
      value: true
    });
  }

  generateModuleFromGlobal('ember', Ember );
  generateModuleFromGlobal('jquery', self.jQuery );

  addEsModuleProperty('ember/resolver');
  addEsModuleProperty('ember/load-initializers');

})();

```

## Babel v5 with a new option

It looks, Babel v6 is not our friend in this story. Let's go back to v5.

"Updating" `package.json` with this `"grunt-babel": "~5.0.3",`, and using `modules: 'amdStrict'` option in `babel.js` grunt configuration:

```
module.exports = {
  options: {
    sourceMap: false,
    modules: 'amdStrict',
    moduleIds: true,
    sourceRoot: 'app',
    moduleRoot: 'third-app'
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'app/',
      src: ['**/*.js'],
      dest: 'tmp/transpiled/app'
    }]
  }
};
```

## More grunt tasks

* clean
* concat
* copy
* emberTemplates

* Creating the app in index.html

```
<script>
  require('third-app/app')['default'].create({
    name: 'third-app',
    version: '0.0.1',
    LOG_RESOLVER: true
  });
</script>
```

# Experiment Four

WIP

1. Creating an index.html
2. Import vendor libraries with require.js
3. Import the transpiled `app.js` from the Third experiment.
