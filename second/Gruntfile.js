module.exports = function(grunt) {
  grunt.loadNpmTasks('tasks-ember-templates');

  grunt.initConfig({

    emberTemplates: {
      compile: {
        options: {
          templateCompilerPath: 'vendor/ember-template-compiler.js',
          handlebarsPath: 'vendor/ember-template-compiler.js',
          // templateBasePath: 'templates'
          templateRegistration: function(name, contents) {
            return "define('second-app/" + name + "', ['exports'], function(exports) { exports['default'] = " + contents + "; \n});";
          }
        },
        files: {
          "tmp/templates.js": "templates/**/*.hbs"
        }
      }
    }

  });

  grunt.registerTask('default', ['emberTemplates']);
};
