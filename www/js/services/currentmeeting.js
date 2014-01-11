define(function(require,exports,module){
	var Service=function(){

	}
	_MIX(Service,core.utils.mixers.callbackable);
	Service.prototype.participants = function() {
		var list=[
			{id:1,name:"李恩泽",status:"onmeeting"},
			{id:2,name:"王一兴",status:"oncalling"},
			{id:3,name:"李响",status:"onmeeting"},
			{id:4,name:"张广军",status:"oncalling"},
			{id:5,name:"梁昌泰",status:"offline"},
			{id:6,name:"璀璨",status:"nocontact"}
		];
		this.participants=list;
		this.trigger("participants");
	};
	module.exports=Service;
})