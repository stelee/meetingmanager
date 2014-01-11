var totalTestItems=0;
var passedTestItems=0;
var failedTestItems=0;
var _async=new Array();

function output(message){
    $("#logging").append("[unit test] "+message+"<br/>");
}
function startTest()
{
    var totalTestItems=0;
    var passedTestItems=0;
    var failedTestItems=0;
    output("===============Test starts=============");
    var _async=new Array();
}
function expected(description,expectedResult)//this is used at the beginning,before any invoke of the async code
{
    var asyncItem={"description":description,"expectedResult":expectedResult,"result":null};
    _async.push(asyncItem);
}
function result(index,result)//this is used inside the call back function of async code
{
    _async[index]["result"]=result;
}

function endTest(interval){
    interval=(typeof(interval)=='undefined')?0:interval;
    setTimeout(function()
               {
                for(var i=0;i<_async.length;i++)
                {
                    var desc=_async[i]["description"];
                    var expected=_async[i]["expectedResult"];
                    var result=_async[i]["result"];
                    var resultStr="unknow";
                    totalTestItems++;
                    if(result==null)
                    {
                        resultStr="still null";
                        failedTestItems++;
                    }else if(result==expected)
                    {
                        resultStr="success";
                        passedTestItems++;
                    }else
                    {
                        resultStr="failed(expected result is "+expected+",actual result is "+result+")";
                        failedTestItems++;
                    }
                    output(desc+"..."+resultStr);
               
                }
               
               output("===============Test ends=============");
               output(_visualize(totalTestItems)+"total test items:"+totalTestItems);
               output(_visualize(passedTestItems)+"passed test items:"+passedTestItems);
               output(_visualize(failedTestItems)+"failed test items:"+failedTestItems);
               },interval);
}

function _visualize(number)
{
    returnStr=""
    for(var i=0;i<number;i++){
        returnStr=returnStr+"[]";
    }
    return returnStr;
}

function assertEqual(description,expectedResult,func,args)
{
    totalTestItems++;
    var result=func.apply(this,args);
    var returnStr="result unknown";
    if(result==expectedResult){
        returnStr="success";
        passedTestItems++;
    }else{
        returnStr="failed(expected result is "+expectedResult+",actual result is "+result+")";
        failedTestItems++;
    }
    output(description+"..."+returnStr);
}
function assertOK(description,func,args){
    assertEqual(description,true,func,args);
}
function assertNotNull(description,obj)
{
    totalTestItems++;
    var returnStr="unknown";
    if(obj==null)
    {
        returnStr="failed(obj is null)";
        failedTestItems++;
    }else
    {
        returnStr="success";
        passedTestItems++;
    }
    output(description+"..."+returnStr);
}
function OK(description,func)
{
    totalTestItems++;
    try
    {
        func();
        passedTestItems++;
        output("OK test of "+description+"...success")
    }catch(err)
    {
        failedTestItems++;
        output("OK test of "+description+"...failed:"+err);
    }
}