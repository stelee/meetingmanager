Namespace.register("core.entity");
core.entity.Entity=function(dataMap)
{
	for(prop in dataMap)
	{
		this[prop]=dataMap[prop]
	}
}
core.entity.Entity.prototype.merge=function(dataMap,forceFlag)
{
	var forceFlag=(typeof(forceFlag)=='undefined')? false:forceFlag;
	
	for(prop in dataMap)
	{
		if(forceFlag)
		{
			this[prop]=dataMap[prop]
		}else
		{
			if(typeof(this[prop])=='undefined')
			{
				this[prop]=dataMap[prop]
			}
		}
	}
}

core.entity.Entity.prototype.extProp=function()
{
	if(arguments.length==2)
	{
		this["_"+arguments[0]]=arguments[1];
	}else
	{
		return this["_"+arguments[0]];
	}
}

core.entity.Entity.prototype.tableName=function(tableName){
	if(typeof(tableName)=='undefined')
	{
		return this.__tableName;
	}
	else
	{
		this.__tableName=tableName;
	}

}
//
//{
//tableName:<tableName>,
//filterFields:[<filterField0>,<filterField1>,<filterField2>,<filterField3>,...]
//extFilters:{}
//}
//
core.entity.Entity.prototype.checkExist=function(config)
{
	var db=new DBClient();
	var entityInstance=this;
	if(typeof(config.tableName)!='undefined')
	{
		this.__tableName=config.tableName;
	}
	var _foundCB;
	var _notFoundCB;
	if(typeof(config.ifFound)=='function')
	{
		_foundCB=config.ifFound;
	}

	if(typeof(config.ifNotFound)=='function')
	{
		_notFoundCB=config.ifNotFound;
	}

	var sql="select * from {tableName} where 1=1".bind({tableName:this.__tableName});
	for(var i in config.filterFields)
	{
		sql=sql+" and "+config.filterFields[i]+"='"+this[config.filterFields[i]]+"'";
	}
	if(typeof(config.extFilters)=='string')
	{
		sql=sql+" and "+config.extFilters;
	}else
	{
		for(var key in config.extFilters)
		{
			sql=sql+" and "+key+"='"+config.extFilters[key]+"'";
		}
	}
	
	var db=new DBClient();
	db.select(sql,function(tx,rs)
	{
		if(rs.rows.length==0){
			_notFoundCB(entityInstance);
		}else
		{
			entityInstance.merge(rs.rows.item(0));
			_foundCB(entityInstance);
		}
	});
}
//this is used to generate the sql only
core.entity.Entity.prototype.getDeleteSql=function(config)
{
	if(!isNull(config.tableName))
	{
		this.__tableName=config.tableName;
	}
	var sql="delete from {tableName} where 1=1".bind({tableName:this.__tableName});
	for(var i in config.filterFields)
	{
		sql=sql+" and "+config.filterFields[i]+"='"+this[config.filterFields[i]]+"'";
	}
	if(typeof(config.extFilters)=='string')
	{
		sql=sql+" and "+config.extFilters;
	}else
	{
		for(var key in config.extFilters)
		{
			sql=sql+" and "+key+"='"+config.extFilters[key]+"'";
		}
	}
	return sql;
}
core.entity.Entity.prototype.getUpdateSql=function(tableName,fields,where)
{
	var setStr="";
	var sep="";
	for(i in fields)
	{
		setStr=setStr+sep+fields[i]+"='{"+fields[i].replace(/\'/g,"''")+"}'";
		sep=",";
	}
	var sql="UPDATE "+tableName+" set "+setStr+" where "+where;
	return sql.bind(this); 

}
core.entity.Entity.prototype.insertSql=function(tableName)
{
	if(!isNull(tableName))
	{
		this.__tableName=tableName;
	}

	if(typeof(this.tableName())=='undefined')
	{
		console.log("the tableName isn't set");
		return;
	}
	var fieldsStr="";
	var valuesStr="";
	var sep="";
	for(prop in this)
	{
		if(typeof(this[prop])!="function" && prop.indexOf("_")!=0)
		{
			
			fieldsStr=fieldsStr+sep+"'"+prop+"'";
			valuesStr=valuesStr+sep+"'"+sqlSafe(this[prop])+"'";
			sep=",";
			
		}
	}
	var sql="INSERT INTO {tableName} ({fieldsStr})VALUES({valuesStr})".bind({
		tableName:this.tableName(),
		fieldsStr:fieldsStr,
		valuesStr:valuesStr
	});
	return sql;
}
core.entity.Entity.prototype.save=function(config)
{
	if(typeof(config.tableName)!='undefined')
	{
		this.__tableName=config.tableName;
	}
	var _onSuccess;
	var _onFailed;
	if(typeof(config.onSuccess)=='function')
	{
		_onSuccess=config.onSuccess;
	}

	if(typeof(config.onFailed)=='function')
	{
		_onFailed=config.onFailed;
	}


	if(typeof(this.tableName)=='undefined')
	{
		console.log("the tableName isn't set");
		return;
	}
	var fieldsStr="";
	var valuesStr="";
	var sep="";

	for(prop in this)
	{
		if(typeof(this[prop])!="function" && prop.indexOf("_")!=0)
		{
			
			fieldsStr=fieldsStr+sep+"'"+prop+"'";
			valuesStr=valuesStr+sep+"'"+this[prop]+"'";
			sep=",";
			
		}
	}
	var sql="INSERT INTO {tableName} ({fieldsStr})VALUES({valuesStr})".bind({
		tableName:this.tableName(),
		fieldsStr:fieldsStr,
		valuesStr:valuesStr
	});
	var db=new DBClient();
	console.log(sql);
	db.select(sql,function(tx,rs)
		{
			_onSuccess(rs.insertId);
		},_onFailed);
}
core.entity.Entity.getEntity=function(tableName,where,callBack)
{
	var sql;
	var _callBack;
	if(arguments.length==3)
	{
		var whereStr="1=1";
		for(prop in where)
		{
			whereStr=whereStr+" and "+prop+"='"+where[prop]+"'";
		}
		sql="select * from "+tableName+" where "+whereStr;
		_callBack=callBack;
		console.log(sql);
	}else if(arguments.length==2)
	{
		sql=arguments[0];
		_callBack=arguments[1];
	}else
	{
		return;
	}

	var db=new DBClient();

	db.select(sql,function(tx,rs)
	{
		if(rs.rows.length==0)
		{
			console.log("no entity found");
			_callBack();
			return;
		}
		var entity=new core.entity.Entity(rs.rows.item(0));
		console.log(entity);
		_callBack(entity);
	});
}

core.entity.EntityList=function(results)
{
	this.list=new Array();
	var len=results.rows.length;
	for(var i=0;i<len;i++)
	{
		var entity=new core.entity.Entity(results.rows.item(i));
		this.list.push(entity);
	}
}
core.entity.EntityList.prototype.getList=function()
{
	return this.list;
}
core.entity.EntityList.getListFromRecordset=function(rs)
{
	return (new core.entity.EntityList(rs)).getList();
}
core.entity.EntityList.findBySql=function(sql,onSuccess,onFailed)
{
	var db=new DBClient();
	db.select(sql,function(tx,rs)
	{
		var entities=new core.entity.EntityList(rs);
		onSuccess(entities.getList());
	},onFailed);
}
core.entity.EntityList.find=function(fields,from,where,callBack)
{
	
	var sql;
	var _callBack;
	if( arguments.length==2){
		sql= arguments[0];
		_callBack= arguments[1];
	}
	else if(arguments.length==3)
	{
		sql="select "+arguments[0]+" from "+arguments[1];
		_callBack=arguments[2];
	}	
	else{
		if(from.indexOf(" where ")>=0)
		{
			sql="select "+fields+" from "+from+" and "+where;
		}
		else
		{
			sql="select "+fields+" from "+from+" where "+where;
		}
		
		_callBack=callBack;
	}
	console.log(sql);
	var db=new DBClient();
	db.select(sql,function(tx,rs)
	{
		var entities=new core.entity.EntityList(rs);
		_callBack(entities.getList());
	},function(error){
		console.error("error on"+sql);
		console.log(error);
	});
}
core.entity.EntityList.iterate=function(fields,from,where,callBack)
{
	var sql;
	var _callBack;
	if( arguments.length==2){
		sql= arguments[0];
		_callBack= arguments[1];
	}
	else{
		sql="select "+fields+" from "+from+" where "+where;
		_callBack=callBack;
	}
	var db=new DBClient();
	db.select(sql,function(tx,rs)
	{
		var entities=new core.entity.EntityList(rs);
		var list=entities.getList();
		for(i in list)
		{
			_callBack(list[i]);
		}
		_callBack();
	});
}