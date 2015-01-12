
(function(){
		window['DOM'] = {};
	/**
	 * @argument
	 * 	other 
	 * @description 
	 * 	�ķ����û�ȷ������������Ƿ������������
	 * @return boolean
	 * 	true ����������� false��֮
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
	 * 	�÷�������ҳ��Ԫ�ص�id�Żظýڵ����
	 * @return
	 *  ��@argumentֻ��һ����ʱ�򷵻ؽڵ����;
	 * 	��@argument�ж����ʱ�򷵻�һ�ڵ�������飻
	 * */
	function $(){
		var elements = new Array();
		for(var i = 0 ;i < arguments.length;i++){
			var element = arguments[i];
			//����ò�����һ���ַ����Ǽ�������һ��id;
			if(typeof element=='string'){
				element = document.getElementById(element);
			}
			//���ֻ��һ����������ô�򷵻����Ԫ�أ�
			if(arguments.length==1){
				return element;		
			}
			elements.push(element);
		}
		return elements;
	}
	window['DOM']['$'] = $;
	function addEvent(node,type,listener){
		//�����ݵ�ʱ�򷵻�false
		if(!isCompatible()){return false;}
		if(!(node=$(node))){return false;}
		if(node.addEventListener){
			//W3C����
			node.addEventListener(type,listener,false);
			return true;
		}else if(node.attachEvent){
			//MSIE����
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
	//���һ�������ͬ��ǩ��Ԫ��
	function getElementsByClassName(className,tag,parent){
		parent = parent || document;
		if(!(parent=$(parent))){
			return false;
		}
		//��������ƥ��ı�ǩ �Ƿ�֧��parent.all���� 
		var allTags = (tag == "*" && parent.all ) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = new Array();
		//����һ��������ʽ�����ж�className�Ƿ���ȷ
		className = className.replace(/\-/g,"\\-");//  //ֱ�ӵ�������ʽ��g��ʾȫ�֣���-������-
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");	//ȥ����β�ո�	
		var element;
		for(var i = 0 ;i < allTags.length;i++){
			element = allTags[i];
			if(regex.test(element.className)){
				matchingElements.push(element);
			}
		}
		//�����κ�ƥ���Ԫ��
		return matchingElements;
	}
	/**
	 * var elements = DOM.getElementsByClassName("testClass",'*',document);
		//����������Ի������tag֮��Ľڵ����
		var fount = DOM.getElementsByClassName("testClass",'div',DOM.$(testDIV));
	 * */
	window['DOM']['getElementsByClassName'] = getElementsByClassName;
	//����dom�Ŀɼ���
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
		//�������ӽڵ�ʱɾ�����ӽڵ�
		while(parent.firstChild){
			parent.firstChild.parentNode.removeChild(parent.firstChild);
		}
		return parent;
	}
	window['DOM']['removeChildren']  = removeChildren;
	//���һ���ڵ�
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
	//ǰ̨��js��־�ļ�
	function myLogger(id){
		id = id || 'DOMLogWindow';
		//logWindow��һ��˽�еı����������Խ����ڲ�����������������־����DOM�ڵ�
		var logWindow = null;
		//����һ��widnow������������־
		var createWindow = function(){
			//ȡ���´������������
			var browserWindowSize = DOM.getBrowserWindowSize();
			//���з���ʱ�����Ͻ�λ��
			var top = ((browserWindowSize.height - 200) / 2) || 0;
			var left = ((browserWindowSize.width - 200) / 2) || 0;
			//������Ϊ��־���ڵ�DOM�ڵ�
			//ʹ���ܱ�����logWindow����ά������
			logWindow = document.createElement('UL');
			//ָ��logWindow��id
			logWindow.setAttribute('id',id);
			//����window��λ�ã�
			logWindow.style.position = 'absolute';
			logWindow.style.top = top + 'px';
			logWindow.style.left = left + 'px';
			
			//���ù̶��Ĵ�С���������ݹ���
			logWindow.style.width = '200px';
			logWindow.style.height = '200px';
			logWindow.style.overflow = 'scroll';
			//���һЩЧ��
			logWindow.style.padding = '0';
			logWindow.style.margin = '0';
			logWindow.style.border = '1px solid black';
			logWindow.style.backgroundColor = 'white';
			logWindow.style.listStyle = 'none';
			logWindow.style.font = '10px/10px Verdana,Tahoma,Sans';
			document.body.appendChild(logWindow);
		};
		//����������������window��д����־
		this.writeRaw = function(message){
			if(!logWindow) createWindow();
			//�����б���ʵ��������ʽ
			var li = document.createElement('LI');
			li.style.padding = '2px';
			li.style.border = '0';
			li.style.borderBottom = '1px botted black';
			li.style.margin = '0';
			li.style.color = '#000';
			li.style.font = '9px/9px Verdana,Tahoma,Sans';
			//Ϊ��־�ڵ������Ϣ
			if(typeof message == 'undefined'){
				li.appendchild(document.createTextNode(
				'Message was undefined'));
			} else if( typeof li.innerHTML != undefined ){
				li.innerHTML = message;
			} else {
				li.appendchild(document.createTextNode(message));
			}
			//�������Ŀ�����־����
			logWindow.appendChild(li);
			return true;
			
		};
	}
	myLogger.prototype = {
		write:function(message){
			//����message�Ǹ���ֵ
			if(typeof message == 'string' && message.length==0){
				return this.writeRaw('DOM.log:null message');
			}
			//���message�����ַ��������Ե���toString()
			//��������������ڸ÷������¼��������
			if(typeof message != 'string'){
				if(message.toString()){
					return this.writeRaw(message.toString());
				}else{
					return this.writeRaw(typeof message);
				}
			}
			//ת��<��>�Ա�.innerHtml���Ὣmessage
			//��ΪHTML���н���
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
	//����������Ļ��С
	function getBrowserWindowSize(){
		var de = document.documentElement;
		//����return����ʽ��return��һ������ö�����width��height����
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
	//��Щ���ǳ���
	window['DOM']['node'] = {
		ELEMENT_NODE :1,//Ԫ�ص������磺DIV  A  ��д
		ATTRIBUTE_NODE:2,//�������� Сд
		TEXT_NODE:3,//#text����
		CDATA_SECTION_NODE:4,//cdata-section
		ENTITY_REFERENCE_NODE:5,//ʵ�������õ�����
		ENTITY_NODE:6,//ʵ������
		PROCESSING_INSTRUCTION_NODE:7,//Ŀ������
		COMMENT_NODE:8,
		DOCUMENT_NODE:9,
		DOCUMENT_TYPE_NODE:10,//�ĵ�����������HTML
		DOCUMENT_FRAGMENT_NODE:11,
		NOTATION_NODE:12//��ʾ������
	};
	//����DOM�ڵ�
	function walkElementsLinear(func,node){
		var root = node || window.document;
		var nodes = root.getElementsByTagName("*");
		for(var i = 0 ; i < nodes.length ; i++){
			func.call(nodes[i]);
		}
	}
	window['DOM']['walkElementsLinear']=walkElementsLinear;
	//���õݹ�ķ�ʽ�����ڵ�
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
	//�ݹ�ʱͬʱ���ҵ��ڵ�����
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









