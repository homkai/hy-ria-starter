/**
 * HyMobile 单页应用框架
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    module.exports = {
        init: init
    };

    // HY全局数据池
    var HY = {
        config: {
            route: {
                root:{
                    //module: 'main',
                    //action: 'root'
                }
            }
        },
        rootDom: '',
        moduleEventDom: '#hy_module_event',
        refer: {},
        now: {}
    };
    window.HY || (window.HY = HY);

    var Route = require('route'),
        URL = require('url'),
        Event = require('event');

    function log(){
        if(!window.console || !URL.get('?hyDebug')) return;
        if(arguments.length > 1) arguments[0] += ' => ';
        return console.log.apply(console, arguments);
    }

    function error(){
        if(!window.console) return;
        return console.error.apply(console, arguments);
    }

    function checkDist(dist){
        if (!dist.module || !dist.action) {
            return false;
        }
        dist.module.split('/').forEach(function (item) {
            if (/^(_|tpl_|css_)/.test(item)) {
                error('HY/module_checkDist:', 'Invalid module name ['+dist.module+']!');
                return false;
            }
        });
        return true;
    }

    function bindModule(){
        // 路由规则，分自定义规则和默认规则，由route模块实现
        var dist = Route.custom() || Route.getDist();
        if(!$.isPlainObject(dist)){
            return error('HY/module_bind:', 'Can\'t find the matching route rule for this hash!');
        }
        if(dist.isRoot && HY.config.route.root){
            dist = HY.config.route.root;
        }
        if(!checkDist(dist)) return false;
        // 当module或者action改变时才重新加载
        if(dist.module === HY.now.module && dist.action === HY.now.action) return false;
        if(dist.module !== HY.now.module){
            require.async('' + dist.module, function(module){
                dist.exports = module;
                dist.hash = location.hash;
                // 重置module event
                $(HY.moduleEventDom).remove();
                $(HY.rootDom).append('<section id="' + HY.moduleEventDom.split('#')[1] + '"></section>');
                // 重置refer、now
                var refer = HY.refer = HY.now;
                var now = HY.now = dist;
                // 前置后置方法
                if (refer.exports) {
                    $.isFunction(refer.exports[refer.action+'_destroy']) && refer.exports[refer.action+'_destroy']();
                    $.isFunction(refer.exports['_destroy']) && refer.exports['_destroy']();
                }
                $.isFunction(now.exports['_init']) && now.exports['_init']();
                $.isFunction(now.exports[now.action+'_init']) && now.exports[now.action+'_init']();
                log('HY/module_ready', now.module+'->'+now.action);
                if (!module[dist.action]) {
                    return error('HY/module_bind:', 'Unknown module/action ['+dist.module+'/'+dist.action+']!')
                }
                module[dist.action]();
            });
        }else{
            // 前置后置方法
            $.isFunction(dist.exports[dist.action+'_destroy']) && dist.exports[dist.action+'_destroy']();
            $.isFunction(dist.exports[dist.action+'_init']) && dist.exports[dist.action+'_init']();
            log('HY/action_change', dist.module+'->'+dist.action);
            if (!dist.exports[dist.action]) {
                return error('HY/module_bind:', 'Unknown module/action ['+dist.module+'/'+dist.action+']!')
            }
            dist.exports[dist.action]();
        }
    }

    function init(root, config, cb){
        if (!root || !$(root).size()) {
            return error('HY/hy_init:', 'Root dom is not fund!');
        }
        HY.rootDom = root;
        // 整合配置
        if($.isPlainObject(config)) {
            HY.config = $.extend(true, {}, HY.config, config);
        }else if($.isFunction(config)){
            cb = config;
        }
        function boot() {
            // 启动路由
            Route.init(bindModule);
        }
        $.isFunction(cb) ? cb(require, boot) : boot();
    }
});