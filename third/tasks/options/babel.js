module.exports = {
  options: {
    sourceMap: false,
    modules: 'amdStrict',
    moduleIds: true,
    sourceRoot: 'app',
    moduleRoot: 'third-app'
  },

  dist: {
    files: [{
      expand: true,
      cwd: 'app/',
      src: ['**/*.js'],
      dest: 'tmp/transpiled/app'
    }]
  }
};