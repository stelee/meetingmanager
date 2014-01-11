includeJS("js/jsunit/framework.js");
includeJS("js/jsunit/test.libs.core.utils.js");
includeJS("js/jsunit/test.sql.js");
includeJS("js/jsunit/test.rt.js");
var testSuit1=function()
{
	jsunit.framework.reset();

	jsunit.framework.registerTestcase(function(context,next){
		setTimeout(function(){
			assertEqual("assertEqual pass 2",1,function(){return 1})
			next();
		},10000);
	})
	jsunit.framework.registerTestcase(function(){
		assertEqual("assertEqual pass",1,function(){return 1})
	});
	jsunit.framework.registerTestcase(function(){
		assertEqual("assertEqual failed",1,function(){return 2})
	});
	jsunit.framework.registerTestcase(function(){
		assertOK("assertOK pass",function(){return true})
	});
	jsunit.framework.registerTestcase(function(){
		assertOK("assertOK failed",function(){return false})
	});
	jsunit.framework.registerTestcase(function(){
		assertNotNull("assertNotNull pass",function(){return 1})
	});
	jsunit.framework.registerTestcase(function(){
		assertNotNull("assertNotNull failed",null)
	});
	jsunit.framework.registerTestcase(function(){
		OK("OK pass",function(){return null});
	});
	jsunit.framework.registerTestcase(function(){
		OK("OK failed",function(){unknown.invoke()})
	});

	jsunit.framework.run("test suit 1");
}
