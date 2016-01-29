define(function(require, exports, module){

    exports._init = function(){
        console.log('archive/home/_init', '模块前置');
        $('#navbar-nav li').removeClass('active');
        $('#navbar-nav li[data-nav="home"]').addClass('active');
    };

    exports.init = function(){
        console.log('archive/home/init');
        var tpl = require('./tpl_home');
        $('#container').html(tpl.main());
    };

    exports._destroy = function(){
        console.log('archive/home/_destroy', '模块后置');
    };
});