/**
 *  作者：yeshengqiang
 *	时间：2016-08-12
 *	描述：验证
 */
define(function(require){
    var app = require('../app');

    app.service('checkValue',function(){
        var service = {}
            //检查是否为空
            service.isNull = function(str){
                var res = {info:'',state:false};
                if(typeof str=='number')
                {
                    str = str.toString();
                }
                if(angular.isUndefined(str) || str==null || str==''){
                    res.info = '输入为空!';
                    res.state = true;
                }else{
                    res.info = '输入不为空!';
                    res.state = false;
                }
                return res;
            };
            service.isType = function(arg,type){
                return typeof arg === type?true:false;
            };
            //检查是否为整数（传入第二个参数 bool） true 为正整数 false 为负整数
            service.isInt =function(){
                var res = {info : '', state : false};
                if(this.isNull(arguments[0]).state||!this.isType(arguments[0],'number')){
                   res.info = '输入有误';
                   res.state = false;
                } else{
                    var reg1 = new RegExp("^\\d+$");
                    var reg2 = new RegExp("^-\\d+$");
                    if(arguments[1]){
                        if(reg1.test(arguments[0])){
                            res.state = true;
                            res.info = '输入为正整数';
                        }
                    }else{
                        if(reg2.test(arguments[0])){
                            res.state = true;
                            res.info = '输入为负整数';
                        }
                    }
                    res.state = false;
                    res.info = '输入有误';
                }
                return res;
            };
            service.isObjNull = function(obj){
                for(var i in obj){
                    if(i!=undefined){
                        return false;
                    }
                }
                return true;
            };
        return service
    });

});
