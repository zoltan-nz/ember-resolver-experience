define('second-app/app', ['exports'], function (exports) {
    var App = undefined;

    App = Ember.Application.extend();

    exports.default = App;
});

require('second-app/app').default.create();