define(function(require, exports, module) {

    var url = require('url');

    exports.log = function () {
        if (!window.console || !url.get('?hyDebug')) return;
        if (arguments.length > 1) arguments[0] += ' => ';
        return console.log.apply(console, arguments);
    };

    exports.error = function () {
        if (!window.console) return;
        return console.error.apply(console, arguments);
    };

});