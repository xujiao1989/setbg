
/**
 * author:xujiao
 * time:2016-11-23
 * description:对线上的原有的setbg方法进行优化
 */

define(["src/js/mod/setbgdom"],function (setbgdom) {
    /**
     *
     * defaults:默认参数
     *   @ type 弹窗类型 : 0 内嵌页面 , 1 dom
     *   @ url 嵌入页面的url : type为0时需要提供内嵌页面的URL
     *   @ showtitle 是否显示头部栏 : 0 显示 1 不显示
     *   @ poptitle 标题
     */
    var defaults = {
        hasheader:0,
        title:"提示",
        style: {
            pop_mask: "width: 100%;  height: 100%;  position: fixed;  top: 0;  left: 0;  z-index: 9996;  background-color: #000;  opacity: .3;  filter: Alpha(Opacity=30); display: block;",
            pop_container: "position: absolute;z-index: 9999;background: #fff;",
            pop_title: "display: inline-block;width: 100%;height: 36px;text-indent:10px;line-height: 36px;font-size: 14px;font-weight: bold;color:#000;margin: 0;border-bottom:1px solid rgb(199, 199, 199);background:#f5f5f5;",
            close_btn: "display: block;width: 20px;height: 20px;background: url(../img/close.png);line-height: 100px;overflow: hidden;margin: 8px;float: right;"
        }
    };
    var popMethod = {
        /**
         *
         * @__initPop:弹窗初始化
         */
        __initPop : function (opt) {
            var option = $.extend({},defaults,opt,{resizePop:this.__resizePop}),
                template = _.template(setbgdom.popup),
                html = template(option);
            $("body").append(html);
            this.__resizePop(option);
            this.__eventInit(option);
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