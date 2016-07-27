var config = require('../../config');

module.exports = {
  default:
    ["<%= config.tmp %>", "<%= config.dist %>"]
};
