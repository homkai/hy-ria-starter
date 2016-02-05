define(function(require, exports, module){

    var app = require('_base/app');
    var route = require('route');
    var service = require('_service/archive');
    var event = require('event');
    var tpl = require('./tpl_article');
    var msg = require('msg');

    exports._init = function(){
        app.setNavActive('article');
        // 注册该module下的事件
        event.on('goArticle', function (e, $el) {
            var articleId = $el.data('article-id');
            var closed = $el.data('article-closed') - 0;
            if (closed) {
                msg.notice('文章暂不支持查看！');
                return false;
            }
            route.go({
                module: 'archive/article',
                action: 'detail',
                params: {
                    articleId: articleId
                },
                options: {
                    reload: true
                }
            });
        });
    };

    function setTopicNavActive(topicId) {
        $('#navbar-topic-list li').removeClass('active');
        $('#navbar-topic-list li a[data-topic-id="' + topicId + '"]').closest('li').addClass('active');
    }

    exports.list_init = function(){
        var topicId = route.getParams('topicId');
        setTopicNavActive(topicId);
    };

    exports.list = function(){
        console.log('article/list', Date.now());
        var topicId = route.getParams('topicId') - 0;
        service.getTopicList(function (topicList) {
            var topicName = '';
            topicList.forEach(function (item) {
                item.id === topicId && (topicName = item.name);
            });
            $('#container').html(tpl.main({topicName: topicName}));
            // 初始化事件
            service.getArticleList(topicId, function (articleList) {
                $('#article-list').html(tpl.list({articleList: articleList}));
            });
        });
    };

    exports.detail = function(){
        console.log('article/detail', Date.now());
        var articleId = route.getParams('articleId') - 0;
        service.getArticleDetail(articleId, function (article) {
            $('#container').html(tpl.detail(article));
        });
    };
});