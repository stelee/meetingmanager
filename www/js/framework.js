
var __root;
var __currentPageId;
var __currentMenuIndex;


$(document).bind("mobileinit", function(){
                 $.mobile.defaultPageTransition="none";
                 $.support.cors=true;//jquery properties
                 $.mobile.allowCrossDomainPages=true;
                 $.mobile.popup.prototype.options.history=false;
                 $.mobile.fixedtoolbar.prototype.options.tapToggle=false
                 //$.mobile.fixedToolbars.touchToggleEnabled=false;

});
$(document).ready(
                  function(){
                    __root=this.location.href;
                    document.addEventListener("deviceready",onDeviceReady,true);
                  }
                  );

$(document).bind('pageshow',function(e)
                 {
                    try
                    {
                        beforeOnEnter(e)
                        var frameworkVersion=$(e.target).attr("self-fVersion");
                        var targetId=($(e.target).attr("id"));
                        __currentPageId=targetId;

                        if(frameworkVersion=="2"){//use the frame 2.0 engine
                            var url=location.href;
                            var path=url.substr(0,url.lastIndexOf("/"));
                            var page=url.substr(url.lastIndexOf("/")+1);
                            var url=path+"/js/"+page.substr(0,page.lastIndexOf("."))+".js";

                            var controller=require(url,function(path){return path});
                            $.mobile.activePage.controller=controller;
                            if(controller.onEnter){
                                controller.onEnter();
                            }
                        }else{

                            if(typeof(targetId)=='undefined')
                            {
                                onEnter(e);
                            }else{
                                var fnName=targetId.replace(/-/g,"_")+"_onEnter";
                                console.log(fnName);
                                if(typeof(window[fnName])=='function')
                                {
                                    window[fnName](e);
                                }else if(typeof(onEnter)=='function')
                                {
                                    onEnter(e);
                                }

                            }
                        }
                        
                        var menuIndex=($(e.target).attr("self-menuIndex"));
                            
                        if('undefined'==typeof(menuIndex))
                        {
                            __currentMenuIndex=-1;
                        }else{
                            __currentMenuIndex=menuIndex;
                        }
                        afterOnEnter(e);
                        
                    }catch(exception)
                    {
                        //console.error(exception);
                    }
                 });
$(document).bind('pageremove',function(e)
{
    try{
        if(timer){
            clearInterval(timer);
        }
        var targetId=($(e.target).attr("id"));
        if(typeof(targetId)=='undefined')
        {
            return;
        }
        var fnName=targetId.replace(/-/g,"_")+"_onRemove";
        console.log(fnName);
        if(typeof(window[fnName])=='function')
        {
            window[fnName](e);
        }
    }catch(error)
    {
        //console.error(error);
    }
});

var onRemove=function()
{
    //do nothing;
}

var onDeviceReady=function(){
    document.addEventListener("resume", onResume, false);
    __Configuration.deviceName=device.name;
    __Configuration.deviceCordova=device.cordova;
    __Configuration.devicePlatform=device.platform;
    __Configuration.deviceUUID=device.uuid;
    __Configuration.deviceVersion=device.version;
    document.addEventListener("backbutton",function(){},false);
}
function onResume() {
   
    if(!window.location.href.endsWith("www/index.html"))
    {//not the index.html
        //core.sync.fn.sync(console.log);
    } 
}

var takePicture=function(){
	navigator.camera.getPicture(takePictureSuccess,takePictureFailed,{
		quality:50,
		destinationType:Camera.DestinationType.DATA_URL});
}
var takePictureSuccess=function(imageData){
	var image=$("<img>");
	image.attr('src',"data:image/jpeg;base64,"+imageData);
	image.attr('width','60');
	image.css("margin",'2px');
	image.appendTo("#picturePanel");
}
var takePictureFailed=function(message){
	//setTimeout(function(){alert(message)},0);
}



var gapAlert=function(message)
{
    if(navigator.notification)
    {
        navigator.notification.alert(
                                 message,  // message
                                 function(){},         // callback
                                 '提示',            // title
                                 'OK'                  // buttonName
                                 );
    }else{
        alert(message);
    }
    
}
var gapConfirm=function(message,onOK,onNo)
{
    if(isNull(onNo))
    {
        onNo=function(){};
    }
    if(navigator.notification)
    {
        navigator.notification.confirm(message, function(button){
            console.log(button);
            if(button==1)
            {
                onOK();
            }else{
                onNo();
            }
        }, "确认", ["确认","取消"])
    }else{
        if(confirm(message)==true)
        {
            onOK();
        }else{
            onNo();
        }
    }
}
var toggleBtnText=function(btnObj,first,second)
{
    try
    {
        var jqmBtnObj=$(btnObj).parent();
        var jqmbtnSpan=$(jqmBtnObj.children("span:first")[0]);
        var jqmBtnTextSpan=$(jqmbtnSpan.children(".ui-btn-text")[0]);
        if(jqmBtnTextSpan.text()==first)
        {
            jqmBtnTextSpan.text(second);
            $(btnObj).text(second);
        }
        else
        {
            jqmBtnTextSpan.text(first);
            $(btnObj).text(first);
        }
        
    }
    catch(err)
    {
        console.log(err);
    }
    
}
//for debug in chrome
var _debugOn=function()
{
    window.FileUploadOptions=function(){};
    window.FileTransfer=function(){
        this.upload=function(image,url,fnSuccess){
            var r=new Object();
            r.response='{"result": true}';
            fnSuccess(r);
        }
    }

    window.resolveLocalFileSystemURI=function()
    {
        console.log("this is not supported in the platform");
    }
}
//_debugOn();
var ua=window.navigator.userAgent;
if(typeof(ua)!='undefined'&&ua.indexOf("Intel")>0)
{
    _debugOn();
}
var __initialPageControllers=function()
{
    if(arguments.length<2)
    {
        return;
    }
    var pageNamespace=arguments[0];

    pageNamespace.comp=new Object();

    for(var i=1;i<arguments.length;i++)
    {
        pageNamespace.comp[arguments[i]]=$("#"+arguments[i]);
    }
    pageNamespace.page=pageNamespace.comp;
    return pageNamespace;
}
var __isDemoUser=function()
{
    var username=Session().get("email");
    return username==__.demoUser
}
var __noSync=function()
{
    if(__isDemoUser())
        return true;
    else if(Session().settings("autosync")=="false")
        return true;
    else if(appDefaultStatus.type=="disconnected")
        return true;
    else
        return false;
}
var afterOnEnter=function(e)
{
   
}
var beforeOnEnter=function(e){
    
}
/*
var FileUploadOptions=function(){};
var FileTransfer=function(){
        this.upload=function(image,url,fnSuccess){
            var r=new Object();
            r.response='{"result": true}';
            fnSuccess(r);
        }
    }

var resolveLocalFileSystemURI=function()
    {
        console.log("this is not supported in the platform");
    }
    */

    