/**
 * MessageUI Module
 * Created by Homkai on 2015/8/8.
 */
define('msg', function(require, exports, module){
    // TODO 后续开发

    module.exports = {
        notice: notice,
        showDialog: showDialog,
        closeDialog: closeDialog,
        showLoading: showLoading,
        hideLoading: hideLoading
    };

    function notice(content){
        alert(content);
    }

    function showDialog(){

    }

    function closeDialog(){

    }

    function showLoading(){

    }

    function hideLoading(){

    }
});