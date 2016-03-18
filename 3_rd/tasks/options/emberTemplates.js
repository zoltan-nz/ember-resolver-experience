module.exports = {

  compile: {
    options: {
      // templateCompilerPath: 'bower_components/ember/ember-template-compiler.js',
      // handlebarsPath: 'bower_components/ember/ember-template-compiler.js',
      templateBasePath: 'app',
      templateRegistration: function(name, contents) {
        return "define('third-app/" + name + "', ['exports'], function(exports) { exports['default'] = " + contents + "; \n});";
      }
    },

    files: {
      "tmp/templates.js": "app/templates/**/*.hbs"
    }
  }
};