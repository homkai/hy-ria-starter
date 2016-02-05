/**
 * View Module
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    var event = require('event');
    var route = require('route');

    exports.init = function(){
        // 快速路由
        event.onG('click', '[data-go-route]', function(e){
            var rule = $.trim($(this).data('go-route'));
            if(!rule) return;
            route.go(rule);
        });
        // 相同module/action时，参数不同会reload
        event.onG('click', '[data-go-route-reload]', function(e){
            var rule = $.trim($(this).data('go-route-reload'));
            if(!rule) return;
            route.go(rule, {reload: true});
        });
        // 快速跳转URL
        event.onG('click', '[data-go-url]', function(e){
            var url = $.trim($(this).data('go-url'));
            if(!url) return;
            setTimeout(function(){
                location.href = url;
            }, 10);
        });
        // 触发module事件
        event.onG('click', '[data-trigger]', function(e){
            var reg = $.trim($(this).data('trigger'));
            if(!reg) return;
            event.trigger(reg, [$(this)]);
        });

        // 触发global事件
        event.onG('click', '[data-trigger-g]', function(){
            var reg = $.trim($(this).data('trigger-g'));
            if(!reg) return;
            event.triggerG(reg, [$(this)]);
        });
    }

});