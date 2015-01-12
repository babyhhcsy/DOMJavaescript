function showMessage(message){
	Alert(message);
}

function $(){
	var elements = new Array();
	for(var i = 0 ; i < arguments.length;i++){
		var element = arguments[i];
		// 如果该参数是一个字符串那假设它是一个id;
		if(typeof element=='string'){
			element = objEditorDocument.getElementById(element);
		}
		// 如果只有一个参数，那么则返回这个元素；
		if(arguments.length==1){
			return element;		
		}
		elements.push(element);
	}
		return elements;
}
//添加文字
function innerText(node,message){
			var insertText = objEditorDocument.createTextNode(message);
			node.appendChild(insertText); 
		}
function selectText(){
	return selectedText=objEditorDocument.selection.createRange().text;
	}


 