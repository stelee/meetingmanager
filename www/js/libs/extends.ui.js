var UIExtendsClass=function()//namespace extends
{
    this.test=function(str){return str};
    this.bind=function(key,value)
    {
        var args;
        if(typeof(value)=='undefined')
        {
          var args=key;
          for(prop in args)
          {
              var idname=prop;
              var value=args[prop];
              $("#"+idname).html(value);
          }
        }else
        {
          $("#"+key).html(value);
        }
    }
    this.wrapWithRoundCornerBox=function(searchStr)
    {
        var htmlStr=$(searchStr).html();
        htmlStr="<div class='box'>"+
                            "<table style='width:100%;height:100%'>"+
                            "<tr>"+
                            "<td style='heigth:100%;text-align:center'"+
                            "valign='middle'>"+htmlStr+"</td>"+
                            "</tr></table></div>";
        $(searchStr).html(htmlStr);
    }

    this.addNavbar=function(searchStr,selectedIndex,path,triggerName,nowaitFlag)
    {
      if(isNull(nowaitFlag))
      {
        nowaitFlag=false;
      }

      if(navigator.appVersion.indexOf("Android 3.2")>=0 && nowaitFlag==false){
        var that=this;
        setTimeout(function() {
          that._addNavbar(searchStr,selectedIndex,path,triggerName);
        }, 1000);
      }else
      {
        this._addNavbar(searchStr,selectedIndex,path,triggerName);
      }
      
    }

    this._addNavbar=function(searchStr,selectedIndex,path,triggerName)
    {
        selectedIndex=(typeof(selectedIndex)=='undefined')?0:selectedIndex;
        path=(typeof(path)=='undefined')?"":path;
        triggerName=(typeof(triggerName)=='undefined')?"create":triggerName;
        var getItemsFn=__.footerItems||
        (function(path){
          var items=[
          {
                     url:path+"applications/main/index.html",
                     id:"home",
                     name:"Home",
          },
          {
                     url:path+"applications/inspections/index.html",
                     id:"inspection",
                     name:"Inspection"
          },
          {
                     url:path+"applications/follow-up/index.html",
                     id:"follow-up",
                     name:"Follow-up"
          },
          {
                     url:path+"applications/help/index.html",
                     id:"help",
                     name:"Help"
          },
          {
                     url:path+"applications/settings/index.html",
                     id:"settings",
                     name:"Settings"
          }
          ];
          return items;
        });
        var items=getItemsFn(path);

        if(__isDemoUser())
        {
          items[3].url=path+"applications/help/index.demo.html";
          items[3].name = "Contact";
          items[4].url=path+"applications/settings/index.demo.html";
        }else if(navigator.appVersion.indexOf("Android 3.2")>=0)
        {
          items[3].url=path+"applications/help/index.demo.html";
        }

        
        var footerStr="<div data-role='navbar' data-iconpos='top' class='navbar' data-grid='d'>" + "<ul>";
        
        var widthStr="";
        if(items.length==4)
        {
          widthStr=" style='width:25%' ";
        }

        

        for(var i=0;i<items.length;i++)
        {
            var item=items[i];
            var selectedStr="";
            if(i==selectedIndex){
                selectedStr="class='ui-btn-active ui-state-persist'";
            }
            footerStr=footerStr+"<li"+widthStr+"><a href='"+item.url+"' id='"+item.id+"' data-icon='custom' "+selectedStr+">"+item.name+"</a></li>"
        }
        footerStr=footerStr+"</ul>"+"</div>";
        $(searchStr).html(footerStr).trigger(triggerName);
        console.log("==============="+$(searchStr).html());
    }
    
}
UIExtendsClass.prototype.emptySelector=function(searchStr)
{
  var $select=$(searchStr);
  //remove all items
  $select.empty();
  $select.selectmenu("refresh");
  
  //$select.parent().find("span[class='ui-btn-text']").each(function(){$(this).text("select")});//jqm hacker

}
UIExtendsClass.prototype.bindRadioChoice=function(searchStr,list,keyName,valueName,extData)
{
  $container=$(searchStr);
  $container.html("");
  for(var i in list)
  {
    var item=list[i];
    var key=item[keyName];
    var value=item[valueName];
    var strBuilder=new core.utils.StrBuilder(
      '<input type="radio" name="assignment" self-name="Assignment" self-value="{value}" value="{key}" id="radio-choice-{key}" onChange="refreshOptionAssignment({key});"/><label for="radio-choice-{key}">{value}</label>'
      );
    strBuilder.bind("key",key);
    strBuilder.bind("value",value);
    var $input=$(strBuilder.buildString());
    this.addExtDataToElement($input,item,extData);
    $input.appendTo($container).checkboxradio();
    
  }
  $container.controlgroup();
}
UIExtendsClass.prototype.bindSelector=function(searchStr,list,keyName,valueName,extData,firstElement)
{
  firstElement=(!firstElement)?"Select":firstElement;

  this.emptySelector(searchStr);
  //add item
  var $select = $(searchStr);
  if(typeof($select.attr("multiple"))=='undefined')
  {
    $("<option value='select'>"+firstElement+"</option>").appendTo($select).trigger('create');
  }
  
  for(var i in list)
  {
    var item=list[i];
    var key=item[keyName];
    var value=item[valueName];
    var selectStr="";
    if(!isNull(item.selected))
    {
      
      if(item.selected==1)
      {
        selectedStr="selected";
      }
    }
    var $option=$("<option value='"+key+"' "+selectStr+">"+value+"</option>");
    this.addExtDataToElement($option,item,extData);
    $option.appendTo($select);
  }
  $select.selectmenu("refresh");
}
UIExtendsClass.prototype.addExtDataToElement=function(jqObject,item,extData)
{
  if(typeof(extData)=='object')
  {
    for(var i in extData)
    {
        jqObject.attr("self-"+extData[i],item[extData[i]]);
    }
  }
}
UIExtendsClass.prototype.resetHeight=function(searchStr,offset){
  if(!offset)
    offset=4
  var workspace_height=$(window).height()-$(searchStr).offset().top-$("div[data-role=footer]").height()-offset;
  $(searchStr).css("height",workspace_height+"px");
}
UIExtendsClass.prototype.createInputField=function(privateId,name,dataFormat,defaultValue,extData)
{
  var dataBind={
    privateId:privateId,
    name:name,
    datatype:_getDataType(dataFormat),
    value:nullSafe(defaultValue),
    extData:extData
  };
  var $fieldcontain=$("<div data-role='fieldcontain'></div>").trigger("create");
  $("<label for='input-{name}-{privateId}'>{name}</label>".bind(dataBind)).appendTo($fieldcontain).trigger("create");
  var inputHtmlStr="<input type='{datatype}' id='input-{name}-{privateId}' self-id='{privateId}' value='{value}' {extData}/>".bind(dataBind);
  $(inputHtmlStr).appendTo($fieldcontain).textinput();
  return $fieldcontain;
}
UIExtendsClass.prototype.refreshList=function(searchStr,entities,fnGenerateContent)
{
  $(searchStr).html("");
  for(var i in entities)
  {
    var entity=entities[i];
    var html="<li>"+fnGenerateContent(entity)+"</li>";
    $(html).appendTo(searchStr);
  }
  $(searchStr).listview("refresh");
}
UIExtendsClass.prototype.addList=function(searchStr,entities,fnGenerateContent)
{
  for(var i in entities)
  {
    var entity=entities[i];
    var html=fnGenerateContent(entity);
    if(html=="")
      continue;
    
    var html="<li>"+html+"</li>";
    $(html).appendTo(searchStr);
  }
  $(searchStr).listview("refresh");
}

