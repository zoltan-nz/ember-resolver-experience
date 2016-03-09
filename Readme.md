Ember Resolver Experience
===

Web server is `http-server`

```
$ npm start
```

# 1. First

* Basic index.html page
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

# 2. Second

For a more complex solution you need the following js files:

-> jquery.js
-> ember.js
-> ember-template-compiler.js
-> [loader.js](https://github.com/ember-cli/loader.js)
-> [load-initializers.js](https://github.com/ember-cli/ember-load-initializers)
-> [resolver.js](https://github.com/ember-cli/ember-resolver)

-> shims.js
The above Ember.js create a global `Ember` object, this shims just define an `ember` module.

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

Let's create our App in `assets` folder.

It is the most basic app, with one `about` route.

```
define('second-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers'], function(exports, _ember, _emberResolver, _loadInitializers) {
  var App = undefined;

  App = _ember['default'].Application.extend(
    {
      modulePrefix: 'second-app',
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

require('second-app/app')['default'].create({
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

Compile template.js file based on hbs template files with grunt.

Basic setup, with an index.html, manually added vendor files.

Using `Gruntfile.js`
Using `package.json`

Manually recreate the structure what Ember-cli generates in dist folder.

```
index.html
/assets
  app.js
  resolver.js
```

Looks, `loader.js` and `ember/resolver` is important.

- define
- require

Add loader to the vendor
Add router to app.js
App resolver to resolver.js

Shims.
Ember added to global namespace, shims only create a reference with `define()`.


### grunt-ember-template

```
//Gruntfile.js

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ember-templates');

    grunt.initConfig({

        emberTemplates: {
            compile: {
                options: {
                    templateCompilerPath: 'vendor/ember-template-compiler.js',
                    handlebarsPath: 'vendor/handlebars.js',
                    amd: true,
                    precompile: true,
                    // templateRegistration: function(name, contents) {
                    //     return "define('second-app/" + name + "', [], function() { return " + contents + "; });";
                    // }
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

**files**

Final template file and the source file.

**templateCompilerPath**

The location of the actual `ember-template-compiler.js`

**handlebarsPath**

The location of the `handlebars.js`

**amd**


If the resolver is the Ember.DefaultResolver, basically without any Resolver, the template grunt task configurations should be the following:

```
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ember-templates');

    grunt.initConfig({

        emberTemplates: {
            compile: {
                options: {
                    templateCompilerPath: 'vendor/ember-template-compiler.js',
                    handlebarsPath: 'vendor/handlebars.js',
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
