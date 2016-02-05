/**
 * Router
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    var base = require('./base');
    var url = require('url');

    module.exports = {
        init: init,
        go: go,
        goRoot: goRoot,
        getDist: getDist,
        reg: reg,
        custom: custom,
        checkDist: checkDist,
        getParams: getParams
    };

    var customRules = window.HY.route.customRules;

    var DEF = {
        root: '#!/'//根路由
    };

    var bindModule = $.noop;

    function onHashChange(cb) {
        bindModule && bindModule();
    }

    function onRouteChange(_bindModule){
        _bindModule && (bindModule = _bindModule);
        // 监听hashchange
        $(window).on('hashchange', onHashChange);
    }

    function offRouteChange(_bindModule){
        // 注销hashchange
        $(window).off('hashchange', onHashChange);
    }

    function getParams(param) {
        return param ? HY.route.now.params[param] : HY.route.now.params;
    }

    function init(bindModule, hash){
        var cb = function(){
            bindModule();
            onRouteChange(bindModule);
        };
        hash = hash || location.hash;
        if(hash.indexOf(DEF.root) !== -1){
            cb();
        }else{
            goRoot(cb);
        }
    }

    function goRoot(cb){
        setTimeout(function(){
            location.hash = DEF.root;
            setTimeout(function(){
                cb && cb();
            }, 10);
        }, 10);
    }

    function dist2hash(dist) {
        var params = '';
        if ($.isPlainObject(dist.params)) {
            for (var i in dist.params) {
                params += '&' + i + '=' + dist.params[i];
            }
        }
        var hash = DEF.root + dist.module + '/' + dist.action + params;
        return hash;
    }

    /**
     * 路由跳转
     * @param {string|Object} rule 路由规则，hash或者dist
     */
    function go(rule, options){
        var hash = '';
        var dist = checkDist(rule) ? rule : getDist(rule);
        options && $.extend(dist, {options: options});
        hash = dist2hash(dist);
        if (hash === location.hash) {
            return false;
        }
        setTimeout(function(){
            offRouteChange();
            location.hash = hash;
            bindModule(dist);
            setTimeout(onRouteChange, 20)
        }, 20);
    }

    function formatHash(hash){
        hash = hash || location.hash;
        var rule = '/' + hash.replace(DEF.root, '').replace(/^#?\/?/, '');
        var arr = rule.split('&');
        var ret = {
            rule: arr[0],
            params: !arr[1] ? {} : url.get('#', '#' + arr[1])
        };
        return ret;
    }

    function checkDist(dist){
        if (!$.isPlainObject(dist) || !dist.module || !dist.action) {
            return false;
        }
        !dist.options && (dist.options = {});
        !dist.params && (dist.params = {});
        dist.module.split('/').forEach(function (item) {
            if (/^(_|tpl_|css_)/.test(item)) {
                base.error('HY/module_checkDist:', 'Invalid module name ['+dist.module+']!');
                return false;
            }
        });
        return true;
    }

    function getDist(hash){
        var r = formatHash(hash);
        if (r.rule === '/') {
            return {
                isRoot: true
            };
        }
        var customRule = custom(r.rule, r.params);
        if (customRule) {
            return customRule;
        }
        var arr = r.rule.replace(/^\//, '').split('/');
        if(arr.length < 2){
            return goRoot();
        }
        return {
            rule: r.rule,
            module: arr.slice(0, arr.length-1).join('/'),
            action: arr[arr.length-1],
            params: r.params,
            options: {}
        };
    }

    // 注册自定义路由规则，如果无需自定义规则直接return false
    function reg(rule, arg){
        if(typeof rule !== 'string' && !(rule instanceof  RegExp)) return false;
        var route = {rule : rule};
        // 支持两种路由方式，回调、dist对象
        if($.isFunction(arg)){
            route.cb = arg;
        }else if($.isPlainObject(arg)){
            route.dist = arg;
        }
        customRules.push(route);
    }

    // 执行自定义路由规则，如果无需自定义规则直接return false
    function custom(hash){
        var rule, params;
        if (typeof hash === 'string') {
            var r = formatHash(hash);
            rule = r.rule;
            params = r.params;
        }
        else {
            rule = hash.rule;
            params = hash.params;
        }
        var next = function (item) {
            if ($.isFunction(customRules[i].cb)) {
                return customRules[i].cb();
            }
            if(checkDist(item.dist)){
                params && $.extend(item.dist, {
                    rule: item.rule,
                    params: params
                });
                return item.dist;
            }
            return false;
        };
        // 关键字的优先级更高
        for(var i in customRules){
            var _rule = customRules[i].rule;
            if(typeof _rule !== 'string' && _rule === rule){
                return next(customRules[i]);
            }
            else if(_rule instanceof  RegExp && _rule.test(rule)){
                return next(customRules[i]);
            }
        }
        return false;
    }

});