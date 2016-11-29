
/**
 * author:xujiao
 * time:2016-11-23
 * description:对线上的原有的setbg方法进行优化
 */

define([],function () {
    /**
     * defaults:默认参数
     *   @ type 弹窗类型 : 0 内嵌页面 , 1 dom （必填）
     *   @ url 嵌入页面的url : type为0时需要提供内嵌页面的URL（type=0时必填项）
     *   @ html 嵌入页面的dom结构：type为1时需要提供嵌入页面的dom（type=1时必填项）
     *   @ width 设置弹窗的宽度（必填项）
     *   @ height 设置弹窗的高度 （必填项）
     *   @ style 设置弹窗的基本样式（选填写）
     *      style{
     *        pop_mask://弹窗遮罩的样式
     *        pop_container：//弹窗的外框样式
     *        pop_title：//弹框的头部样式
     *        close_btn：//弹窗的关闭按钮样式
     *      }
     *   @ hasheader 是否显示头部栏 : 0 显示 1 不显示（选填  默认为0）
     *   @ title 标题 （选填  默认为“提示”）
     *   @ closeCb 函数类型，关闭按钮的回调函数
     *
     */
    var defaults = {
        hasheader:0,
        title:"提示",
        style: {
            pop_mask: "width: 100%;  height: 100%;  position: fixed;  top: 0;  left: 0;  z-index: 9996;  background-color: #000;  opacity: .3;  filter: Alpha(Opacity=30); display: block;",
            pop_container: "position: absolute;z-index: 9999;background: #fff;",
            pop_header: "display: inline-block;width: 100%;height: 36px;text-indent:10px;line-height: 36px;font-size: 14px;font-weight: bold;color:#000;margin: 0;border-bottom:1px solid rgb(199, 199, 199);background:#f5f5f5;color:#000;",
            close_btn: "display: block;width: 20px;height: 20px;background: url(../img/close.png);line-height: 100px;overflow: hidden;margin: 8px;float: right;",
            pop_title:"margin:0"
        }
    };
    var popMethod = {
        /**
         *
         * @__initPop:弹窗初始化
         */
        __initPop : function (opt) {
            /*
            * $.extend的第一个参数设置为true表示深度拓展，也就是对象中的对象也会被拓展
            *   @ 如果opt.style={pop_title:"xxx"}如果不设置第一个参数为true，那么其他的pop_header等
            *     样式属性都会被覆盖掉
            * */
            var option = $.extend(true,{},defaults,opt),
                html = this.__initHtml(option);
            $("body").append(html);
            this.__resizePop(option);
            this.__eventInit(option);
        },
        /**
         *
         * @__initHtml 初始化弹窗的dom结构
         */
        __initHtml:function(option){
            var style = option.style,
                popMask = '<div class="pop_mask" style="'+style.pop_mask+'"></div>',
                popHead = (option.hasheader == 0) ? '<div class="pop_header" style="'+style.pop_header+'">' +
                '<a href="javascript:void(0)" class="close_pop_btn" style="'+style.close_btn+'">关闭</a><p class="pop_title" style="'+style.pop_title+'">'+option.title+'</p>' +
                '</div>' : '<iframe scrolling="no" id="setbg_iframe" src="'+option.url+'" frameborder="0" ></iframe></div></div>',
                popContainer = '<div class="pop_container" style="'+style.pop_container+'">' +
                    '',
                popMain = (option.type == "0") ? '<div class="pop_main_con" style="overflow: hidden"><iframe scrolling="no" id="setbg_iframe" src="'+option.url+'" frameborder="0" ></iframe></div></div>':'<div class="pop_main_con" style="overflow: hidden">'+option.html+'</div></div>';
            return popMask+popContainer+popHead+popMain;
        },
        /**
         *
         * @__showPop:弹窗显示
         */
        __showPop : function () {
            $(".pop_mask,.pop_container").css({
                "display":"block"
            })
        },
        /**
         *
         * @__closePop:关闭弹窗
         */
        __closePop : function (option) {
            var closeCb = option.closeCb;
            $(".pop_mask,.pop_container").css({
                "display":"none"
            });
            //关闭弹窗的回调函数
            if(closeCb && (Object.prototype.toString.call(closeCb) === "[object Function]")){
                closeCb();
            }
        },
        /**
         *
         * @__resizePop:改变弹窗大小
         */
        __resizePop : function (option) {
            var iframe = $("#setbg_iframe"),
                self = this,
                popCon =  $(".pop_main_con"),
                winHeight = $(window).height();
            if(iframe.length == "0"){
                var width =  (option && option.width) ? option.width : 0,
                    height = (option && option.height) ? option.height :0,
                    conWidth = Math.max(width,popCon.width()),
                    conHeight = Math.max(height,popCon.height());
                $(".pop_container").css({
                    "width":conWidth+"px",
                    "height":(parseInt(conHeight)+40)+"px",
                    "max-height":(parseInt(winHeight)-30)+"px"
                });
                self.__relocatePop(conWidth,conHeight);
                return;
            }
            iframe.on("load",function(){
                var width = (option && option.width) ? option.width : iframe.contents().find("body").width(),
                    height =(option && option.height) ? option.height :iframe.contents().find("body").height(),
                    conWidth = width,
                    conHeight = parseInt(height) + 30;
                $(this).attr({
                    "width":width+"px",
                    "height":height+"px"
                });
                $(".pop_container").css({
                    "width":conWidth+"px",
                    "height":conHeight+"px",
                    "max-height":(parseInt(winHeight)-30)+"px"
                });
                self.__relocatePop(conWidth,conHeight);
            });
        },
        /**
         *
         * @__relocatePop:重新定位弹窗
         */
        __relocatePop : function (conWidth,conHeight) {
            var winWidth = $(window).width(),
                winHeight = $(window).height(),
                posTop = (winHeight - conHeight)/ 2,
                popLeft = (winWidth - conWidth)/2;
            $(".pop_container").css({
                position:"fixed",
                top:posTop+"px",
                left:popLeft+"px"
            });
        },
        /**
         * @__destroyPop:销毁实例
         */
        __destroyPop : function(option){
            $(".pop_mask").remove();
            $(".pop_container").remove();
        },
        __eventInit : function (option) {
            var closeBtn = $(".close_pop_btn"),
                self = this;
            closeBtn.on("click",function(){
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