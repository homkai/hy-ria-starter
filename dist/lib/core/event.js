/**
 * Event Module
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    module.exports = {
        on: on,
        trigger: trigger,
        off: off,
        onG: onG,
        triggerG: triggerG,
        offG: offG
    };

    var HY = window.HY;

    function on(event, cb){
        var $dom = $(HY.moduleEventDom);
        $.fn.on.apply($dom, arguments);
    }

    function trigger(event, arrArg){
        var $dom = $(HY.moduleEventDom);
        $.fn.trigger.apply($dom, arguments);
    }

    function off(event){
        var $dom = $(HY.moduleEventDom);
        $.fn.off.apply($dom, arguments);
    }

    function onG(event, cb){
        var $dom = $(HY.rootDom);
        $.fn.on.apply($dom, arguments);
    }

    function triggerG(event, arrArg){
        var $dom = $(HY.rootDom);
        $.fn.trigger.apply($dom, arguments);
    }

    function offG(event){
        var $dom = $(HY.rootDom);
        $.fn.off.apply($dom, arguments);
    }
});