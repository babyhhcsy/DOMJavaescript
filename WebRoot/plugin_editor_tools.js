



var ET_pluginPath = objApp.GetPluginPath("plugin_editor_tools.js");
var ET_pluginFileName = ET_pluginPath + "plugin_editor_tools.ini";
//

function ET_onCheckWords2(str1, str2) {
    var n = 0
    var keys = "��װ|�ʰ��·�|�Ա�����|���|����Ʒ|����|�ɳ�|һ��Īչ|������Ϣ|����|�ص�|�ɼٴ�|����|����|һ������|�췭�ظ�|�Լ��⺧|����|һ������|�����̹�|�ֿ�|ʳ������|��|�պ�|���|�Ȳ�����|��ʹ|һ�����|�ݹ�����|��������|��ǽ��|һŵǧ��|��������|����|���䳲��|�����˿�|����|��Ƥ���|�������|��������|�ٽ�����|������|��������|����|ˮ��ͷ|ɱ��|����|������ۼ|����|��˿�켣|ή�Ӳ���|����|����Ƭ|Ĭ�سɹ�|��ķָ|Ž����Ѫ|ƾ��|���治��|����|����|��������|�볡��|����ȸ��|����|ɦ����|����|̸Ц����|�����¹�|�г��޿�|����|����|׷˷|�����|�������|��ͷ��·|��֮����|Ǩͽ|�����Ͼ|����|��й|����|����|�����ͻ�|��Ʒ|�����Լ�|�������|�������|������԰|���|��ˮ|�ط�|װ��|���ֹ��|����|��֤����|���ֿ���|����|����֮˽|������Ϊ|���|������|�ҵ�|�ҵ�|���ﲻ��|����²�|��������|μȻ�ɷ�|������ƪ|�ĸ���Ը|�����Ļ�|�����ɲ|�׺�һ��|�����ձ�|��޽���|�񲻿ɵ�|��ʱ����|����Ͷ��|��������|�䱾����|��ȫ����|Թ������|����Ű��|�佾����|Ī����״|���ڱ���|��������|��������|��������|����б��|��ǹ���|ʧ�ڷ���|���Ĺ���|��ϲ����|������ۼ|Ī����״|��������|��������|��ϲ����|��ϲ����|��ζ�쳤|�Ƴ���|ƫ����|��ɲ�羰|��������|ǰ�Ϻ�|��Ը�ѳ�|���й���|ɽ��ˮ��|�ӹپ���|������|��������|�Լ�һ��|������|������|һ��һ��|ɿȻ����|��������|����δȼ|�ֲ�ʧ��|ԭ�α�¶|���۶���|�鲻�Ծ�|�����Լ�|��Ȼһ��|�����Ƿ�|û�����|��������|�´��õ�|����ü��|�ʰ��·�|�ѱ�����|����Ѫ��|���Ĳ���|����һʱ|������ְ|��Ȼ����|�ƶ��ٳ�|�Ϲ�����|���߳�ŭ|��˽����|��������|��ı���|��հԶ��|�컨����|��������|͵��ȡ��|��б����|�Ȳ�����|Ӧ�Ӳ��|ͷ��Ŀ��|��������|�ֵ�����|˵������|���¾߱�|��������|ר����־|�����ĳ�|��������|��Ȼʧɫ|���͵���|�������|�����¼�";
    var key = keys.split('|');
    for (var i = 0; i < key.length; i++) {
        var findNext = false;
        while (window.find(key[i], true, false, false, findNext)) {
            findNext = true;
            //
            document.execCommand("foreColor", false, "#ff0000");
            n++;
        }
        //
        var sel = document.getSelection();
        sel.foucsNode = document.body.firstChild;
        sel.collapse();
    }
    if (n == 0)
        alert(str1);
    else
        alert(str2);
}

function ET_onCheckWords() {
    objApp.FindText("test", true, false, false);
    return;
    var str1 = ET_loadString("strNoSpellError");
    var str2 = ET_loadString("strFindSpellError");
    //
    var strExecuteFunction = "ET_onCheckWords2('" + str1 + "', '" + str2 + "');";

    var script = objEditorDocument.createElement("SCRIPT");
    script.textContent = ET_onCheckWords2.toString() + strExecuteFunction;
    //
    objEditorDocument.body.appendChild(script);
    objEditorDocument.body.removeChild(script);
    //
}

function ET_onChineseWords() {
    objApp.ShowPluginDlg(ET_pluginPath + "ConvertWords.htm", 400, 300, "");
}

function ET_onRemoveHiddenText() {
    try {
        var removed = false;
        var doc = objEditorDocument;
        var elements = doc.getElementsByTagName("span");
        for (var i = elements.length - 1; i >= 0; i--) {
            if (elements[i].style.display == "none") {
                var node = elements[i];
                var parentNode = node.parentNode;
                parentNode.removeChild(node);
                //
                removed = true;
            }
        }
        //
        if (removed) {
            Alert(ET_loadString("strHiddenTextRemoved"));
        }
        else {
            Alert(ET_loadString("strNoHiddenText"));
        }
    }
    catch (err) {
        Alert(err);
    }
}

function ET_loadString(name) {
    return objTools.LoadString(ET_pluginFileName, name);
}


objApp.AddToolButton("ET_onCheckWords", ET_loadString("strCheckWords"), ET_pluginPath + "checkwords.ico", "ET_onCheckWords", "/visible=0");
objApp.AddToolButton("ET_onChineseWords", ET_loadString("strChineseWords"), ET_pluginPath + "convert.ico", "ET_onChineseWords", "/visible=0");
objApp.AddToolButton("ET_onRemoveHiddenText", ET_loadString("strRemoveHiddenText"), ET_pluginPath + "removehidden.ico", "ET_onRemoveHiddenText", "/visible=0");
//���һ����ť���ڲ���ͼƬ
intitNavigation();
var util ;
//��ʼ�������js�ļ�
function intitNavigation(){
	//����Զ����js�ļ�dom.js
	objApp.AddScript(ET_pluginPath + "util/WizUtil.js");
	util.showMessage("jiaz");
	util.showMessage2("jiaz");
	
	
}
function onmybuttonclicked() {
	var rect = objApp.GetToolButtonRect("mybuttonid");
	var arr = rect.split(',');
	objApp.ShowSelectorWindow("e:\\1.htm", (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 100, 100, "");
}
objApp.AddToolButton("mybuttonid",ET_loadString("strRemoveHiddenText"), ET_pluginPath + "border.ico", "onmybuttonclicked", "/visible=0");









