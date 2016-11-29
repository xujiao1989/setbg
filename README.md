# setbg

> 徐姣  2016-11-26

## 简介

setbg是一款弹窗插件，兼容IE7+以及其他主流浏览器。

## setbg使用方法

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
        type:
        hasheader:
        title:"提示",
        url:"",
        html:"",
        width:"",
        height:"",
        style: {
            pop_mask: "",
            pop_container: "",
            pop_title: "",
            close_btn: ""
        },
        closeCb:function(){}
    };
   
    //使用方法
   
    var html = '<div class="tips" style="width:550px;height: 100px; text-align: center;float:left">'
    +'您已经发送过面试邀请！'
     +'<a href="javascript:void(0)" class="tipsBtn">提示按钮</a>'
     +'</div>';
		setbg({
			"width":500,
			"height":100,
			"html":html,
			"type":1,
			"closeCb":function(){
				//关闭按钮的回调函数
				console.log("关闭回调函数")
			}
		});

## setbg优化

+ 2016/11/26
  + 实现弹窗iframe+dom结构的兼容
  + 实现样式可拓展
  + 实现关闭函数可拓展（关闭回调）
  + 基于underscore的弹窗模板生成

+ 2016/11/28
  + 模板逻辑不多却要额外引入underscore，不划算，去模板，增加__initHtml方法初始化弹窗函数

+ 2016/11/29
  + 修改参数拓展方法，由var option = $.extend({},defaults,opt)改成var option = $.extend(true,{},defaults,opt),

           /*
            * $.extend的第一个参数设置为true表示深度拓展，也就是对象中的对象也会被拓展
            *   @ 如果opt.style={pop_title:"xxx"}如果不设置第一个参数为true，那么其他的pop_header等
            *     样式属性都会被覆盖掉
            * */

