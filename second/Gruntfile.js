module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ember-templates');

    grunt.initConfig({

        emberTemplates: {
            compile: {
                options: {
                    // namespace: 'SecondApp.Templates',
                    templateCompilerPath: 'vendor/ember-template-compiler.js',
                    handlebarsPath: 'vendor/handlebars.js',
                    templateBasePath: 'templates',
                    // amd: true,
                    // precompile: true
                    // templateRegistration: function(name, contents) {
                    //     return "define('second-app/" + name + "', [], function() { return " + contents + "; });";
                    // }
                },
                files: {
                    "tmp/templates.js": "templates/**/*.hbs"
                }
            }
        }

    });

    grunt.registerTask('default', ['emberTemplates']);

};