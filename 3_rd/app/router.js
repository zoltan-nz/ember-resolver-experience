import Ember from 'ember';

const Router = Ember.Router.extend({
  location: 'hash'
});

Router.map(function() {
  this.route('about');
});

export default Router;
