var RTEntityTest=function()
{
	_T.reset();
	var structureType=new entity.rt.structureType();
	_T.registerTestcase(function(){
		assertEqual("test the tablename of the structure type","tbl_structuretype",function(){return structureType.tableName})
	})
	_T.registerTestcase(function(context,next){
		structureType.on("find",function(){
			assertEqual("test the result of structureType.find",144,function(){return structureType.entity.structureTypeId})
			assertEqual("test the result.structureTypeName of structureType.find","Campus",function(){return structureType.entity.structureTypeName})
			next();
		}).find("structureTypeId=144");
	})

	_T.registerTestcase(function(context,next){
		structureType.on("buildstructure",function(){
			assertEqual("verify the structure",4,structureType.structures.length);
			assertEqual("verify the root",0,structureType.structures[0].parentStructureTypeId)
			assertEqual("verify the second",structureType.structures[0].structureTypeId,structureType.structures[1].parentStructureTypeId);
			assertEqual("verify the third",structureType.structures[1].structureTypeId,structureType.structures[2].parentStructureTypeId);
			assertEqual("verify the fourth",structureType.structures[2].structureTypeId,structureType.structures[3].parentStructureTypeId);
			next();
		}).buildStructure();
	});


	_T.run("test all entity of RT(rounds tracker)")
}