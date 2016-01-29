define(function(require, exports, module){
  exports.header = function anonymous(it
/**/) {
var out=' <header class="page-head"> <nav class="navbar navbar-default"> <div class="container-fluid">  <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#">'+(it.title)+'</a> </div>  <div class="collapse navbar-collapse"> <ul class="nav navbar-nav" id="navbar-nav"> <li class="active" data-nav="home"><a href="javascript:;" data-go-route="archive/home/init">首页 <span class="sr-only">(current)</span></a></li> <li data-nav="talk"><a href="javascript:;" data-go-route="archive/talk/init">说说</a></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">日志 <span class="caret"></span></a> <ul class="dropdown-menu"> '; it.topicList.forEach(function(item) { out+=' <li><a href="javascript:;">'+(item.name)+'</a></li> '; }); out+=' </ul> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li><a target="_blank" href="https://github.com/homkai/hy-ria-starter">GitHub</a></li> </ul> </div> </div> </nav> </header>';return out;
};
  exports.body = function anonymous(it
/**/) {
var out=' <main class="page-body"> <style scoped> .page-body { min-height: 400px; } </style> <div id="container"></div> </main>';return out;
};
  exports.footer = function anonymous(it
/**/) {
var out=' <footer class="page-foot"> <style scoped> footer { margin-top: 20px; padding-bottom: 10px; } .foot-line { height: 1px; border-top: 1px solid #e5e5e5; margin-bottom: 20px; } .copyright { text-align: center; } </style> <div class="foot-line"></div> <div class="copyright"> ©2016 <a target="_blank" href="https://github.com/homkai/">Homkai</a> </div> </footer>';return out;
};
});