
	var WIZ_IMG_RESIZE_STYLE_ID = 'wiz_img_resize_style_id';
	var WIZ_IMG_RESIZE_SCRIPT_ID = 'wiz_img_resize_script_id';
	var WIZ_STYLE = 'wiz_style';
	function initResizeStyle(htmlDocument, pluginpath) {
		if (!htmlDocument)
			return;
		var style = htmlDocument.getElementById(WIZ_IMG_RESIZE_STYLE_ID);
		if (style)
			return;
		var strStyle = '.wizimgdragresize {position: absolute;z-index: 1000;border: 1px solid black; background-color: white;} .wizimgdragresize-lt { cursor: nw-resize; } .wizimgdragresize-tm { cursor: n-resize;}.wizimgdragresize-rt {cursor: ne-resize;}.wizimgdragresize-lm {cursor: w-resize;}.wizimgdragresize-rm {cursor: e-resize;}.wizimgdragresize-lb {cursor: sw-resize;}.wizimgdragresize-bm {cursor: s-resize;}.wizimgdragresize-rb { cursor: se-resize; }';
		//
		var objStyle = htmlDocument.createElement('style');
		objStyle.type = 'text/css';
		objStyle.textContent = strStyle;
		objStyle.id = WIZ_IMG_RESIZE_STYLE_ID;
		objStyle.setAttribute(WIZ_STYLE, 'unsave');
		//
		htmlDocument.head.appendChild(objStyle);
	}
	function InitResizeScript(htmlDocument, pluginpath) {
		if (!htmlDocument)
			return;
		var scripts = htmlDocument.getElementById(WIZ_IMG_RESIZE_SCRIPT_ID);
		if (scripts) 
			return;
		//
		var tagScript = htmlDocument.createElement('script');
		tagScript.type = 'text/javascript';
		tagScript.src = 'file://' + pluginpath + 'dragresize.js';
		tagScript.id = WIZ_IMG_RESIZE_SCRIPT_ID;
		tagScript.setAttribute(WIZ_STYLE, 'unsave');
		tagScript.setAttribute('charset', 'utf-8');
		htmlDocument.head.appendChild(tagScript);
	}
	function InitImgDragResize() {
		var editorDocument = objApp.EditorDocument;
		if (!editorDocument)
			return;
		//
		var pluginpath = objApp.GetPluginPath("plugin_share.js");
		if (!pluginpath)
			return;
		//
		InitResizeScript(editorDocument, pluginpath);
		//
		initResizeStyle(editorDocument, pluginpath);
	}

	InitImgDragResize();

	function onPluginGetHtml() {
		var editorDocument = objApp.EditorDocument;
		if (!editorDocument)
			return;
		//
		editorDocument.defaultView.eval('onPluginGetHtml();');
	}

	