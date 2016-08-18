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
	//动画库
	$$.an = {};
	//弹出层
	$$.layer = {};
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

    //创建元素(前面添加)
    Object.prototype.before = Object.prototype.before ||
    function(obj){
        var createNew = document.createElement(obj);
        this.parentNode.insertBefore(createNew,this);
    };

    //创建元素(后面添加)
    Object.prototype.after = Object.prototype.after ||
    function(obj){
        var createNew = document.createElement(obj);
        console.log(this.parentNode.lastChild==this);
        if(this.parentNode.lastChild==this){
            this.parentNode.appendChild(createNew,this);
        }else{
            this.parentNode.insertBefore(createNew,this.nextElementSibling || this.nextSibling);
        }
    };

    //创建元素(里面添加)
    Object.prototype.append = Object.prototype.append ||
    function(obj){
        var createNew = document.createElement(obj);
        this.appendChild(createNew);
    };

    //获取非行间样式
    function getStyle(obj,attr){
        if(obj.currentStyle){         //Ie
            return obj.currentStyle[attr];
        }else{
            return window.defaultView&&window.defaultView.getComputedStyle(obj,null)[attr];
        }
    };
	//兼容chrome的打印
	window.console = window.console || {};
	console.log = console.log || function (){};

/******************************************************原型方法结束************************************************************************/
	//绑定事件
	$$.fn.bindEvent = function (obj, ev, fn)
	{
		obj.addEventListener?obj.addEventListener(ev, fn, false):obj.attachEvent('on'+ev, fn);
	}
	//结束绑定
	$$.fn.unbindEvent = function (obj, ev, fn)
	{
		obj.removeEventListener?obj.removeEventListener(ev, fn, false):obj.detachEvent('on'+ev, fn);
	}
	//获取元素
	$$.fn.getEle = function(sExp, oParent)
	{
		var aResult=[];
		var i=0;
		
		oParent || (oParent=document);
		
		if(oParent instanceof Array)
		{
			for(i=0;i<oParent.length;i++)aResult=aResult.concat(getEle(sExp, oParent[i]));
		}
		else if(typeof sExp=='object')
		{
			if(sExp instanceof Array)
			{
				return sExp;
			}
			else
			{
				return [sExp];
			}
		}
		else
		{
			//xxx, xxx, xxx
			if(/,/.test(sExp))
			{
				var arr=sExp.split(/,+/);
				for(i=0;i<arr.length;i++)aResult=aResult.concat(getEle(arr[i], oParent));
			}
			//xxx xxx xxx 或者 xxx>xxx>xxx
			else if(/[ >]/.test(sExp))
			{
				var aParent=[];
				var aChild=[];
				
				var arr=sExp.split(/[ >]+/);
				
				aChild=[oParent];
				
				for(i=0;i<arr.length;i++)
				{
					aParent=aChild;
					aChild=[];
					for(j=0;j<aParent.length;j++)
					{
						aChild=aChild.concat(getEle(arr[i], aParent[j]));
					}
				}
				
				aResult=aChild;
			}
			//#xxx .xxx xxx
			else
			{
				switch(sExp.charAt(0))
				{
					case '#':
						return [document.getElementById(sExp.substring(1))];
					case '.':
						return getByClass(oParent, sExp.substring(1));
					default:
						return [].append(oParent.getElementsByTagName(sExp));
				}
			}
		}

		return aResult;
	}
	//设置样式
	$$.fn.setStyle = function(obj, json){
		if(obj.length)
			for(var i=0;i<obj.length;i++) this.setStyle(obj[i], json);
		else
		{
			if(arguments.length==2)	//json
				for(var i in json) this.setStyle(obj, i, json[i]);
			else	//name, value
			{
				switch(arguments[1].toLowerCase())
				{
					case 'opacity':
						obj.style.filter='alpha(opacity:'+arguments[2]+')';
						obj.style.opacity=arguments[2]/100;
						break;
					default:
						if(typeof arguments[2]=='number')
						{
							obj.style[arguments[1]]=arguments[2]+'px';
						}
						else
						{
							obj.style[arguments[1]]=arguments[2];
						}
						break;
				}
			}
		}
	};
	//获取非行间样式
	$$.fn.getStyle = function (obj,attr){    //获取非行间样式，obj是对象，attr是值
        if(obj.currentStyle){         //Ie
            return obj.currentStyle[attr];
        }else{
            return window.defaultView&&window.defaultView.getComputedStyle(obj,null)[attr];
        }
	};
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
		obj.className = (obj.className+' '+iClass).match(/\S+/g).join(' ');
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
	 * [startMove 动画]
	 * @param  {[type]} obj        [ilem]
	 * @param  {[type]} oTarget    [json对象]
	 * @param  {[type]} iType      [ iType:1为普通运动，iType:2为弹性运动 number类型]
	 * @param  {[type]} fnCallBack [回调]
	 * @param  {[type]} fnDuring   [description]
	 * @return {[type]}            [description]
	 */
	$$.an.startMove = function(obj, oTarget, iType, fnCallBack, fnDuring){
		var fnMove=null;
		var _this = this;
		if(obj.timer)
		{
			clearInterval(obj.timer);
		}

		switch(iType)
		{
			case 1:
				fnMove=this.moveBuffer;
				break;
			case 2:
				fnMove=this.moveFlex;
				break;
		}

		obj.timer=setInterval(function (){
			fnMove.call(_this, obj, oTarget, fnCallBack, fnDuring);
		}, 15);
	};
