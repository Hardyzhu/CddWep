/**
 * create by yeshengqiang
 */

var yMake = (function($$){
	var $$ = $$ || {};
	//定义函数库
	$$.fn = {};
	//继承
	$$.extend = {};
	//验证
	$$.checkValue = {};
/******************************************************原型方法开始************************************************************************/
	/**
	 * 去除两边空格
	 */	
	String.prototype.trim = String.prototype.trim || function(){
		return this.replace(/^\s+|\s+$/g, '');
	}

	/**
	 * 全局替换
	 */
	String.prototype.replaceAll = String.prototype.replaceAll || function(arg1,arg2){
		return this.replace(new RegExp(arg1,"gm"),arg2);
	};

	//查找
	Array.prototype.indexOf = Array.prototype.indexOf || function (w)
	{
		for(var i=0;i<this.length;i++)if(this[i]==w)return i;
		return -1;
	};

    //数组remove方法
	Array.prototype.remove = Array.prototype.remove || function (w)
	{
		var n=this.indexOf(w);
		if(n!=-1)this.splice(n,1);
	};

	/**
     * concat 方法
	 */
	Array.prototype.append = Array.prototype.append || function (aAny)
	{
		for(var i=0,len=aAny.length;i<len;i++){
			this.push(aAny[i]);
		}		
		return this;
	};

	//兼容chrome的打印
	window.console = window.console || {};
	console.log = console.log || function (){};

/******************************************************原型方法结束************************************************************************/
	//获取元素 
	/*$$.get = function(selector,parent){
		if(selector.indexOf('\#')>-1){
			return parent.getElementById(selector);
		}else if(selector.indexOf('\.')>-1){

			for(var i=0;i<i++)
			return parent.
		}

	};*/

	//获取非行间样式
	$$.fn.getStyle = function (obj,attr){    //获取非行间样式，obj是对象，attr是值
		if(obj.currentStyle){   //针对ie获取非行间样式
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];   //针对非ie
		}
	}
	// 通过className获取元素
	$$.fn.getByClass = function(oParent,iClass){
		var oParent = oParent || document;
        //console.log(oParent);
		var re=new RegExp('\\b'+iClass+'\\b', 'i');
		var iEle = oParent.getElementsByTagName('*');
        //console.log(iEle);
		var temp = [];
		for(var i = 0;i<iEle.length;i++){
			if(re.test(iEle[i].className)){
				temp.push(iEle[i]);
			}
		}
		return temp;
	};

	// 添加class
	$$.addClass = function(obj,iClass){
		var re=new RegExp('\\b'+iClass+'\\b', 'i');

		if(re.test(obj.className))return;
		obj.className = (obj.className+' '+sClass).match(/\S+/g).join(' ');
	};

	// 添加class
	$$.removeClass = function(obj,iClass){
		var re=new RegExp('\\b'+iClass+'\\b', 'g');
	
		obj.className = obj.className.replace(re, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
	};

	//随机函数
	$$.rnd = function(n,m){
		return Math.random()*(m-n)+n;
	};
	/**
	 * description: 判断是否为一个空对象
	 * @param  {object}  obj [注入一个对象]
	 * @return {Boolean}     [true：为空,false: 不为空]
	 */
	$$.isNullObject = function(obj){
		for(var i=0 in obj){
			if(obj.hasOwnProperty(i)){
				return false;
			}
		}
		return true;
	};

	//获取距离屏幕边界定位
	$$.fn.getScreenPos = function(obj){
		//var obj = this.getByClass(obj);
		//console.log(obj);
		var res = {l:0,t:0};
		while(obj){
			res.l += obj.offsetLeft || 0;
			res.t += obj.offsetTop || 0;

			//得到当前定位的父级
			obj=obj.offsetParent;
			//console.log(obj);
		}
		return res;
	};

	//获取距离父级定位
	$$.fn.getPos = function(obj){
		var res = {l:0,t:0};
		res.l = obj.offsetLeft || 0;
		res.t = obj.offsetTop || 0;
		return res;
	};
	/**
	 * [isTypeOf 检测类型]
	 * @param  {[object]}  obj
	 * @param  {[type]}  type [注入一个类型]
	 * @return {Boolean}      [true:为真]
	 */
	$$.fn.isTypeOf = function(obj,type){
		return (typeof obj === type)?true:false;
	};

	/**
	 * 动画
	 */
	$$.fn.startMove = function(obj,json,svr,sv,fn){
		clearInterval(obj.timer);
		var _this = this;
		obj.timer=setInterval(function(){
			var sTop=true;
			for(var attr in json){
				var cur=0;
				if(attr=='opacity'){
					cur=Math.round(parseFloat(_this.getStyle(obj,attr))*100);
				}else{
					cur=parseInt(_this.getStyle(obj,attr));
				}
				var speed=(json[attr]-cur)/(svr||5);
				var speed=(speed>0)?Math.ceil(speed):Math.floor(speed);
				if(cur!=json[attr])sTop=false;
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}else{
					obj.style[attr]=cur+speed+'px';
				}
			}
			if(sTop){
				clearInterval(obj.timer);
				if(fn)fn();
			}
		},(sv||30));
	};

    /**
     * 自适应高度
     */
    $$.fn.autoHeight = function(){
        var comHeight = $(window).height()||$(document).height();
        var res = $(arguments[0]).offset().top + arguments[1]||0;
        $(arguments[0]).height(comHeight-res);
    };


	/**
	 * 兼容amd规范
	 */
	if(typeof define === 'function'&&define.amd){
		define('$$',[],function(){
			return $$;
		});
	}

	return $$;
})({});


