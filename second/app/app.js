var App = Ember.Application.create({
    LOG_RESOLVER: true
});

var Router = Ember.Router.extend();

Router.map(function() {
   this.route('about');
});