define(function(require,exports,module){
	var Service=function(contact)
	{
		var entities=contact.entities;
		var contact_array=new Array();
		for(var i=0;i<contact.entities.length;i++)
		{
			var entity=contact.entities[i];
			if(entity.type=='divider')
			{
				continue;
			}
			var entry={
				name:entity.name,
				phone:[]
			}
			if('object'== typeof(entity.number))
			{
				entry.phone=entity.number;
			}else
			{
				entry.phone.push(entity.number);
			}
			contact_array.push(entry);
		}
		var service=require("js/services/ext.baseService");
		service(service.METHODID.uploadContacts,[UUID(),contact_array],function(data){
			//do nothing
		})
	}
	module.exports=Service;
})