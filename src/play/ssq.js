define(function(require, exports, module){

    exports._init = function(){
        console.log('_init', Date.now());
    };

    exports.run_init = function(){
        console.log('run_init', Date.now());
    };

    exports.run = function(req, ctn){
        console.log('play/ssq->run', Date.now());
        var html = '<a href="javascript:;" data-go-route="play/ssq/order">play/ssq/order</a><br><a href="javascript:;" data-go-route="index/main/run">index/main/run</a>';
        $(ctn).html(html);
    };

    exports.order = function(req, ctn){
        console.log('play/ssq->order', Date.now());
        var html = '<a href="javascript:;" data-go-route="play/ssq/run">Go Back</a>';
        $(ctn).html(html);
    };

    exports.run_destroy = function(){
        console.log('run_destroy', Date.now());
    };

    exports._destroy = function(){
        console.log('_destroy', Date.now());
    };
});