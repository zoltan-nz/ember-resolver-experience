var babel = require('rollup-plugin-babel');

module.exports = {
  options: {
    sourceMap: true,
    format: 'amd',
    moduleId: 'third-app',
    moduleName: 'app',
    exports: 'named',
    
    bundle: '',

    plugins: [
      babel({
        presets: ['es2015-rollup']
      })
    ]
  },

  default: {
    files: [{
      expand: true,
      cwd: 'app/',
      src: ['**/*.js'],
      dest: 'tmp/transpiled/app'
    }]
  }
};