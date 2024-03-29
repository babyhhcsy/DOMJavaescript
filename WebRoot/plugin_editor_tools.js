



var ET_pluginPath = objApp.GetPluginPath("plugin_editor_tools.js");
var ET_pluginFileName = ET_pluginPath + "plugin_editor_tools.ini";
//

function ET_onCheckWords2(str1, str2) {
    var n = 0
    var keys = "按装|甘败下风|自抱自弃|针贬|泊来品|脉博|松驰|一愁莫展|穿流不息|精萃|重迭|渡假村|防碍|幅射|一幅对联|天翻地复|言简意骇|气慨|一股作气|悬梁刺骨|粗旷|食不裹腹|震憾|凑和|侯车室|迫不急待|既使|一如继往|草管人命|娇揉造作|挖墙角|一诺千斤|不径而走|峻工|不落巢臼|烩炙人口|打腊|死皮癞脸|兰天白云|鼎立相助|再接再励|老俩口|黄梁美梦|了望|水笼头|杀戳|痉孪|美仑美奂|罗唆|蛛丝蚂迹|萎糜不振|沉缅|名信片|默守成规|大姆指|沤心沥血|凭添|出奇不意|修茸|亲睐|磬竹难书|入场卷|声名雀起|发韧|搔痒病|欣尝|谈笑风声|人情事故|有持无恐|额首|称庆|追朔|鬼鬼崇崇|金榜提名|走头无路|趋之若骛|迁徒|洁白无暇|九宵|渲泄|寒喧|弦律|尤如猛虎|膺品|不能自己|竭泽而鱼|滥芋充数|世外桃园|脏款|醮水|蜇伏|装祯|饮鸠止渴|坐阵|旁证博引|灸手可热|九洲|床第之私|姿意妄为|编篡|做月子|我得|我地|络绎不决|别出新裁|疏疏郎郎|渭然成风|浮想连篇|心干情愿|妄费心机|凶神恶刹|沧海一栗|汗流颊背|别巨匠心|锐不可挡|慎时度势|出人投地|错落有至|变本加利|两全齐美|怨天忧人|攻城虐地|戒骄戒燥|莫可明状|事在必行|反躬自醒|开宗明意|义气用事|歪门斜道|唇枪舌箭|失口否认|苦心孤意|大喜过忘|美仑美奂|莫可明状|开宗名义|义气用事|大喜过忘|大喜过旺|意味伸长|云筹帷幄|偏心则暗|大刹风景|明哞善睐|前鞠后恭|如愿已偿|和中共济|山青水秀|加官劲爵|养遵处优|饥肠漉漉|略见一班|依马当先|损身不恤|一张一驰|煽然泪下|篷荜生辉|防患未燃|手不失卷|原形必露|待价而估|情不自尽|不能自己|涣然一新|明辩是非|没精打彩|精兵减政|陈词烂调|迫在眉劫|甘败下风|暄宾夺主|报仇血恨|伤心病狂|风糜一时|敷衍塞职|宠然大物|破锭百出|鞠躬尽粹|脑羞成怒|恂私枉法|气势凶凶|阴谋鬼计|高瞻远嘱|天花乱醉|理曲词穷|偷机取巧|改斜归正|迫不及戴|应接不瑕|头晕目炫|不径而走|分道扬镖|说长到短|万事具备|新新向荣|专心至志|语重心常|弱不经风|暗然失色|重峦跌嶂|巧舌如黄|瞒心寐己";
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
//添加一个按钮用于插入图片
intitNavigation();
var util ;
//初始化所需的js文件
function intitNavigation(){
	//添加自定义的js文件dom.js
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









