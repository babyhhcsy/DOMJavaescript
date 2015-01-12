function myConstructor(message){
	//在这里定义的变量都是私有变量
		var sparator = ' -';
		alert(message);
		this.message = message;
		this.show = function(){
			alert('展示选择的内容'+sparator);
			};
	};
myConstructor.prototype.clearMessage = function(string){
	this.myMessage += '' + string;
	};
//通过追加属性的方式也不能访问私有变量；
myConstructor.prototype.appendToMessage = function(string){
	this.meMessage += sparator + string;
	};
var myObject = new myConstructor("hellow word!");
myObject.clearMessage();
myObject.show();
myObject.appendToMessage('abc');
