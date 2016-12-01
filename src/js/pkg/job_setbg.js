/**
 * Created by lenovo on 2016/11/25.
 */
require(['src/js/pkg/setbg'],function(){
	$(document).ready(function(){
		var html = '<div class="tips" style="width:550px;height:100px;text-align: center;float: left">您已经发送过面试邀请！' +
			'<a href="javascript:void(0)" class="tipsBtn">提示按钮</a>' +
			'</div>';
		setbg({
			"width":500,
			"height":15,
			"html":html,
			"type":1,
			//"style":{
			//	"pop_header":"display: inline-block;width: 100%;height: 0;text-indent:10px;line-height: 36px;font-size: 0;margin: 0;background:#fff;position:relative",
			//	"close_btn":"display: block;width: 20px;height: 20px;background: url(../img/closeX.png);line-height: 100px;overflow: hidden;margin: 8px;position:absolute;top:-50px;right:-100px;"
			//},
			"closeCb":function(){
				//关闭按钮的回调函数
				console.log("关闭回调函数")
			}
		});

		$("body").on("click",".tipsBtn",function(e){
			popMethod.__resizePop({
				width:500,
				height:500
			});
			e.stopPropagation();
		});
		setbg({
			width:500,
			height:400,
			type:0,
			url:"/setbgdemo.html"
		})
	});
});