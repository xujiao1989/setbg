define(function(require, exports, module) {

    var templates = {};
    templates["popup"] = '<style>*{padding: 0;margin: 0;}.pop_main_con{overflow: hidden;}</style><div  class="pop_mask" style="<%= style.pop_mask %>"></div><div  class="pop_container" style="<%= style.pop_container %>"><% if(hasheader == 0){ %><div class="pop_title" style="<%= style.pop_title %>"><a href="javascript:void(0)" class="close_pop_btn" style="<%= style.close_btn %>">关闭</a><p><%= title %></p></div><% } %><div class="pop_main_con" ><% if(type == 0){ %><iframe scrolling="no" id="setbg_iframe"  src="<%= url %>" frameborder="0" ></iframe><% }else if(type == 1){ %><%= html %><% } %></div></div>';
    return templates;

});
