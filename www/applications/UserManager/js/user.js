define(function(require,exports,module){
	var onEnter=function(){
		$.mobile.activePage.find(".loginMain").height(
			$(window).height()-15
			)
	}
	module.exports.onEnter=onEnter;
})