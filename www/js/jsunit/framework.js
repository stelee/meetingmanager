Namespace.register("jsunit.framework");

jsunit.framework.totalTestItems=0;
jsunit.framework.passedTestItems=0;
jsunit.framework.failedTestItems=0;
jsunit.framework._async=new Array();
jsunit.framework._msg=new Array();
jsunit.framework._testcases=new Array();
jsunit.framework.context=new Object();

jsunit.framework.reset=function()
{
    jsunit.framework.totalTestItems=0;
    jsunit.framework.passedTestItems=0;
    jsunit.framework.failedTestItems=0;
    jsunit.framework._async=new Array();
    jsunit.framework._msg=new Array();
    jsunit.framework._testcases=new Array();
    jsunit.framework.context=new Object();
}

jsunit.framework.getReport=function()
{
    for(i in jsunit.framework._msg)
    {
        console.log(jsunit.framework._msg[i]);
    }
}
jsunit.framework.output=function(state,message)
{
    if(arguments.length==1)
    {
         jsunit.framework._msg.push(arguments[0]);
    }else
    {
        jsunit.framework._msg.push("[  "+state+"] "+message);
    }
    
}
jsunit.framework.oFailed=function(message)
{
    jsunit.framework.output(" Failed",message);
}
jsunit.framework.oSuccess=function(message)
{
    jsunit.framework.output("Success",message);
}
jsunit.framework.registerTestcase=function(fn)
{
    jsunit.framework._testcases.push(fn);
}
jsunit.framework.run=function(message,next)
{
    jsunit.framework._msg.push("[Start  ]"+message);
    jsunit.framework._exec(0,message);
}
jsunit.framework._exec=function(currentIndex,message,next)
{
    if(currentIndex==jsunit.framework._testcases.length)
    {
        jsunit.framework._msg.push("[End  ]"+message);
        jsunit.framework.endTest(next);
        return;
    }
    var testcase=jsunit.framework._testcases[currentIndex];
    currentIndex++;
    if(testcase.length>=2)
    {
        testcase(jsunit.framework.context,function(){
            jsunit.framework._exec(currentIndex,message,next);
        });
    }else
    {
        testcase(jsunit.framework.context);
        jsunit.framework._exec(currentIndex,message);
    }
    
}

jsunit.framework.endTest=function(next){
    with(jsunit.framework)
    {
        output(visualize(totalTestItems)+"total test items:"+totalTestItems);
        output(visualize(passedTestItems)+"passed test items:"+passedTestItems);
        output(visualize(failedTestItems)+"failed test items:"+failedTestItems);
        if(next){
            next();
        }
    }
    
}

jsunit.framework.visualize=function(number)
{
    returnStr=""
    for(var i=0;i<number;i++){
        returnStr=returnStr+"[]";
    }
    return returnStr;
}

jsunit.framework.assertEqual=function(description,expectedResult,func,args)
{
    jsunit.framework.totalTestItems++;
    var result;
    if(typeof func=="function")
    {
        result=func.apply(this,args);
    }else
    {
        result=func;
    }
    
    var returnStr="result unknown";
    if(result==expectedResult){
        returnStr="success";
        jsunit.framework.passedTestItems++;
        jsunit.framework.oSuccess(description+"..."+returnStr);
    }else{
        returnStr="failed(expected result is "+expectedResult+",actual result is "+result+")";
        jsunit.framework.failedTestItems++;
        jsunit.framework.oFailed(description+"..."+returnStr);
    }
}



jsunit.framework.assertOK=function(description,func,args){
    jsunit.framework.assertEqual(description,true,func,args);
}


jsunit.framework.assertNotNull=function(description,obj)
{
    jsunit.framework.totalTestItems++;
    var returnStr="unknown";
    if(obj==null)
    {
        returnStr="failed(obj is null)";
        jsunit.framework.failedTestItems++;
        jsunit.framework.oSuccess(description+"..."+returnStr);
    }else
    {
        returnStr="success";
        jsunit.framework.passedTestItems++;
        jsunit.framework.oFailed(description+"..."+returnStr);
    }
    
}
jsunit.framework.OK=function(description,func)
{
    jsunit.framework.totalTestItems++;
    try
    {
        func();
        jsunit.framework.passedTestItems++;
        jsunit.framework.oSuccess("OK test of "+description+"...success")
    }catch(err)
    {
        jsunit.framework.failedTestItems++;
        jsunit.framework.oFailed("OK test of "+description+"...failed:"+err);
    }
}
jsunit.framework.parseUITestCase=function(testcase)
{
    try{
        var tc=new Object();
        var indexOfSpace=testcase.indexOf(" ");
        tc.todo=testcase.slice(0,indexOfSpace);
        testcase=testcase.slice(indexOfSpace+1);
        indexOfSpace=testcase.indexOf(" ");
        tc.which=testcase.slice(0,indexOfSpace);
        tc.what=testcase.slice(indexOfSpace+1);
        return tc;
    }catch(error)
    {
        console.error("not a valid test case");
        return null;
    }
    

}

//shortcuts
var assertEqual=jsunit.framework.assertEqual;
var assertOK=jsunit.framework.assertOK;
var assertNotNull=jsunit.framework.assertNotNull;
var OK=jsunit.framework.OK;
var _T=jsunit.framework;
var _R=_T.getReport;



// with(jsunit.framework)
// {
//     testsuite._testsuites=new Array();
//     testsuite.register=function(fn)
//     {
//         testsuite._testsuites.push(fn);
//     }
//     testsuite.run=function()
//     {
        
//     }
// }
