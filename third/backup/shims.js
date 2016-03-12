(function() {
  /* globals define, require, Ember, DS, jQuery */

  function generateModuleFromGlobal(name, values) {
    define(name, [], function() {
      'use strict';

      return {
        'default': values,
        '__esModule': true
      };
    });
  }
  
  function addEsModuleProperty(moduleName) {
    Object.defineProperty(require(moduleName), "__esModule", {
      value: true
    });
  }
  
  generateModuleFromGlobal('ember', Ember );
  generateModuleFromGlobal('jquery', self.jQuery );

  addEsModuleProperty('ember/resolver');
  addEsModuleProperty('ember/load-initializers');

})();

