/**
 * Event Module
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    module.exports = {
        on: on,
        emit: emit,
        off: off,
        onG: onG,
        emitG: emitG,
        offG: offG
    };

    var HY = window.HY;

    function on(event, cb){
        var $dom = $('#' + HY.config.dom.module);
        $.fn.on.apply($dom, arguments);
    }

    function emit(event, arrArg){
        var $dom = $('#' + HY.config.dom.module);
        $.fn.trigger.apply($dom, arguments);
    }

    function off(event){
        var $dom = $('#' + HY.config.dom.module);
        $.fn.off.apply($dom, arguments);
    }

    function onG(event, cb){
        var $dom = $('#' + HY.config.dom.global);
        $.fn.on.apply($dom, arguments);
    }

    function emitG(event, arrArg){
        var $dom = $('#' + HY.config.dom.global);
        $.fn.trigger.apply($dom, arguments);
    }

    function offG(event){
        var $dom = $('#' + HY.config.dom.global);
        $.fn.off.apply($dom, arguments);
    }
});