/****************************************************动画库开始**********************************************************/
	/**
	 * 减速运动
	 */
	 $$.an.moveBuffer = function(obj, oTarget, fnCallBack, fnDuring)
		{
			var bStop=true;
			var attr='';
			var speed=0;
			var cur=0;
			
			for(attr in oTarget)
			{
				//通过这个元素获取当前的元素
				if(attr=='opacity'){
					cur=Math.round(parseFloat(this.css(obj,attr))*100);   //round主要是去除浮点数 比如7.00000001
                    console.log('option'+cur);
				}
				else{
					cur=parseInt(this.css(obj,attr));
                    console.log('right'+cur);
				}
				document.title = speed+'|'+cur;
				if(oTarget[attr]!=cur)
				{
					bStop=false;
					
					speed=(oTarget[attr]-cur)/10;

					speed=speed>0?Math.ceil(speed):Math.floor(speed);
					
					this.css(obj, attr, cur+speed);
				}
			}
			
			if(fnDuring)fnDuring.call(obj);
			
			if(bStop)
			{
				clearInterval(obj.timer);
				obj.timer=null;
				if(fnCallBack)fnCallBack.call(obj);
			}
		}
		/**
		 * 弹性运动
		 */
		$$.an.moveFlex = function(obj, oTarget, fnCallBack, fnDuring)
		{
			var bStop=true;
			var attr='';
			var speed=0;
			var cur=0;
			for(attr in oTarget)
			{
				if(!obj.oSpeed)obj.oSpeed={};
				if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
				//通过这个元素获取当前的元素
				if(attr=='opacity'){
					cur=Math.round(parseFloat(this.css(obj,attr))*100);   //round主要是去除浮点数 比如7.00000001
				}
				else{
					cur=parseInt(this.css(obj,attr));
				}	
				if(Math.abs(oTarget[attr]-cur)>1 || Math.abs(obj.oSpeed[attr])>1)
				{
					bStop=false;
					
					obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
					obj.oSpeed[attr]*=0.7;
					var maxSpeed=65;
					if(Math.abs(obj.oSpeed[attr])>maxSpeed)
					{
						obj.oSpeed[attr]=obj.oSpeed[attr]>0?maxSpeed:-maxSpeed;
					}
	
					this.css(obj, attr, cur+obj.oSpeed[attr]);
				}else{
					//最后一步没有走完手动赋值
					this.css(obj, attr, oTarget[attr]);
				}
			}
			
			if(fnDuring)fnDuring.call(obj);
			
			if(bStop)
			{
				clearInterval(obj.timer);
				obj.timer=null;
				if(fnCallBack)fnCallBack.call(obj);
			}
		}
		/**
		 * 弹性运动调用的css
		 */
		$$.an.css = function(obj, attr, value)
		{
			if(arguments.length==2)
				return parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
			else if(arguments.length==3)
				switch(attr)
				{
					case 'width':
					case 'height':
					case 'paddingLeft':
					case 'paddingTop':
					case 'paddingRight':
					case 'paddingBottom':
						value=Math.max(value,0);
					case 'left':
					case 'top':
					case 'right':
					case 'bottom':
					case 'marginLeft':
					case 'marginTop':
					case 'marginRight':
					case 'marginBottom':
						obj.style[attr]=value+'px';
						break;
					case 'opacity':
						obj.style.filter="alpha(opacity:"+value+")";
						obj.style.opacity=value/100;
						break;
					default:
						//如background
						obj.style[attr]=value;
				}
			
			return function (attr_in, value_in){css(obj, attr_in, value_in)};
		}
