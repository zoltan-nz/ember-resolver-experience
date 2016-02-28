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

Compile template.js file based on hbs template files with grunt.

Basic setup, with an index.html, manually added vendor files.

Using `Gruntfile.js`
Using `package.json`

Manually recreate the structure what Ember-cli generates in dist folder.

```
index.html
/assets
  app.js
  vendor.js
```

Looks, `loader.js` and `ember/resolver` is important.

- define
- require




