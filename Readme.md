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




