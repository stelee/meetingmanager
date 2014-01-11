Namespace.register("core.websea");

core.websea.config={
	pathProvider:function(path){
		return path;
	}
}

core.websea.define=function(fn){
  if("object"==typeof(fn)){
    return fn;
  }else if("function"==typeof(fn)){
    var module={
      exports:{}
    }
    fn(require,module.exports,module);
    return module.exports;
  }
}
core.websea.require=function(path,pathProvider){
	if('undefined'==typeof(pathProvider)){
		pathProvider=core.websea.config.pathProvider
	}
	var path=pathProvider(path);
	var ret;
	$.ajax(path,{
		async:false,
		dataType:"html",
		scriptCharset:"UTF-8",
		success:function(data)
		{
			ret=data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			ret=null;
		}
	})
	return eval(ret);
}
define=core.websea.define;
require=core.websea.require;

core.websea.config.pathProvider=function(path)
{
	if(!path.endsWith(".js")){
		path=path+".js";
	}
	return core.utils.getAbsolutePath(path);
}