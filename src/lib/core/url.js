/**
 * URL Module
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    exports.setHashParam = function(key, value){
        var old = location.hash,
            reg = new RegExp('^(.*[#|&])'+key+'=([^&]*)(.*)$'),
            rep = old.replace(reg, '$1'+key+'='+value+'$3');
        if(rep !== old){
            location.hash = rep;
        }
    };

    /**
     * URL参数解析，默认解析当前URL
     * 获取GET参数的值： $.url('?[param]', [url])
     * 获取锚点的值： $.url('#[param]', [url])
     * 类PHP parse_url：$.url('path|query|hash|all', [url])
     * 获取所在域名：$.url('domain', [url])
     */
    exports.get = function(arg, url) {
        url = url || location.href;
        if (!arg) return url;
        if ('?' === arg.charAt(0) || '#' === arg.charAt(0)) {
            var params = {},
                key = arg.split(arg.charAt(0))[1],
                reg = '?' === arg.charAt(0) ? /.+\?([^#]+).*/ : /.+#(.+)/;
            var query = url.replace(reg, "$1");
            if (query) {
                var parts = query.split("&"), kv;
                for (var i = 0, ii = parts.length; i < ii; i++) {
                    if(parts[i].indexOf("=") === -1) continue;
                    kv = parts[i].split("=");
                    params[kv[0]] = kv[1] || '';
                }
            }
            return key ? params[key] || '' : params;
        }
        if ($.inArray(arg, ['host', 'port', 'path', 'query', 'fragment', 'hash', 'all'])) {
            var parse = arguments[1] ? url.match(/([^\/]*\/\/:)?([^(\/\?#)]*)(\/?[^(\?#)]*)\??([^#]*)#?(.*)/) : window.location;
            var all = {};
            if (!arguments[1]) {
                all = {
                    host: parse.hostname,
                    port: parse.port,
                    path: parse.pathname,
                    query: parse.search.replace(/^\?/, ''),
                    fragment: parse.hash.replace(/^#/, ''),
                    hash: all.fragment
                }
            } else {
                var host = parse[1] && parse[2].split(':') || {};
                all = {
                    host: host[0],
                    port: host[1],
                    path: parse[1] ? parse[3] : parse[2] + parse[3],
                    query: parse[4],
                    fragment: parse[5],
                    hash: all.fragment
                }
            }
            return arg === 'all' ? all : ( all[arg] || '' );
        }
        if (arg === 'domain') {
            var hostname = parse.hostname || parse[1].split(':')[0];
            // 判断是否是IP：
            if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(hostname)) return hostname;
            var arr = hostname.split('.');
            if (arr.length > 2) arr.shift();
            return arr.join('.');
        }
    }
});