/**
 * Time Format Module
 * Created by Homkai on 2015/8/8.
 */
define(function(require, exports, module){

    module.exports = {
        now: now,
        format: format
    };

    function getSvrTimeDiff(){
        // TODO 这里要处理与服务器的时间差
        return 0;
    }

    function now(){
        var t = (Date.now && Date.now()) || (new Date()).getTime();
        return t + getSvrTimeDiff();
    }

    function pad2(num){
        return num < 10 ? '0'+num : num;
    }

    /**
     * 时间格式化
     * @param format 为格式化匹配关键字 mm表示两位月份，m表示一位月份 d h i s类似，w为星期0-6，x为星期日-六，m_e为英文的月份 m_es为英文月份简写
     * @param timestamp
     * @returns {string}
     */
    function format(format, timestamp){
        var timestamp = (timestamp || now()), date = typeof timestamp === 'object' ? timestamp : new Date(timestamp);
        var dayMap = ['日', '一', '二', '三', '四', '五', '六'];
        var monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return format.replace(/(yyyy|m_es|m_e|m{2}|m{1}|d{2}|d{1}|h{2}|h{1}|i{2}|i{1}|s{2}|s{1}|w|x)/ig, function(m0){
            switch(m0.toLowerCase()){
                case 'yyyy':
                    return date.getFullYear();
                case 'mm':
                    return pad2(date.getMonth()+1);
                case 'm':
                    return date.getMonth()+1;
                case 'm_e':
                    return monthEn[date.getMonth()];
                case 'm_es':
                    return monthEn[date.getMonth()].substr(0, 3);
                case 'dd':
                    return pad2(date.getDate());
                case 'd':
                    return date.getDate();
                case 'hh':
                    return pad2(date.getHours());
                case 'h':
                    return date.getHours();
                case 'ii':
                    return pad2(date.getMinutes());
                case 'i':
                    return date.getMinutes();
                case 'ss':
                    return pad2(date.getSeconds());
                case 's':
                    return date.getSeconds();
                case 'w':
                    return date.getDay();
                case 'x':
                    return dayMap[date.getDay()];
            }
        });
    }

});