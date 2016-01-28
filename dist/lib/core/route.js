/**
 * Router
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    module.exports = {
        run: run,
        go: goRule,
        goRoot: goRoot,
        getRule: getRule,
        getDist: getDist,
        reg: register,
        custom: custom
    };

    window.HY.routeCenter || (window.HY.routeCenter = []);
    var routeCenter = window.HY.routeCenter;

    var DEF = {
        root: '#!/'//goRule依赖正则形式
    };

    // 监听hashchange
    function listenHashChange(cb){
        $(window).on('hashchange', function(){
            cb && cb();
        });
    }

    function run(bindModule, hash){
        var cb = function(){
            bindModule();
            listenHashChange(bindModule);
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

    function goRule(rule, data){
        rule.replace(/^(#!\/|\/)*/, '');
        rule = DEF.root + rule;
        var hash = rule;
        for(var i in data){
            hash += '&' + i + '=' + (data[i] || '');
        }
        setTimeout(function(){
            location.hash = hash;
        }, 20);
    }

    function getRule(hash){
        hash = hash || location.hash;
        hash = '#'+(hash.replace(/^#*/, ''));
        var rule = '';
        if(hash.indexOf(DEF.root) !== -1){
            var reg = new RegExp('^'+DEF.root+'([^&]*)(&.*)?$');
            rule = hash.replace(reg, '$1');
        }else{
            goRoot();
        }
        return '/'+rule;
    }

    function getDist(rule){
        rule = rule || getRule();
        if(rule === '/'){
            return {
                rule: rule,
                isRoot: true
            };
        }
        var arr = rule.replace(/^\/*/, '').split('/');
        if(arr.length<2){
            return goRoot();
        }
        return {
            rule: rule,
            module: arr.slice(0, arr.length-1).join('/'),
            action: arr[arr.length-1]
        };
    }

    // 注册自定义路由规则，如果无需自定义规则直接return false
    function register(rule, arg){
        if(typeof rule !== 'string' && !(rule instanceof  RegExp)) return false;
        var route = {rule : rule};
        // 支持两种路由方式，回调、dist对象
        if($.isFunction(arg)){
            route.cb = arg;
        }else if($.isPlainObject(arg) && arg.module){
            route.dist = {
                module: arg.module,
                action: arg.action
            };
        }
        routeCenter.push(route);
    }

    // 执行自定义路由规则，如果无需自定义规则直接return false
    function custom(hash){
        hash = hash || location.hash;
        hash = hash.replace(/^#*/, '');
        // 关键字的优先级更高
        for(var i in routeCenter){
            var rule = routeCenter[i].rule;
            if(!rule || typeof rule !== 'string') continue;
            if(rule === hash){
                if($.isPlainObject(routeCenter[i].dist)){
                    routeCenter[i].dist.rule = rule;
                    return routeCenter[i].dist;
                }
                return routeCenter[i].cb && routeCenter[i].cb();
            }
        }
        // 正则规则匹配
        for(var i in routeCenter){
            var rule = routeCenter[i].rule;
            if(!rule || !(rule instanceof  RegExp)) continue;
            if(rule.test(hash)){
                if($.isPlainObject(routeCenter[i].dist)){
                    routeCenter[i].dist.rule = rule;
                    return routeCenter[i].dist;
                }
                return routeCenter[i].cb && routeCenter[i].cb();
            }
        }
        return false;
    }

});