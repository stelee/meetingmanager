define(function(require,exports,module)
{
	var onEnter=function()
	{
		$.mobile.activePage.find(".loginMain").height(
			$(window).height()-15
			)
	}
	var confirm=function()
	{
		var name=_getVar("name");
		var phonenumber=_getVar("phonenumber");
		var service=require("js/services/contact.service");
		service(name,phonenumber,function(){
			history.back();
		})

	}
	var cancel=function()
	{
		history.back();
	}
	module.exports.onEnter=onEnter;
	module.exports.confirm=confirm;
	module.exports.cancel=cancel;
});