Namespace.register("extUI.dialog");
extUI.dialog.Dialog=function(searchStr)
{
	this.dialog=$(searchStr);
	this._initializeTab();
}
with(extUI.dialog.Dialog)
{
	
	prototype._initializeTab=function()
	{
    //change the action of the tabLinks
        var _this=this;
    	this.dialog.find("ul[class='tabLinks'] > li[for]").each(function()
    	{
        	var $listItem=$(this);
        	$listItem.click(function()
        	{
        		var targetTabId=$(this).attr('for');
        		_this.showTab(targetTabId);

        	});
        });
	}
    prototype.popup=function()
    {
        this.dialog.popup();
        this.dialog.popup("open");
    }
	prototype.open=function()//TODO: use $.mobile.fn.popup() to open a dialog
	{
		var marginTop=$(document).scrollTop()+200;
	    $("#box-details").css("margin-top",marginTop+"px");
	    this.dialog.toggle();
	}
	prototype.close=function()
	{
		this.dialog.toggle();
	}
	prototype.setTitle=function(str)
	{
		$("#dialog-title").text(str);
	}
    prototype.showTab=function(targetTabId)
    {
        var _this=this;
        _this.dialog.find("ul[class='tabLinks'] > li[for]").each(function()
        {
            if($(this).attr('for')==targetTabId)
            {
                $(this).attr('class','tabSelected');
            }else
            {
                $(this).removeAttr('class');
            }
                                                                     
        });
           
        _this.dialog.find("ul[class='tabContent'] > li[id]").each(function()
        {
            $(this).css('display','none');
        });
        _this.dialog.find("#"+targetTabId).css('display','block');
    }
}
extUI.dialog.Dialog.showTab=function(targetTabId)
{
	$("ul[class='tabLinks'] > li[for]").each(function()
	{
     	if($(this).attr('for')==targetTabId)
        {
            $(this).attr('class','tabSelected');
        }else
        {
            $(this).removeAttr('class');
        }
                                                                 
    });
       
    $("ul[class='tabContent'] > li[id]").each(function()
    {
        $(this).css('display','none');
    });
    $("#"+targetTabId).css('display','block');
}

