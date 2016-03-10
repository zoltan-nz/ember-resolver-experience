Ember Resolver Experience
===

Web server is `http-server`

```
$ npm start
```

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
