"use strict";
/* globals define registry requirejs */

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