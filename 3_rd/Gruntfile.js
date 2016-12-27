var path = require('path');
var config = require('./config');

var glob = require('glob');

function loadConfig(tasksPath) {
  var object = {};
  var key;

  glob.sync('*', {cwd: tasksPath}).forEach(function(taskFile) {
    key = taskFile.replace(/\.js$/, '');
    object[key] = require(tasksPath + taskFile);
  });

  return object;
}

module.exports = function(grunt) {

  // require('load-grunt-config')(grunt, {
  //   configPath: 'tasks/options',
  //   loadGruntTasks: true
  // });

  var pathConfig = {
    tmp: 'tmp',
    dist: 'dist'
  };

  var config = {
    pathConfig: pathConfig
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/'));
  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['clean', 'babel', 'emberTemplates', 'concat', 'copy']);
};
