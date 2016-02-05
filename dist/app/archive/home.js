define(function(require, exports, module){

    var app = require('_base/app');

    exports._init = function(){
        console.log('archive/home/_init', '模块前置');
        app.setNavActive('home');
    };

    exports.init = function(){
        console.log('archive/home/init');
        var tpl = require('./tpl_home');
        $('#container').html(tpl);
    };

    exports._destroy = function(){
        console.log('archive/home/_destroy', '模块后置');
    };
});