UIExtendsClass.prototype.addToList=function(searchStr,entities,fnGenerateContent)
{
  for(var i in entities)
  {
    var entity=entities[i];
    var $li=$("<li>");
    var html=fnGenerateContent(entity,$li);
    if(html=="")
    {
      continue;
    }
    $li.html(html);
    $li.appendTo(searchStr);
  }
  $(searchStr).listview("refresh");
}
UIExtendsClass.prototype.addOneItemToList=function(searchStr,itemStr,autoTag)
{
  if(isNull(autoTag))
  {
    autoTag=true;
  }
  if(autoTag)
  {
    var html="<li>"+itemStr+"</li>";
  }else
  {
    var html=itemStr;
  }
  
  $(html).appendTo(searchStr);
  $(searchStr).listview("refresh");
}

UIExtendsClass.prototype.navBar=function(items)
{
  var navBarHTML='<div data-role="footer" \
  data-position="fixed" id="defaultFooter" \
  data-tap-toggle="false" \
  class="ui-footer-fixed slideup ui-footer ui-bar-a" \
  role="contentinfo"></div>';
  $("#defaultFooter").remove();
  $("#"+__currentPageId).append(navBarHTML);
  $("#defaultFooter").fixedtoolbar();
  $("#defaultFooter").fixedtoolbar("updatePagePadding");
  var footerStr="<div data-role='navbar' data-iconpos='top' class='navbar' data-grid='d'>" + "<ul>";

  var widthStr="";
  if(items.length==4)
  {
    widthStr=" style='width:25%' ";
  }
  for(var i=0;i<items.length;i++)
  {
      var item=items[i];
      var selectedStr="";
      if(__currentMenuIndex==i){
          selectedStr="class='ui-btn-active ui-state-persist'";
      }
      footerStr=footerStr+"<li"+widthStr+"><a href='"+core.utils.getAbsolutePath(item.url)+"' id='"+item.id+"' data-icon='custom' "+selectedStr+">"+item.name+"</a></li>"
  }
  footerStr=footerStr+"</ul>"+"</div>";
  $("#defaultFooter").html(footerStr).trigger("create");
}

UIExtendsClass.prototype.renderMenu=function()
{
  var menuBarHTML='<div data-role="panel" id="mainMenuPanel" data-position="left" data-display="reveal">\
  <ul data-role="listview">\
    <li>发起会议</li>\
    <li>会议管理</li>\
    <li>历史会议</li>\
    <li>帐号管理</li>\
  </ul>\
  </div>';
  $("#mainMenuPanel").remove();
  $("#"+__currentPageId).append(menuBarHTML);
  $("#mainMenuPanel").panel();

  $("#mainMenuPanel").trigger( "updatelayout" );
}

var _getDataType=function(dataFormat)
{
  dataFormatSet={
    'ANUM':'text',
    'NUM':'number',
    'DT':'date'
  }
  if(typeof(dataFormatSet[dataFormat])=='undefined')
  {
    return "text";
  }else
  {
    return dataFormatSet[dataFormat];
  }
}

var UIExtends=new UIExtendsClass();

