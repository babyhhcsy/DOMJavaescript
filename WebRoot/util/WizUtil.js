util = {
	showMessage:function(message){
		Alert(message);
	},
	//该方法可以获得节点对象
	$:function(){
		var elements = new Array();
		for(var i = 0 ; i < arguments.length;i++){
			var element = arguments[i];
			//如果该参数是一个字符串那假设它是一个id;
			if(typeof element=='string'){
				element = objEditorDocument.getElementById(element);
			}
			//如果只有一个参数，那么则返回这个元素；
			if(arguments.length==1){
				return element;		
			}
			elements.push(element);
		}
			return elements;
		},
		/**
		 * node 节点 
		 * message 插入的内容
		 * 向div或者span中添加文字
		 */
		innerText:function(node,message){
			var insertText = objEditorDocument.createTextNode(message);
			node.appendChild(insertText); 
		}
};


 