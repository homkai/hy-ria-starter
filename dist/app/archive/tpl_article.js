define(function(require, exports, module){
  exports.main = function anonymous(it
/**/) {
var out=' <div class="container"> <h3>列表页 - '+(it.topicName)+'</h3> <div id="article-list"></div> </div>';return out;
};
  exports.list = function anonymous(it
/**/) {
var out=' '; if (!it.articleList.length) { out+=' <p>该话题下，暂无文章！</p> '; } out+=' <ul class="article-list"> '; it.articleList.forEach(function (item) { out+=' <li><a href="javascript:;" data-trigger="goArticle" data-article-id="'+(item.id)+'" data-article-closed="'+(item.closed)+'">'+(item.title)+'</a></li> '; }); out+=' </ul>';return out;
};
  exports.detail = function anonymous(it
/**/) {
var out=' <div class="container"> <h3>详情页 - '+(it.title)+'</h3> </div>';return out;
};
});