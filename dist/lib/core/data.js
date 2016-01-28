/**
 * Data Module
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    var Cache = require('cache'),
        URL = require('url');

    module.exports = {
        query: query
    };

    /**
     * AJAX请求，会携带URL query信息，支持缓存
     * @param url URL
     * @param data 要发送的数据，可选
     * @param cb 请求成功或者失败都是执行这个回调方法
     * @param cacheTime number|callback
     * @returns {*}
     */
    function query(url, data, cb, cacheTime){
        if(!url) return false;
        if(!$.isPlainObject(data) && $.isFunction(data)){
            cacheTime = cb;
            cb = data;
            data = {};
        }
        if(cacheTime && !$.isFunction(cacheTime)){
            cacheTime = function(){
                return cacheTime;
            }
        }
        if(cacheTime){
            var res = Cache.getItem(url);
            if(res){
                return $.isFunction(cb) && cb(res);
            }
        }
        // 携带URL基础query参数
        data = $.extend({}, data, URL.get('?'));
        $.ajax({
            url: url,
            data: data,
            success: function(res){
                if(cacheTime){
                    var cacheTime = cacheTime(res);
                    Cache.setItem(url, res, cacheTime);
                }
                $.isFunction(cb) && cb(res);
            },
            error: function(res){
                // TODO 之后可以做统一上报
                $.isFunction(cb) && cb(false);
            }
        });


    }


});