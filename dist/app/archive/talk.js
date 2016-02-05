define(function(require, exports, module){

    var app = require('_base/app');

    exports._init = function(){
        console.log('archive/talk/_init', '模块前置');
        app.setNavActive('talk');
    };

    exports.init = function(){
        console.log('archive/talk/init');
        var tpl = require('./tpl_talk');
        $('#container').html(tpl);
    };
});