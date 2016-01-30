define(function(require, exports, module){

    exports._init = function(){
        console.log('archive/talk/_init', '模块前置');
        $('#navbar-nav li').removeClass('active');
        $('#navbar-nav li[data-nav="talk"]').addClass('active');
    };

    exports.init = function(){
        console.log('archive/talk/init');
        var tpl = require('./tpl_talk');
        $('#container').html(tpl.main());
    };
});