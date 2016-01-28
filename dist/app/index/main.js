define(function(require, exports, module){

    exports.run = function(req, ctn){
        console.log('index/main->run', Date.now());
        var Css = require('index/css_main');
        var Tpl = require('index/tpl_main').head({name: 'Homkai'});
        $(ctn).html(Css + Tpl);

        $('#go-back').on('click', function(){
            var Route = require('route');
            Route.goRoot();
        });
    };
});