/****************************************************动画库结束**********************************************************/
/****************************************************弹出层开始**********************************************************/
	//配置文件
	$$.layer.options = {
		width:"300px",
		height:"80px",
		color:"#FFF",
		backgroundColor:"blue",
		position: "fixed",
		zIndex:"9999",
		right:"-300px",
		top:"20px",
		padding:"10px",
		borderRadius:"45px 0 0 45px"
	};
    $$.layer.state = false;//控制弹出
	//创建layer弹出
	$$.layer.create = function(str){
		var html = document.createElement('div');
        html.setAttribute('id','layer_msg');
        html.setAttribute('class','animated');
		var img = document.createElement('span');
		img.setAttribute('src','');
		img.setAttribute('alt','提示');
		img.setAttribute('class','tipImage glyphicon glyphicon-exclamation-sign');
		//img.setAttribute('class','tipImage glyphicon glyphicon-ok');
		var span1 = document.createElement('span');
		span1.setAttribute('class','tipTitle');
		var text1 = document.createTextNode('提示信息');
		span1.appendChild(text1);
		var span2 = document.createElement('span');
		span2.setAttribute('class','tipMsg');
		span2.innerHTML = str;
		html.appendChild(img);
		html.appendChild(span1);
		html.appendChild(span2);
		$$.fn.setStyle(html,this.options);
		document.body.appendChild(html);
		return html;
	};
	$$.layer.msg = function(str){
        var timr;
        if(this.state){
            $$.addClass(document.getElementById('layer_msg'),'swing');
            setTimeout(function(){
                $$.removeClass(document.getElementById('layer_msg'),'swing');
            },500);
            return;
        }
        var _self = this;
        if(arguments.length==2){
            for(var i in arguments[1]){
                if(arguments[1].hasOwnProperty(i)){
                    switch(i){
                        case 'icon':
                            this.options.backgroundColor = arguments[1][i];
                            break;
                        case 'time':
                            timr = arguments[1][i];
                            break;
                        default:
                            break;
                    }
                }
            }
        }
		var layer = this.create(str);
		$$.an.startMove(layer,{right:0,opacity:100},2,function(){
            _self.state = true; //判断是否已经弹出
            var widths =  parseInt(_self.options.width);
			setTimeout(function(){
                $$.an.startMove(layer,{right:30},1,function(){
                    $$.an.startMove(layer,{right:-widths,opacity:0},1,function(){
                        document.body.removeChild(layer);
                        _self.state = false; //判断是否已经弹出
                    });
                });
			},timr||3000);
		});
	};
/****************************************************弹出层结束**********************************************************/
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


