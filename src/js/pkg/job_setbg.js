/**
 * Created by lenovo on 2016/11/25.
 */
require(['src/js/mod/setbg'],function(){
	$(document).ready(function(){
		setbg({
			width:500,
			type: 0,
			url:"http://10.252.160.187:8080/setbgdemo.html"
		});
		var html = '<div class="tips" style="width:550px;height: 100px; text-align: center;float: left">您已经发送过面试邀请！' +
			'<a href="javascript:void(0)" class="tipsBtn">提示按钮</a>' +
			'</div>';
		setbg({
			"width":500,
			"html":html,
			"type":1,
			"closeCb":function(){
				//关闭按钮的回调函数
				alert("关闭回调函数")
			}
		});

		$("body").on("click",".tipsBtn",function(e){
			popMethod.__resizePop({
				width:500,
				height:500
			});
			e.stopPropagation();
		})
	});

});