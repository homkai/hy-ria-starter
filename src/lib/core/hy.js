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
        route: {
            refer: {},
            now: {},
            customRules: []
        }
    };
    window.HY || (window.HY = HY);

    var base = require('./base');
    var route = require('route');
    var url = require('url');

    function bindModule(dist){
        // 路由规则，分自定义规则和默认规则，由route模块实现
        dist = dist || route.getDist();
        if(!$.isPlainObject(dist)){
            return base.error('HY/module_bind:', 'Can\'t find the matching route rule for this hash!');
        }
        if(dist.isRoot && HY.config.route.root){
            dist = HY.config.route.root;
        }
        // 当module或者action改变或者有reload:true时才重新加载
        if(dist.module === HY.route.now.module && (dist.action === HY.route.now.action && !dist.options.reload)) return false;
        if(dist.module !== HY.route.now.module){
            require.async('' + dist.module, function(module){
                dist.exports = module;
                dist.hash = location.hash;
                // 重置module event
                $(HY.moduleEventDom).remove();
                $(HY.rootDom).append('<section id="' + HY.moduleEventDom.split('#')[1] + '"></section>');
                // 重置refer、now
                var refer = HY.route.refer = $.extend({}, HY.route.now);
                var now = HY.route.now = dist;
                // 前置后置方法
                if (refer.exports) {
                    $.isFunction(refer.exports[refer.action+'_destroy']) && refer.exports[refer.action+'_destroy']();
                    $.isFunction(refer.exports['_destroy']) && refer.exports['_destroy']();
                }
                $.isFunction(now.exports['_init']) && now.exports['_init']();
                $.isFunction(now.exports[now.action+'_init']) && now.exports[now.action+'_init']();
                base.log('HY/module_ready', now.module+'->'+now.action);
                if (!module[now.action]) {
                    return base.error('HY/module_bind:', 'Unknown module/action ['+now.module+'/'+now.action+']!')
                }
                module[now.action]();
            });
        }else{
            var now = HY.route.now;
            now.action = dist.action;
            now.params = dist.params;
            // 前置后置方法
            $.isFunction(now.exports[now.action+'_destroy']) && now.exports[now.action+'_destroy']();
            $.isFunction(now.exports[now.action+'_init']) && now.exports[now.action+'_init']();
            base.log('HY/action_change', now.module+'->'+now.action);
            if (!now.exports[now.action]) {
                return base.error('HY/module_bind:', 'Unknown module/action ['+now.module+'/'+now.action+']!')
            }
            now.exports[now.action]();
        }
    }

    function init(root, config, cb){
        if (!root || !$(root).size()) {
            return base.error('HY/hy_init:', 'Root dom is not fund!');
        }
        HY.rootDom = root;
        // 整合配置
        if($.isPlainObject(config)) {
            HY.config = $.extend(true, {}, HY.config, config);
        }else if($.isFunction(config)){
            cb = config;
        }
        function next() {
            // 启动路由
            route.init(bindModule);
        }
        $.isFunction(cb) ? cb(require, next) : next();
    }
});