requirejs.config({

  paths: {
    jquery: 'vendor/jquery',
    ember: 'vendor/ember.debug',
    'ember-template-compiler': 'vendor/ember-template-compiler'
  }
});

requirejs(['app/app']);