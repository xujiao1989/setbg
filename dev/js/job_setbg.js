define('src/js/mod/setbgdom', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var templates = {};
    templates['popup'] = '<style>*{padding: 0;margin: 0;}.pop_main_con{overflow: hidden;}</style><div  class="pop_mask" style="<%= style.pop_mask %>"></div><div  class="pop_container" style="<%= style.pop_container %>"><% if(hasheader == 0){ %><div class="pop_title" style="<%= style.pop_title %>"><a href="javascript:void(0)" class="close_pop_btn" style="<%= style.close_btn %>">关闭</a><p><%= title %></p></div><% } %><div class="pop_main_con" ><% if(type == 0){ %><iframe scrolling="no" id="setbg_iframe"  src="<%= url %>" frameborder="0" ></iframe><% }else if(type == 1){ %><%= html %><% } %></div></div>';
    return templates;
});
define('src/js/mod/setbg', ['src/js/mod/setbgdom'], function (setbgdom) {
    var defaults = {
        hasheader: 0,
        title: '提示',
        style: {
            pop_mask: 'width: 100%;  height: 100%;  position: fixed;  top: 0;  left: 0;  z-index: 9996;  background-color: #000;  opacity: .3;  filter: Alpha(Opacity=30); display: block;',
            pop_container: 'position: absolute;z-index: 9999;background: #fff;',
            pop_title: 'display: inline-block;width: 100%;height: 36px;text-indent:10px;line-height: 36px;font-size: 14px;font-weight: bold;color:#000;margin: 0;border-bottom:1px solid rgb(199, 199, 199);background:#f5f5f5;',
            close_btn: 'display: block;width: 20px;height: 20px;background: url(../img/close.png);line-height: 100px;overflow: hidden;margin: 8px;float: right;'
        }
    };
    var popMethod = {
        __initPop: function (opt) {
            var option = $.extend({}, defaults, opt, { resizePop: this.__resizePop }), template = _.template(setbgdom.popup), html = template(option);
            $('body').append(html);
            this.__resizePop(option);
            this.__eventInit(option);
        },
        __showPop: function () {
            $('.pop_mask,.pop_container').css({ 'display': 'block' });
        },
        __closePop: function (option) {
            var closeCb = option.closeCb;
            $('.pop_mask,.pop_container').css({ 'display': 'none' });
            if (closeCb && Object.prototype.toString.call(closeCb) === '[object Function]') {
                closeCb();
            }
        },
        __resizePop: function (option) {
            var iframe = $('#setbg_iframe'), self = this, popCon = $('.pop_main_con'), winHeight = $(window).height();
            if (iframe.length == '0') {
                var width = option && option.width ? option.width : 0, height = option && option.height ? option.height : 0, conWidth = Math.max(width, popCon.width()), conHeight = Math.max(height, popCon.height());
                $('.pop_container').css({
                    'width': conWidth + 'px',
                    'height': parseInt(conHeight) + 40 + 'px',
                    'max-height': parseInt(winHeight) - 30 + 'px'
                });
                self.__relocatePop(conWidth, conHeight);
                return;
            }
            iframe.on('load', function () {
                var width = option && option.width ? option.width : iframe.contents().find('body').width(), height = option && option.height ? option.height : iframe.contents().find('body').height(), conWidth = width, conHeight = parseInt(height) + 30;
                $(this).attr({
                    'width': width + 'px',
                    'height': height + 'px'
                });
                $('.pop_container').css({
                    'width': conWidth + 'px',
                    'height': conHeight + 'px',
                    'max-height': parseInt(winHeight) - 30 + 'px'
                });
                self.__relocatePop(conWidth, conHeight);
            });
        },
        __relocatePop: function (conWidth, conHeight) {
            var winWidth = $(window).width(), winHeight = $(window).height(), posTop = (winHeight - conHeight) / 2, popLeft = (winWidth - conWidth) / 2;
            $('.pop_container').css({
                position: 'fixed',
                top: posTop + 'px',
                left: popLeft + 'px'
            });
        },
        __destroyPop: function (option) {
            $('.pop_mask').remove();
            $('.pop_container').remove();
        },
        __eventInit: function (option) {
            var closeBtn = $('.close_pop_btn'), self = this;
            closeBtn.on('click', function () {
                self.__closePop(option);
            });
        }
    };
    function setbg(opt) {
        popMethod.__destroyPop(opt);
        popMethod.__initPop(opt);
    }
    window.setbg = setbg;
    window.popMethod = popMethod;
});
require(['src/js/mod/setbg'], function () {
    $(document).ready(function () {
        setbg({
            width: 500,
            type: 0,
            url: 'http://10.252.160.187:8080/setbgdemo.html'
        });
        var html = '<div class="tips" style="width:550px;height: 100px; text-align: center;float: left">您已经发送过面试邀请\uFF01' + '<a href="javascript:void(0)" class="tipsBtn">提示按钮</a>' + '</div>';
        setbg({
            'width': 500,
            'html': html,
            'type': 1,
            'closeCb': function () {
                console.log('关闭回调函数');
            }
        });
        $('body').on('click', '.tipsBtn', function (e) {
            popMethod.__resizePop({
                width: 500,
                height: 500
            });
            e.stopPropagation();
        });
    });
});
define('job_setbg', ['src/js/mod/setbg'], function () {
    return;
});