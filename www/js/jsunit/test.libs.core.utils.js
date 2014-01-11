var utilsTest=function(){
	_T.reset();
	_T.registerTestcase(function(){
		var sql="INSERT INTO 'tbl_global_item_spv_mapping' ('spvItemId','spvId','facilityId','ddlFlag','ddlDate')VALUES('207','101','76','E','1354118651')";
		assertEqual("get the ddl flag","E",core.utils.getDDLFlag,[sql]);
	});
	_T.registerTestcase(function(){
		var sql="INSERT INTO 'tbl_global_item_spv_mapping' ('spvItemId','spvId','facilityId','ddlDate','ddlFlag')VALUES('207','101','76','1354118651','D')";
		assertEqual("get the ddl flag which is at the end of the sql statement","D",core.utils.getDDLFlag,[sql]);
	});
	_T.registerTestcase(function(){
		var sql="INSERT INTO 'tbl_global_item_spv_mapping' ('spvItemId','spvId','facilityId','ddlDate')VALUES('207','101','76','1354118651')";
		assertEqual("get the ddl flag which doesn't exist",null,core.utils.getDDLFlag,[sql]);
	})
	_T.registerTestcase(function(){
		var sql="INSERT INTO 'tbl_global_item_spv_mapping' ('spvItemId','spvId','facilityId','ddlDate','ddlFlag')VALUES('207','101','76','1354118651')";
		assertEqual("get the ddl flag which doesn't exist(value doesn't match the field)",null,core.utils.getDDLFlag,[sql]);
	})

	_T.run("test for libs/core.utils.js");
}
var arraySequencingExecutionTest=function()
{
	_T.reset();
	_T.registerTestcase(function(context,testNext){
	var array=["1","2","3","4"];
	array.eachWillRun(function(item,next){
		setTimeout(function(){console.log(item);next()},5000);
	}).done(function(){
		console.log("I am done here");
		testNext();
		OK("OK test finished",function(){})
	}).run();
	})
	_T.run("test the array sequencingly execution");
}
var parseBooleanTest=function()
{
	_T.reset();
	_T.registerTestcase(function(){
		assertEqual("convert from boolean,true",true,parseBoolean,[true])
	})
	_T.registerTestcase(function(){
		assertEqual("convert from boolean,false",false,parseBoolean,[false])
	})
	_T.registerTestcase(function(){
		assertEqual("convert from string,true",true,parseBoolean,["true"])
	})
	_T.registerTestcase(function(){
		assertEqual("convert from string,false",false,parseBoolean,["false"])
	})
	_T.registerTestcase(function(){
		assertEqual("convert from string,false",false,parseBoolean,["anything"])
	})
	_T.run("test parse boolean function")
}



