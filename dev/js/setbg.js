define('setbg', [], function () {
    var defaults = {
        width: 100,
        height: 100,
        hasheader: 0,
        title: '提示',
        style: {
            pop_mask: 'width: 100%;  height: 100%;  position: fixed;  top: 0;  left: 0;  z-index: 9996;  background-color: #000;  opacity: .3;  filter: Alpha(Opacity=30); display: block;',
            pop_container: 'position: absolute;z-index: 9999;background: #fff;overflow:hidden',
            pop_header: 'display: inline-block;width: 100%;height: 36px;text-indent:10px;line-height: 36px;font-size: 14px;font-weight: bold;color:#000;margin: 0;border-bottom:1px solid rgb(199, 199, 199);background:#f5f5f5;color:#000;',
            close_btn: 'display: block;width: 20px;height: 20px;background: url(../img/close.png);line-height: 100px;overflow: hidden;margin: 8px;float: right;',
            pop_title: 'margin:0'
        }
    };
    var popMethod = {
        __initPop: function (opt) {
            var option = $.extend(true, {}, defaults, opt), html = this.__initHtml(option);
            $('body').append(html);
            this.__initPopSize(option);
            this.__eventInit(option);
        },
        __initHtml: function (option) {
            var style = option.style, popMask = '<div class="pop_mask" style="' + style.pop_mask + '"></div>', popHead = option.hasheader == 0 ? '<div class="pop_header" style="' + style.pop_header + '">' + '<a href="javascript:void(0)" class="close_pop_btn" style="' + style.close_btn + '">关闭</a><p class="pop_title" style="' + style.pop_title + '">' + option.title + '</p>' + '</div>' : '<iframe scrolling="no" id="setbg_iframe" src="' + option.url + '" frameborder="0" ></iframe></div></div>', popContainer = '<div class="pop_container" style="' + style.pop_container + '">' + '', popMain = option.type == '0' ? '<div class="pop_main_con" ><iframe scrolling="no" id="setbg_iframe" src="' + option.url + '" frameborder="0" ></iframe></div></div>' : '<div class="pop_main_con" style="overflow: hidden">' + option.html + '</div></div>';
            return popMask + popContainer + popHead + popMain;
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
        __resizePop: function (opt) {
            var self = this, _header = $('.pop_container .pop_header'), popCon = $('.pop_main_con'), popContainer = $('.pop_container'), _headerHeight = _header.height(), width = opt.width, height = opt.height, minWidth = opt.type == 0 ? opt.minWidth : '', minHeight = opt.type == 0 ? opt.minHeight : '', winWidth = parseInt($(window).width()) - 100, winHeight = parseInt($(window).height()) - 100;
            var popContainWidth = popCon.width(), popContainHeight = parseInt(_headerHeight) + height;
            popCon.css({
                'width': width + 'px',
                'height': height + 'px',
                'min-width': minWidth + 'px',
                'min-height': minHeight + 'px',
                'max-width': winWidth + 'px',
                'max-height': winHeight + 'px',
                'overflow': 'hidden'
            });
            popContainer.css({
                'width': popContainWidth + 'px',
                'height': popContainHeight + 'px'
            });
            self.__relocatePop(popContainWidth, popContainHeight);
        },
        __initPopSize: function (option) {
            var iframe = $('#setbg_iframe'), self = this, popCon = $('.pop_main_con'), userHeight = option.height, userWidth = option.width;
            var optInit = {
                'width': userWidth,
                'height': userHeight,
                'type': 1
            };
            debugger;
            self.__resizePop(optInit);
            if (iframe.length == '0') {
                var max_width = Math.max(popCon.width(), userWidth), max_height = Math.max(popCon.height(), userHeight);
                var opt1 = {
                    'width': max_width,
                    'height': max_height,
                    'type': 1
                };
                self.__resizePop(opt1);
                return;
            }
            iframe.on('load', function () {
                var iframeWidth = iframe.contents().find('body').width(), iframeheight = iframe.contents().find('body').height();
                var optIframe = {
                    'width': iframeWidth,
                    'height': iframeheight,
                    'minWidth': userWidth,
                    'minHeight': userHeight,
                    'type': 0
                };
                self.__resizePop(optIframe);
                $(this).css({
                    'width': '100%',
                    'height': '100%'
                });
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