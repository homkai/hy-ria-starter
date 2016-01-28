/**
 * View Module
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    exports.init = function(){
        // 快速路由
        $('body').on('click', '[data-go-route]', function(){
            var route = $.trim($(this).data('go-route'));
            if(!route) return;
            require('route').go(route);
        });
        // 快速跳转URL
        $('body').on('click', '[data-go-url]', function(){
            var url = $.trim($(this).data('go-url'));
            if(!url) return;
            setTimeout(function(){
                location.href = url;
            }, 10);
        });
    }

});