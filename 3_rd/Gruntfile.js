var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'tasks/options'),
    loadGruntTasks: true
  });
  
  grunt.registerTask('default', ['clean', 'babel', 'emberTemplates', 'concat', 'copy']);
};