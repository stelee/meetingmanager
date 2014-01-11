define(function(require,exports,module){
	var resetElementTop=function(pageId,elementSearchStr,offset){
		var h=$("#"+pageId+" div[data-role=header]").height();
		if(!offset){
			offset=55;
		}
		$(elementSearchStr).css("margin-top",(h-offset)+"px")
	}
	var resetHeight=function(pageId,elementSearchStr,offset){
		if(!offset)
			offset=0;
		var height=$(window).height()
			- $("#"+pageId+" div[data-role=header]").height()
			- $("#"+pageId+" div[data-role=footer]").height()
			- offset;
		$(elementSearchStr).css("height",height+"px");
	}
	module.exports.resetElementTop=resetElementTop;
	module.exports.resetHeight=resetHeight;
})