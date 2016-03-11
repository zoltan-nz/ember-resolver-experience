import Ember from 'ember';

const Router = Ember.Router.extend({
  location: 'auto'
});

Router.map(function() {
  this.route('about');
});

export default Router;
