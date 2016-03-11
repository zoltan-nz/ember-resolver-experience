module.exports = {
  options: {
    sourceMap: false,
    presets: ['es2015'],
    plugins: ['transform-es2015-modules-amd'],
    moduleIds: true,
    sourceRoot: 'app',
    moduleRoot: 'third-app',
    ignore: 'shims.js'
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