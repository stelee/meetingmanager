var timer

var beforeOnEnter=function(){
	__.currentMenuItems=null;
}
var afterOnEnter=function(){
	if(__currentMenuIndex!=-1){
		var menuItems;
		if(__.currentMenuItems){
			menuItems=__.currentMenuItems;
		}else{
			menuItems=__.navigatorItem;
		}
		UIExtends.navBar(menuItems);
	}
	//bind the function
	$("[self-callback]")
	.unbind('click')
	.on("click",function(e){
		var func=$(e.target).attr("self-callback");
		if('function'==typeof($.mobile.activePage.controller[func])){
			$.mobile.activePage.controller[func](e);
		}else{
			alert("function "+func+" is not defined");
		}
	});
}

var setContactSelected=function(numbers){

}

var getSelectedNumber=function(contact){
	if('object' == typeof contact.number){
		return contact.selectedNumber;
	}else{
		return contact.number;
	}
}
var getContactNameByNumber=function(phonenumber){
	var contacts=__.session.getObject("contactlist",Array);
	for(var i in contacts){
		var contact=contacts[i];
		if(contact.type=='divider'){
			continue;
		}
		if("object"==typeof contact.number){
			if(contact.number.indexOf(phonenumber)>=0){
				return contact.name;
			}
		}else if(contact.number==phonenumber){
			return contact.name;
		}
	}
	return phonenumber;
}

var getResultTuple=function(entity){
	var ret=["unknown","unknown"];
	var phonenumber=entity.phone;
	var statusId=entity.status;
	var contacts=__.session.getObject("contactlist",Array);

	ret[0]=phonenumber;

	for(var i in contacts){
		var contact=contacts[i];
		if(contact.type=='divider'){
			continue;
		}
		if("object"==typeof contact.number){
			if(contact.number.indexOf(phonenumber)>=0){
				ret[0]=contact.name;
				break;
			}
		}else if(contact.number==phonenumber){
			ret[0]=contact.name;
			break;
		}
	}
	ret[1]=simpleMatch(statusId,{
		1:"onmeeting",
		2:"oncalling",
		3:"offline",
		4:"nocontact",
		"_":"unknown"
	});
	return ret;
}