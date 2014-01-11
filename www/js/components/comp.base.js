Namespace.register("comp");
comp.Base=function(){
}

comp.Listview=function(searchstr){
	this.$elem=$(searchstr);
	this.searchstr=searchstr;
}
comp.Listview.prototype.render=function(entities,listItemHandler){
	listItemHandler=listItemHandler || function(entity,$li){
		$li.html(entity);
	}

	this.$elem.html("");
	for(var i in entities)
	{
		var entity=entities[i];
		$li=$("<li>");
		listItemHandler(entity,$li);
		$li.appendTo(this.$elem);
	}
	this.$elem.listview("refresh");
}
comp.Listview.prototype.addListItem=function(listItemHandler){
	if(!listItemHandler)
		return;
	$li=$("<li>")
	listItemHandler($li);
	$li.appendTo(this.$elem);
	this.$elem.listview("refresh");
}

comp.SelectMenu=function(searchstr)
{
	this.$elem=$(searchstr);
	this.searchstr=searchstr;
}
comp.SelectMenu.prototype.load=function(entities,optionItemHandler)
{
	this.reset(false);
	if(this.$elem.attr("multiple")!="multiple"){
		var $option=$("<option>Select</option>");
		$option.appendTo(this.$elem);
	}
	

	for(var i in entities)
	{
		var entity=entities[i];
		var $option=$("<option>");
		optionItemHandler(entity,$option);
		$option.appendTo(this.$elem);
	}
	this.$elem.selectmenu("refresh");
}


comp.SelectMenu.prototype.simpleLoad=function(entities,valueTextHandler)
{
	this.load(entities,function(entity,$option){
		var pair=valueTextHandler(entity);
		$option.val(pair[0]);
		$option.text(pair[1]);
	});
}

comp.SelectMenu.prototype.reset=function(refreshFlag)
{
	refreshFlag=refreshFlag || true;
	this.$elem.empty();
	if(refreshFlag){
		this.$elem.selectmenu("refresh");
	}
}
comp.SelectMenu.prototype.replaceSelectionWithText=function(trigger)
{
	if(isNull(trigger))
	{
		trigger=true;
	}
	var $select=this.$elem;
	var $ui_select=$select.parents("div.ui-select:first");
	//reset the display
	$ui_select.show();
	$ui_select.parent().find("div.selectionResult").remove();

	//hide the selecor
	if($select.children().length==2) //only one option
	{
		$select.get(0).selectedIndex=1;
        $select.selectmenu("refresh");
        if(trigger){
        	$select.trigger('change');
        }
        

		$ui_select.hide();
		$ui_select.parent().append('<div class="selectionResult">'
			+$select.children("option:selected").text()+
			'</div>');
	}

}
comp.SelectMenu.prototype.hasOneOption=function()
{
	var $select=this.$elem;
	return $select.children().length<=2;
}
comp.SelectMenu.prototype.hasValue=function(){
	var $select=this.$elem;
	return ($select.val()!="" && $select.val()!="Select")
}
comp.SelectMenu.prototype.autoSelect=function(value)
{
	var $select=this.$elem;
	var val;
	if("function"==typeof value)
	{
		val=value($select);
	}else
	{
		val=value;
	}
	$select.val(val);
	$select.selectmenu("refresh");
	$select.trigger('change');
}
comp.InputField=function(searchstr)
{
	this.$elem=$(searchstr);
	this.searchstr=searchstr;
}

comp.InputField.prototype.create=function(id,fieldName,format,value,extData)
{
	var $input=UIExtends.createInputField(id,fieldName+":",format,value,extData);
	this.$elem=$input;
}
comp.InputField.prototype.appendTo=function(parent)
{
	this.$elem.appendTo(parent);
}



