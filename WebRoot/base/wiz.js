util = {
		//显示用户提示的信息
		showMes:function(message){
			Alert(message);
		},
		getBrowserWindowSize:function(){
			var de = objEditorDocument.documentElement;
			util.showMes(de);			
		}
	};
	
/*util = {
		//显示用户提示的信息
		showMes:function(message){
			alert(message);
		},
		getBrowserWindowSize:function(){
			var objEditorDocument = document;
			var objEditorWindow = window;
			var de = objEditorDocument.documentElement;
			util.showMes(de);
			return {
				'width':(
					objEditorWindow.innerWidth
					|| (de && de.clientWidth)
					|| objEditorDocument.body.clientWidth),
				'height':(
					objEditorWindow.innerHeight
					|| (de && de.clientHeight)
					|| objEditorDocument.body.clientHeight)
			};
		}
	};
	
*/