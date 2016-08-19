/**
 *  作者：yeshengqiang
 *	时间：2016-08-12
 *	描述：验证
 */
define(function(require){
    var app = require('../app');

    app.service('checkValue',function(){
        var service = {};
            //存放正则表达式
            service.options = {};
            service.options.chinese = /[\u4e00-\u9fa5]/;                                   //匹配中文
            service.options.email = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;                     //匹配邮箱
            service.options.blankRow = /\n\s*\r/;                                          //空白行
            service.options.url = /[a-zA-z]+:\/[^\s]*/;                                    //匹配网址URL
            service.options.tel = /\d{3}-\d{8}|\d{4}-\{7,8}/;                              //匹配国内电话号码
            service.options.phone = /^(13[0-9])|(15[^4,\D])|(18[0,5-9])\d{8}$/;            //匹配国内手机号码
            service.options.phTel = /^((\d{3}-\d{8}|\d{4}-\d{7,8})|(((13[0-9])|(15[^4,\D])|(18[0,5-9]))\d{8}))$/;            //匹配国内手机号码/手机号码
            service.options.qq = /[1-9][0-9]{4,}/;                                         //匹配腾讯QQ号
            service.options.postcode = /[1-9]\d{5}(?!\d)/;                                 //匹配中国邮政编码
            service.options.cardNo = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;     //匹配18位身份证号码
            service.options.date = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/;     //匹配（年-月-日）格式信息
            service.options.positiveInteger = /^[1-9]\d*$/;                                //匹配正整数
            service.options.negtiveInteger  = /^-[1-9]\d*$/;                               //匹配负整数
            service.options.int = /^-?[1-9]\d*$/;                                          //匹配整数
            service.options.positiveFloat = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;              //匹配正浮点数
            service.options.negtiveFloat = /^-[1-9]\d*\.\d*|-0\.\d*[1-9]\d*$/;             //匹配负浮点数
            //检查是否为空
            service.isNull = function(str){
                var res = {info:'',state:false};
                if(typeof str=='number')
                {
                    str = str.toString();
                }
                if(angular.isUndefined(str) || str==null || str==''){
                    res.info = '请输入';
                    res.state = false;
                }else{
                    res.info = '正确';
                    res.state = true;
                }
                return res;
            };
            //检查对应的类型
            service.isType = function(arg,type){
                return typeof arg === type?true:false;
            };
            //检查是否为整数（传入第二个参数 bool） true 为正整数 false 为负整数
            service.isInt = function(){
                var res = {info : '', state : false};
                if(!this.isNull(arguments[0]).state||!this.isType(arguments[0],'number')){
                   res.info = '请输入';
                   res.state = false;
                } else{
                    if(arguments[1]){
                        if(this.options.positiveInteger.test(arguments[0])){
                            res.state = true;
                            res.info = '输入为正整数';
                        }else{
                            res.state = false;
                            res.info = '请输入大于0的数';
                        }
                    }else{
                        if(this.options.negtiveInteger.test(arguments[0])){
                            res.state = true;
                            res.info = '输入为负整数';
                        }else{
                            res.state = false;
                            res.info = '请输入小于0的数';
                        }
                    }

                }
                return res;
            };
            //判断是否为正确的邮箱地址
            service.isEmail = function(){
                var res = {info : '', state : false};
                if(!this.isNull(arguments[0]).state){
                    res.info = '请输入邮箱';
                    res.state = false;
                } else{
                    if(this.options.email.test(arguments[0])){
                        res.state = true;
                        res.info = '输入为正确';
                    }else{
                        res.state = false;
                        res.info = '请输入正确的邮箱地址';
                    }
                }
                return res;
            };
            //判断是否为正确的电话号码/手机号码（true为电话，false为手机）
            service.isTel = function(){
                var res = {info : '', state : false};
                if(arguments.length==1){
                    if(!this.isNull(arguments[0]).state){
                        res.info = '请输入联系方式';
                        res.state = false;
                    } else{
                        if(this.options.phTel.test(arguments[0])){
                            res.state = true;
                            res.info = '输入正确';
                        }else{
                            res.state = false;
                            res.info = '请输入正确的联系方式';
                        }
                    }
                }else{
                    if(!this.isNull(arguments[0]).state){
                        if(arguments[1]){
                            res.info = '请输入电话号码';
                        }else{
                            res.info = '请输入手机号码';
                        }
                        res.state = false;
                    } else{
                        if(arguments[1]){
                            if(this.options.tel.test(arguments[0])){
                                res.state = true;
                                res.info = '输入为电话号码';
                            }else{
                                res.state = false;
                                res.info = '请输入正确的电话号码';
                            }
                        }else{
                            if(this.options.phone.test(arguments[0])){
                                res.state = true;
                                res.info = '输入为手机号码';
                            }else{
                                res.state = false;
                                res.info = '请输入正确的手机号码';
                            }
                        }
                    }
                }
                return res;
            };
            //判断新密码和重复密码是否相同
            service.isEqual = function(newValue,oldValue){
                var res = {info : '', state : false};
                if(newValue===oldValue){
                    res.state = true;
                    res.info = '正确';
                }else{
                    res.state = false;
                    res.info = '两次密码输入不相符';
                }
                return res;
            };
            //限定密码长度及密码复杂度
            service.isComplex = function(item,info){
                var res = {info : '', state : false};
                var tem = this.isNull(item);
                var reg = /[^a-zA-Z0-9]+/;
                if(!tem.state){
                    res.state = false;
                    res.info = '请输入'+info+'密码';
                    return res;
                }
                if(item.length<6){
                    res.state = false;
                    res.info = info+'密码长度必须大于6位';
                    return res;
                }else if(reg.test(item)){
                    res.state = false;
                    res.info = info+'密码只能包含数字和字母';
                    return res;
                }else{
                    res.state = true;
                    res.info = '通过';
                    return res;
                }
            };
            //判断时间时间格式是否正确
            service.isTimerRight = function(item){
                var res = {info : '', state : false};
                if(angular.isDefined(item)&&item != '' && item != null){
                    if(!this.options.date.test(item)){
                        res.state = false;
                        res.info = '输入的时间格式不正确！';
                    }else{
                        res.state = true;
                        res.info = '输入时间正确！';
                    }
                }else{
                    res.state = true;
                    res.info = '可以为空！';
                }
                return res;
            };
            //判断时间时间格式是否正确且不能为空
            service.isTimerRightAndNotNull = function(item){
                var res = {info : '', state : false};
                if(angular.isDefined(item)&&item != '' && item != null){
                    if(!this.options.date.test(item)){
                        res.state = false;
                        res.info = '输入的时间格式不正确！';

                    }else{
                        res.state = true;
                        res.info = '输入时间正确！';
                    }
                }else{
                    res.state = false;
                    res.info = '不能为空！';
                }
                return res;
            };
            //判断结束时间是否大于开始时间且判断时间格式是否正确且不能为空
            service.isrightTime = function(startTime,endTime){
                var res = {info : '', state : false};
                var start = this.isTimerRightAndNotNull(startTime);
                var end = this.isTimerRightAndNotNull(endTime);
                if(start.state&&end.state)
                {
                    if(endTime<=startTime)
                    {
                        res.state = false;
                        res.info = '开始时间不能大于结束时间！';
                    }else
                    {
                        res.state = true;
                        res.info = '输入正确！';
                    }
                }else if(start.state==false)
                {
                    if(start.info=='输入的时间格式不正确！'){
                        res.state = false;
                        res.info = '开始时间输入的时间格式不正确！';
                    }else{
                        res.state = false;
                        res.info = '开始时间不能为空！';
                    }
                }else if(end.state==false)
                {
                    if(end.info=='输入的时间格式不正确！'){
                        res.state = false;
                        res.info = '结束输入的时间格式不正确！';
                    }else{
                        res.state = false;
                        res.info = '结束时间不能为空！';
                    }
                }
                return res;
            };
            //判断一个对象是否为空
            service.isObjNull = function(obj){
                for(var i in obj){
                    if(i!=undefined){
                        return false;
                    }
                }
                return true;
            };
            //临时中转函数
            service.centerChange = function(obj){
                var temp = {};
                for(var i in obj){
                    temp[i] = obj[i];
                }
                return temp;
            };
        return service
    });

});
