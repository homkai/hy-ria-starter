define(function(require, exports, module){

    var event = require('event');
    var route = require('route');

    exports.setNavActive = function (nav) {
        $('#navbar-nav li').removeClass('active');
        $('#navbar-nav li[data-nav="' + nav +'"]').addClass('active');
    };

    exports.init = function(){
        var css = require('./css_app');
        var tpl = require('./tpl_app');
        var config = require('_config/app');
        var service = require('_service/archive');
        // 初始化页面
        service.getTopicList(function (topicList) {
            console.log('topicList', topicList);
            topicList = topicList.sort(function (a, b) {
                return a.priority - b.priority;
            });
            var header = tpl.header({title: config.title, topicList: topicList});
            var body = tpl.body();
            var footer = tpl.footer();
            $(HY.rootDom).html(css + header + body + footer);
        });
    };
});