entity.Contact=function(){

}
_EXTEND(entity.Contact,entity.Base);

entity.Contact.prototype.createTable=function(forceFlag){
	var that=this;
	var sqls=new Array();
	if(forceFlag)
	{
		sqls.push("drop table tbl_contacts");
	}
	sqls.push("create table tbl_contacts (id INTEGER  PRIMARY KEY  AUTOINCREMENT  NOT NULL,name varchar,phoneNumber varchar)");	
	var db=new DBClient();
	if(forceFlag){
		db.update(sqls,function(error){that.error(error)},function(){that.trigger("create table")});
	}else{
		db.update("select 1 from tbl_contacts",
			function(error){
				var db2=new DBClient();
				db.update(sqls,function(error){that.error(error)},function(){that.trigger("create table")});
			},
			function(){
				that.trigger("create table");
			}
		);
	}
}
entity.Contact.prototype.list=function()
{
	var pinyin=require("support/pinyin");

	this.entities=[
	{name:'李阳',number:['15801590051','+15145503836']},
	{name:'陈宁',number:'13910061129'},
	{name:'王帅',number:'1234567'},
	{name:'张怡宁',number:'1234567'},
	{name:'赵小帅',number:'1234567'},
	{name:'韦小宝',number:'1234567'},
	{name:'乔峰',number:'1234567'},
	{name:'欧阳菲菲',number:'1234567'},
	{name:'龙少川',number:'1234567'},
	{name:'刘能',number:'1234567'},
	{name:'赵本山',number:'1234567'},
	{name:'刘德华',number:'1234567'},
	{name:'朱宁',number:'1234567'},
	{name:'章倩',number:'1234567'},
	{name:'王菲',number:'1234567'},
	{name:'84822927',number:'84822927'}
	]

	for(var i in this.entities){
		var entity=this.entities[i];
		var pinyinstring=pinyin(entity.name,{style:pinyin.STYLE_NORMAL}).join("");
		entity.pinyinstring=pinyinstring;
	}
	this.trigger("list");
}
entity.Contact.prototype.listWithDivider=function()
{
	//check if the contact list has already in the cache
	var cachedContactList=__.session.get("contactlist");
	if(cachedContactList){
		this.entities=cachedContactList;
		this.mergeWithNumberFromDatabus();
		this.trigger("listwithdivider");
		return;
	}

	//TODO: this will list all the contacts from the iphone contact
	var dividers=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
	'R','S','T','U','V','W','X','Y','Z','#']
	var data=new Array();
	for(var i in dividers){
		data.push(new Array());
	}
	var pinyin=require("support/pinyin");
    
    if(navigator.contacts){
        var options=new ContactFindOptions();
        options.filter='';
        options.multiple=true;
        var fields=["name","phoneNumbers"];
        var that=this;
        navigator.contacts.find(fields,
                            function(contacts){
                                var entities=new Array();
                                for(var i in contacts)
                                {
                                    var contact=contacts[i];
                                    var name=contact.name.formatted;
                                    var phoneNumbers=contact.phoneNumbers;
                                    if(phoneNumbers==null) continue;
                                    if(phoneNumbers.length==0) continue;
                                    if(phoneNumbers.length==1)
                                    {
                                        entities.push({name:name,number:phoneNumbers[0].value.replace(/(\-)|(\()|(\))|(\s)/g,"").replace("+","00")})
                                    }else
                                    {
                                        var numbers=new Array();
                                        for(var j in phoneNumbers){
                                            numbers.push(phoneNumbers[j].value.replace(/(\-)|(\()|(\))|(\s)/g,"").replace("+","00"));
                                        }
                                        entities.push({name:name,number:numbers});
                                    }
                                }

                                
                                for(var i in entities){
                                    var entity=entities[i];
                                    var pinyinstring=pinyin(entity.name,{style:pinyin.STYLE_NORMAL}).join("");
                                
                                    var firstletter=pinyinstring.charAt(0).toUpperCase()
                                    var indexer=dividers.indexOf(firstletter);
                                    if(indexer==-1){
                                        indexer=26;
                                    }
                                    entity.pinyinstring=pinyinstring;
                                    data[indexer].push(entity);
                                }
                                
                                that.entities=new Array();
                                for(var i in data){
                                    if(data[i].length==0){
                                        continue;
                                    }
                                    that.entities.push({
                                                   name:dividers[i],
                                                   type:"divider"
                                                   });
                                    for(var j in data[i]){
                                        that.entities.push(data[i][j]);
                                    }
                                }
                                //var contactNumber=__.parameters.fetch("dialNumber");
                                __.session.set("contactlist",that.entities);
                                that.mergeWithNumberFromDatabus();
                                that.uploadContact();
                                that.trigger("listwithdivider");
                                    
                            },
                            function(error){
                                gapAlert("无法访问通讯录，请在手机的设置->隐私->通讯录里面设置本程序对通讯录的访问权限")
                                console.error(error);
                            },options);
        return;
    }
    
	this.entities=[
	{name:'李阳',number:['15801590051','+15145503836']},
	{name:'陈宁',number:'13910061129'},
	{name:'王帅',number:'1234567'},
	{name:'张怡宁',number:'1234567'},
	{name:'赵小帅',number:'1234567'},
	{name:'韦小宝',number:'1234567'},
	{name:'乔峰',number:'1234567'},
	{name:'欧阳菲菲',number:'1234567'},
	{name:'龙少川',number:'1234567'},
	{name:'刘能',number:'1234567'},
	{name:'赵本山',number:'1234567'},
	{name:'刘德华',number:'1234567'},
	{name:'朱宁',number:'1234567'},
	{name:'章倩',number:'1234567'},
	{name:'王菲',number:'1234567'},
	{name:'84822927',number:'84822927'},
	{name:'Android',number:'84822927'}
	]
	for(var i in this.entities){
		var entity=this.entities[i];
		var pinyinstring=pinyin(entity.name,{style:pinyin.STYLE_NORMAL}).join("");
		var firstletter=pinyinstring.charAt(0).toUpperCase()
		var indexer=dividers.indexOf(firstletter);
		if(indexer==-1){
			indexer=26;
		}
		entity.pinyinstring=pinyinstring;
		data[indexer].push(entity);
	}
	this.entities=new Array();
	for(var i in data){
		if(data[i].length==0){
			continue;
		}
		this.entities.push({
			name:dividers[i],
			type:"divider"
		});
		for(var j in data[i]){
			this.entities.push(data[i][j]);
		}
	}
	//var contactNumber=__.parameters.fetch("dialNumber");
	__.session.set("contactlist",this.entities);
	this.mergeWithNumberFromDatabus();
	this.uploadContact();
	this.trigger("listwithdivider");
}
entity.Contact.prototype.uploadContact=function()
{
	var service=require("js/services/contactsync.service");
	service(this);
}
entity.Contact.prototype.mergeWithNumberFromDatabus=function()
{
	var contactNumber=__.parameters.fetch("dialNumber");
	if(!contactNumber){
		return;
	}
	var entry={
		name:contactNumber,
		number:contactNumber,
		pinyinstring:contactNumber,
		selected:true
	}
	for(var i in this.entities){
		var entity=this.entities[i];
		if(entity.number==entry.number)
		{
			entity.selected=true;
			return;
		}else if('object'== typeof(entity.number))
		{
			for(var i=0;i<entity.number.length;i++)
			{
				if(entity.number[i]==entry.number)
				{
					entity.selected=true;
					entity.selectedNumber=entry.number;
					return;
				}
			}
		}
	}
	this.entities.push(entry);
}