define(function(require, exports, module){

    var data = require('data');

    exports.getTopicList = function (cb) {
        var url = '/mock/topic.json';
        data.query(url, function (resp) {
            if (resp.errCode === 200) {
                cb(resp.data || []);
            }
            else {
                cb([]);
            }
        }, 1000);
    }
});