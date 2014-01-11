define(function(require,exports,module){
	var jsonService=function(url,parameter,onOK,onFailed){
		if('function'!=typeof(onFailed)){
			onFailed=function(err){
				//gapAlert("网络错误，请重试");
				console.error(err)
			}
		}
		console.log(JSON.stringify(parameter));
		$.ajax({
			url:url,
			data:JSON.stringify(parameter),
			dataType:'json',
			scriptCharset:"UTF-8",
			processData: false,
    		contentType: 'application/json',
    		type:'POST',
			success:function(data){
				onOK(data);
			},
			error:function(jqXHR,textStatus){
				onFailed({
					jqXHR:jqXHR,
					textStatus:textStatus
				});
			},
			timeout: 10000
		});
	}
	module.exports.jsonService=jsonService;
})