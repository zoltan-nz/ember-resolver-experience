requirejs.config({
  
  baseUrl: '/4_th/',

  shim: {
    'jquery': {
      exports: ['jQuery', '$']
    },
    'ember': {
      deps: ['jquery'],
      exports: 'Ember'
    }
  },
  
  paths: {
    'jquery': 'vendor/jquery',
    'ember': 'vendor/ember.debug',
    'ember-template-compiler': 'vendor/ember-template-compiler'
  }
});

requirejs(['app/app']);