
(function(){
		window['DOM'] = {};
	/**
	 * @argument
	 * 	other 
	 * @description 
	 * 	改方法用户确定当期浏览器是否于整个库兼容
	 * @return boolean
	 * 	true 和浏览器兼容 false反之
	 * */
	function isCompatible(other){
		if(other==false
			|| !Array.prototype.push
			|| !Object.hasOwnProperty
			|| !document.createElement
			|| !document.getElementsByTagName){
				return false;
		}
		return true;
	}
	window['DOM']['isCompatible'] = isCompatible;
	/**
	 * @description
	 * 	该方法给定页面元素的id放回该节点对象
	 * @return
	 *  当@argument只有一个的时候返回节点对象;
	 * 	当@argument有多个的时候返回一节点对象数组；
	 * */
	function $(){
		var elements = new Array();
		for(var i = 0 ;i < arguments.length;i++){
			var element = arguments[i];
			//如果该参数是一个字符串那假设它是一个id;
			if(typeof element=='string'){
				element = document.getElementById(element);
			}
			//如果只有一个参数，那么则返回这个元素；
			if(arguments.length==1){
				return element;		
			}
			elements.push(element);
		}
		return elements;
	}
	window['DOM']['$'] = $;
	function addEvent(node,type,listener){
		//不兼容的时候返回false
		if(!isCompatible()){return false;}
		if(!(node=$(node))){return false;}
		if(node.addEventListener){
			//W3C方法
			node.addEventListener(type,listener,false);
			return true;
		}else if(node.attachEvent){
			//MSIE方法
			node['e'+type+listener] = listener;
			node[type+listener] = function(){
				node['e'+type+listener](window.event);
			};
			node.attachEvent('on'+type,node[type+listener]);
			return true;
		}
		return false;
	}
	window['DOM']['addEvent'] = addEvent;
	function removeEvent(node,type,listener){
		if(!(node=$(node))){return false;};
		if(node.removeEventListener){
			node.removeEventListener(type,listener,false);
			return true;
		}else if(node.detachEvent){
			node.detachEvent('on'+type,node[type+listener]);
			node[type+listener] = null;
			return true;
		}
		return false;
	}
	window['DOM']['removeEvent'] = removeEvent;
	//获得一组具有相同标签的元素
	function getElementsByClassName(className,tag,parent){
		parent = parent || document;
		if(!(parent=$(parent))){
			return false;
		}
		//查找所有匹配的标签 是否支持parent.all方法 
		var allTags = (tag == "*" && parent.all ) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = new Array();
		//创建一个正则表达式，来判断className是否正确
		className = className.replace(/\-/g,"\\-");//  //直接的正则表达式；g表示全局；将-都体会成-
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");	//去掉首尾空格	
		var element;
		for(var i = 0 ;i < allTags.length;i++){
			element = allTags[i];
			if(regex.test(element.className)){
				matchingElements.push(element);
			}
		}
		//返回任何匹配的元素
		return matchingElements;
	}
	/**
	 * var elements = DOM.getElementsByClassName("testClass",'*',document);
		//这个方法可以获得两个tag之间的节点对象
		var fount = DOM.getElementsByClassName("testClass",'div',DOM.$(testDIV));
	 * */
	window['DOM']['getElementsByClassName'] = getElementsByClassName;
	//操作dom的可见性
	function toggleDisplay(node,value){
		if(!(node=$(node))){
			return false;
		};
		if(node.style.display != 'node'){
			node.style.display = 'none';			
		} else {
			node.style.display = value || '';
		}	
		return true;
	}
	window['DOM']['toggleDisplay'] = toggleDisplay;
	function insertAfter(node,referenceNode){
		if(!(node=$(node))){
			return false;
		}
		if(!(referenceNode=$(referenceNode))){
			return false;
		}
		return referenceNode.parentNode.insertBefore(node,referenceNode,nextSibling);
	};
	window['DOM']['insertAfter'] = insertAfter;
	//
	function removeChildren(parent){
		if(!(parent=$(parent))){return false;}
		//当存在子节点时删除该子节点
		while(parent.firstChild){
			parent.firstChild.parentNode.removeChild(parent.firstChild);
		}
		return parent;
	}
	window['DOM']['removeChildren']  = removeChildren;
	//添加一个节点
	function prependChild(parent,newChild){
		if(!(parent=$(parent))){return false;}
		if(!(newChild=$(newChild))){return false;}
		if(parent.firstChild){
			parent.insertBefor(new CHild,parent.firstChild);
		} else {
			parent.appendChild(newChild);
		}
		return parent;
	}
	window['DOM']['prependChild'] = prependChild;
	//前台的js日志文件
	function myLogger(id){
		id = id || 'DOMLogWindow';
		//logWindow是一个私有的变量，该属性将在内部被对象用来引用日志窗口DOM节点
		var logWindow = null;
		//创建一个widnow，用来描述日志
		var createWindow = function(){
			//取得新窗口在浏览器中
			var browserWindowSize = DOM.getBrowserWindowSize();
			//居中放置时的左上角位置
			var top = ((browserWindowSize.height - 200) / 2) || 0;
			var left = ((browserWindowSize.width - 200) / 2) || 0;
			//创建作为日志窗口的DOM节点
			//使用受保护的logWindow属性维护引用
			logWindow = document.createElement('UL');
			//指定logWindow的id
			logWindow.setAttribute('id',id);
			//设置window的位置；
			logWindow.style.position = 'absolute';
			logWindow.style.top = top + 'px';
			logWindow.style.left = left + 'px';
			
			//设置固定的大小允许窗口内容滚动
			logWindow.style.width = '200px';
			logWindow.style.height = '200px';
			logWindow.style.overflow = 'scroll';
			//添加一些效果
			logWindow.style.padding = '0';
			logWindow.style.margin = '0';
			logWindow.style.border = '1px solid black';
			logWindow.style.backgroundColor = 'white';
			logWindow.style.listStyle = 'none';
			logWindow.style.font = '10px/10px Verdana,Tahoma,Sans';
			document.body.appendChild(logWindow);
		};
		//公共方法，用来向window中写入日志
		this.writeRaw = function(message){
			if(!logWindow) createWindow();
			//创建列表项并适当地添加样式
			var li = document.createElement('LI');
			li.style.padding = '2px';
			li.style.border = '0';
			li.style.borderBottom = '1px botted black';
			li.style.margin = '0';
			li.style.color = '#000';
			li.style.font = '9px/9px Verdana,Tahoma,Sans';
			//为日志节点添加信息
			if(typeof message == 'undefined'){
				li.appendchild(document.createTextNode(
				'Message was undefined'));
			} else if( typeof li.innerHTML != undefined ){
				li.innerHTML = message;
			} else {
				li.appendchild(document.createTextNode(message));
			}
			//将这个条目添加日志窗口
			logWindow.appendChild(li);
			return true;
			
		};
	}
	myLogger.prototype = {
		write:function(message){
			//警告message是个空值
			if(typeof message == 'string' && message.length==0){
				return this.writeRaw('DOM.log:null message');
			}
			//如果message不是字符串，则尝试调用toString()
			//方法，如果不存在该方法则记录对象类型
			if(typeof message != 'string'){
				if(message.toString()){
					return this.writeRaw(message.toString());
				}else{
					return this.writeRaw(typeof message);
				}
			}
			//转换<和>以便.innerHtml不会将message
			//作为HTML进行解析
			message = message.replace(/</g,"&lt;").replace(/>/g,"&gt");
			return this.writeRaw(message);
			
		},
		header:function(message){
			message = '<span style="color:white;background-color:black;font-weight:bold;padding:0px 5px;">'+message
				+ '</span>';
			return this.writeRaw(message);
		}
	};
	if(!window.DOM){window['DOM'] = {}; };
	window['DOM']['log'] = new myLogger();
	//获得浏览器屏幕大小
	function getBrowserWindowSize(){
		var de = document.documentElement;
		//这种return的形式是return出一个对象该对象有width和height方法
		return {
			'width':(
				window.innerWidth
				|| (de && de.clientWidth)
				|| document.body.clientWidth),
			'height':(
				window.innerHeight
				|| (de && de.clientHeight)
				|| document.body.clientHeight),
		};
	}
	window['DOM']['getBrowserWindowSize'] = getBrowserWindowSize;
	//这些都是常量
	window['DOM']['node'] = {
		ELEMENT_NODE :1,//元素的名称如：DIV  A  大写
		ATTRIBUTE_NODE:2,//属性名称 小写
		TEXT_NODE:3,//#text文字
		CDATA_SECTION_NODE:4,//cdata-section
		ENTITY_REFERENCE_NODE:5,//实体类引用的名称
		ENTITY_NODE:6,//实体名称
		PROCESSING_INSTRUCTION_NODE:7,//目标名称
		COMMENT_NODE:8,
		DOCUMENT_NODE:9,
		DOCUMENT_TYPE_NODE:10,//文档类型名称如HTML
		DOCUMENT_FRAGMENT_NODE:11,
		NOTATION_NODE:12//表示法名称
	};
	//遍历DOM节点
	function walkElementsLinear(func,node){
		var root = node || window.document;
		var nodes = root.getElementsByTagName("*");
		for(var i = 0 ; i < nodes.length ; i++){
			func.call(nodes[i]);
		}
	}
	window['DOM']['walkElementsLinear']=walkElementsLinear;
	//利用递归的方式遍历节点
	function walkTheDOMRecursive(func,node,depth,returnedFromParent){
		var root = node || window.document;
		var returnedFromParent = func.call(root,depth++,returnedFromParent);
		var node = root.firstChild;
		while (node) {
			walkTheDOMRecursive(func,node,depth,returnedFromParent);
			node = node.nextSibling;
		}
	}
	window['DOM']['walkTheDOMRecursive'] =walkTheDOMRecursive;
	//递归时同时查找到节点属性
	function walkTheDOMWithAttributes(node,func,depth,returnedFromParent){
		var root = node || window.document;
		returnedFromParent = func(root,depth++,returnedFromParent);
		if(root.attributes){
			for(var i = 0 ; i < root.attributes.length;i++){
				walkTheDOMWithAttributes(root.attributes[i],func,depth-1,returnedFromParent);
			}
			if(node){
				walkTheDOMWithAttributes(node,func,depth,returnedFromParent);
				node = node.nextSibling;
			}
		}
	}
})();









