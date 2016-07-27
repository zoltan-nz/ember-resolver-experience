var path = require('path');
var join = path.join;

console.log(process.cwd());

module.exports = {
  pwd: process.cwd(),
  options: 'tasks/options',
  configPath: join(process.cwd(), this.options),
  tmp: 'tmp',
  dist: 'dist'
};