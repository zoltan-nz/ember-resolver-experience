module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-ember-templates');

    grunt.initConfig({

        emberTemplates: {
            compile: {
                options: {
                    // templateCompilerPath: 'vendor/ember-template-compiler.js'
                },
                files: {
                    // "tmp/templates.js": "app/templates/**/*.hbs"
                }
            }
        }

    });

    grunt.registerTask('default', ['emberTemplates']);

};