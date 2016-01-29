define(function(require, exports, module){

    exports.init = function(){
        var css = require('./css_app');
        var tpl = require('./tpl_app');
        var config = require('_config/app');
        var service = require('_service/archive');
        service.getTopicList(function (topicList) {
            console.log('topicList', topicList);
            var header = tpl.header({title: config.title, topicList: topicList});
            var body = tpl.body();
            var footer = tpl.footer();
            $(HY.rootDom).html(css + header + body + footer);
        });
    };
});