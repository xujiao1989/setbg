define("setbg",[],function(){function i(i){o.__destroyPop(i),o.__initPop(i)}var t={hasheader:0,title:"提示",style:{pop_mask:"width: 100%;  height: 100%;  position: fixed;  top: 0;  left: 0;  z-index: 9996;  background-color: #000;  opacity: .3;  filter: Alpha(Opacity=30); display: block;",pop_container:"position: absolute;z-index: 9999;background: #fff;overflow:hidden",pop_header:"display: inline-block;width: 100%;height: 36px;text-indent:10px;line-height: 36px;font-size: 14px;font-weight: bold;color:#000;margin: 0;border-bottom:1px solid rgb(199, 199, 199);background:#f5f5f5;color:#000;",close_btn:"display: block;width: 20px;height: 20px;background: url(../img/close.png);line-height: 100px;overflow: hidden;margin: 8px;float: right;",pop_title:"margin:0"}},o={__initPop:function(i){var o=$.extend(!0,{},t,i),e=this.__initHtml(o);$("body").append(e),this.__resizePop(o),this.__eventInit(o)},__initHtml:function(i){var t=i.style,o='<div class="pop_mask" style="'+t.pop_mask+'"></div>',e=0==i.hasheader?'<div class="pop_header" style="'+t.pop_header+'"><a href="javascript:void(0)" class="close_pop_btn" style="'+t.close_btn+'">关闭</a><p class="pop_title" style="'+t.pop_title+'">'+i.title+"</p></div>":'<iframe scrolling="no" id="setbg_iframe" src="'+i.url+'" frameborder="0" ></iframe></div></div>',n='<div class="pop_container" style="'+t.pop_container+'">',p="0"==i.type?'<div class="pop_main_con" ><iframe scrolling="no" id="setbg_iframe" src="'+i.url+'" frameborder="0" ></iframe></div></div>':'<div class="pop_main_con" style="overflow: hidden">'+i.html+"</div></div>";return o+n+e+p},__showPop:function(){$(".pop_mask,.pop_container").css({display:"block"})},__closePop:function(i){var t=i.closeCb;$(".pop_mask,.pop_container").css({display:"none"}),t&&"[object Function]"===Object.prototype.toString.call(t)&&t()},__resizePop:function(i){var t=$("#setbg_iframe"),o=this,e=$(".pop_main_con"),n=$(".pop_container"),p=parseInt($(window).width())-100,s=parseInt($(window).height())-80,a=$(".pop_container .pop_header"),h=a.height();if("0"==t.length){var r=i&&i.width?i.width:0,d=i&&i.height?i.height:0,c=Math.max(e.width(),r),l=Math.max(e.height(),d);r=c>p?p:c,d=l>s?s:l;var _=r,f=parseInt(d)+h;return e.css({width:r,height:d}),n.css({width:_,height:f}),void o.__relocatePop(_,f)}t.on("load",function(){var a=i&&i.width?i.width:0,r=i&&i.height?i.height:0,d=t.contents().find("body").width(),c=t.contents().find("body").height();a=a>p?p:a,r=r>s?s:r,e.css({width:d,height:c,"min-width":a,"min-height":r,"max-width":parseInt(p)-100,"max-height":parseInt(s)-100,overflow:"hidden"}),$(this).css({width:"100%",height:"100%"});var l=a,_=parseInt(r)+h;e.css({width:a,height:r}),n.css({width:l,height:_}),o.__relocatePop(l,_)})},__relocatePop:function(i,t){var o=$(window).width(),e=$(window).height(),n=(e-t)/2,p=(o-i)/2;$(".pop_container").css({position:"fixed",top:n+"px",left:p+"px"})},__destroyPop:function(i){$(".pop_mask").remove(),$(".pop_container").remove()},__eventInit:function(i){var t=$(".close_pop_btn"),o=this;t.on("click",function(){o.__closePop(i)})}};window.setbg=i,window.popMethod=o});