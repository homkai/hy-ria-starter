/**
 * Data Module
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    var cache = require('cache'),
        url = require('url');

    module.exports = {
        query: query
    };

    /**
    * AJAX请求，会携带url query信息，支持缓存
    * @param url url
    * @param data 要发送的数据，可选
    * @param cb 请求成功或者失败都是执行这个回调方法
    * @param cacheTime number|callback
    * @returns {*}
    */
    function query(uri, data, cb, _cacheTime){
        if(!uri) return false;
        if(!$.isPlainObject(data) && $.isFunction(data)){
            _cacheTime = cb;
            cb = data;
            data = {};
        }
        var cacheTime = _cacheTime;
        if(_cacheTime && !$.isFunction(_cacheTime)){
            cacheTime = function(){
                return _cacheTime;
            }
        }
        if(cacheTime){
            var res = cache.getItem(uri);
            if(res){
                return $.isFunction(cb) && cb(res);
            }
        }
        // 携带url基础query参数
        data = $.extend({}, data, url.get('?'));
        $.ajax({
            url: uri,
            data: data,
            success: function(res){
                if(cacheTime){
                    cache.setItem(uri, res, cacheTime(res));
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