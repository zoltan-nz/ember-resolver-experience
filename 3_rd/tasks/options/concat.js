module.exports = {
  options: {
    sourceMap: false
  },

  default: {
    files: {
      'dist/assets/app.js': ['tmp/transpiled/app/**/*.js', 'tmp/templates.js'],
      'dist/assets/vendor.js': [
        'bower_components/loader.js/lib/loader/loader.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/ember/ember.debug.js',
        'bower_components/ember/ember-template-compiler.js',
        'bower_components/ember-resolver/dist/ember-resolver.js',
        'bower_components/ember-load-initializers/ember-load-initializers.js',
        'bower_components/ember-cli-shims/app-shims.js'
      ]
    }
  }
};