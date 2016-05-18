require(['jquery', 'ember'], function ($, Ember) {
  $(function() {

    var Router = Ember.Router.extend({
      location: 'hash'
    });

    Router.map(function() {
      this.route('about');
    });

    Ember.Application.create({
      name: 'App',
      LOG_RESOLVER: true,
      LOG_ACTIVE_GENERATION: true,
      LOG_TRANSITIONS: true,
      LOG_TRANSITIONS_INTERNAL: true,
      LOG_VIEW_LOOKUPS: true,

      Router: Router
    });
  });
});