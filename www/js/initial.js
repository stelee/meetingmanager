


var setMeta=function(name,content)
{
    document.write("<meta name='"+name+"' content='"+content+"'>");
}
var linkCSS=function(link)
{
    document.write("<link rel='stylesheet' href='"+link+"'/>");
}
var includeJS=function(src)
{
    document.write("<script charset='UTF-8' src='"+src+"'></script>");
}
var usePlugin=function(pluginName)
{
	includeJS("js/plugins/"+pluginName+".js");
	linkCSS("css/plugins/"+pluginName+".css");
}  
setMeta("viewport","width=device-width,initial-scale=1,user-scalable=no");
setMeta("apple-mobile-web-app-capable","yes");
setMeta("Content-Type","text/html; charset=UTF-8")
linkCSS("support/jquery.mobile-1.3.1.css");
linkCSS("css/theme/iphone/styles.css");
linkCSS("css/app.css");
includeJS("support/jquery.js");
includeJS("support/jquery.mobile-1.3.1.js");
if(window.navigator.platform!="Win32")
{
	includeJS("cordova.js");
}


includeJS("js/libs/core.namespace.js");
includeJS("js/libs/base.config.js");
includeJS("js/libs/core.session.js");
includeJS("js/framework.js");
includeJS("js/jquery-ext.js");
includeJS("js/libs/extends.ui.js");
includeJS("js/libs/core.utils.js");
includeJS("js/libs/core.database.js");
includeJS("js/libs/core.file.js");
includeJS("js/libs/core.sequence.js");
includeJS("js/libs/json2.js");
includeJS("js/libs/base64.js");
includeJS("js/libs/extends.dialog.js");
includeJS("js/models/base.data.js");
includeJS("js/models/core.entity.js");
includeJS("js/models/entity.contact.js");
includeJS("js/models/entity.appointment.js");
includeJS("js/components/comp.base.js");
includeJS("js/libs/core.websea.js");
includeJS("js/leesoft.js");
includeJS("js/md5.js");

