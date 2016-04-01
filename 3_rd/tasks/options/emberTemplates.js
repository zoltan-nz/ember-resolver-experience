module.exports = {

  compile: {
    options: {
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