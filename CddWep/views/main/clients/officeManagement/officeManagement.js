/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：公函管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('officeManagementCrl',['$scope','$http','url',function($scope,$http,url){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        if(role==1){
            $scope.parentTitle = '我的服务商';
            $scope.demand = true;
        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.services = true;
        }

        //按需加载
        $scope.render = function(res){
            //1.收件箱 2.发件箱 3.垃圾箱 4.发邮件
            switch (+res){
                case 1:
                    inBox();
                    break;
                case 2:
                    outBox();
                    break;
                case 3:
                    dustbin();
                    break;
                default :
                    email();
                    break;
            }
        };
        //默认加载收件箱
        inBox();
        //收件箱
        function inBox(){
            //获取收件箱的分页/email/receive
            var fetchFunction = function(page,callback){
                /* var param = app.get('checkValue').searchData($scope.searchData)
                 param.loginname =userInfo.data.loginname;*/
                var param = {};
                param.loginname = userInfo.data.loginname;

                $http.post(url+'/email/receive', $.extend({},page,param)).success(callback);
            };
            $scope.inbox = app.get('Paginator').list(fetchFunction,6);

            //删除及标记已读
            $scope.delOrread = function(key){
                var innerface = '';
                var info = '';
                var info1 = '';
                if(key==1){
                    innerface = '/email/receive/delete';
                    info = '删除';
                    info1 = '删除';
                }else{
                    innerface = '/email/receive/setlotsread';
                    info = '标记为已读';
                    info1 = '标记成功';
                }
                var param = '';
                var inboxs = document.getElementsByName('inbox');
                for(var i = 0, ii = inboxs.length ; i < ii; i++){
                    if(inboxs[i].checked==true){
                        param += inboxs[i].value + ',';
                    }
                }
                console.log(param);
                if(param!=''){
                    var index = param.search(new RegExp('\\,$','gi'));
                    if(index>0)param = param.substring(0,index);
                    layer.confirm('确定'+info+'？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        layer.closeAll('dialog');
                        $http.post(url + innerface,{ids:param}).success(function(data){
                            yMake.layer.msg(info1+'成功',{icon:1});
                            $scope.inbox._load();
                        }).error(function(data){
                            yMake.layer.msg(info1+'失败',{icon:2});
                        });
                    });
                }else{
                    yMake.layer.msg('请选择需要'+info1+'的邮件',{icon:2});
                }
            };
        }

        //发件箱
        function outBox(){
            //获取收件箱的分页/email/receive
            var fetchFunction = function(page,callback){
                /* var param = app.get('checkValue').searchData($scope.searchData)
                 param.loginname =userInfo.data.loginname;*/
                var param = {};

                param.loginname = userInfo.data.loginname;

                $http.post(url+'/email/send', $.extend({},page,param)).success(callback);
            };
            $scope.outBox = app.get('Paginator').list(fetchFunction,6);

            //删除
            $scope.del = function(){
                var param = '';
                var inboxs = document.getElementsByName('inbox');
                for(var i = 0, ii = inboxs.length ; i < ii; i++){
                    if(inboxs[i].checked==true){
                        param += inboxs[i].value + ',';
                    }
                }
                console.log(param);
                if(param!=''){
                    var index = param.search(new RegExp('\\,$','gi'));
                    if(index>0)param = param.substring(0,index);
                    layer.confirm('确定删除？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        layer.closeAll('dialog');
                        $http.post(url + '/email/send/delete',{ids:param}).success(function(data){
                            yMake.layer.msg('删除成功',{icon:1});
                            $scope.inbox._load();
                        }).error(function(data){
                            yMake.layer.msg('删除失败',{icon:2});
                        });
                    });
                }else{
                    yMake.layer.msg('请选择需要删除的邮件',{icon:2});
                }
            };
        }

        //垃圾箱
        function dustbin(){
            //获取收件箱的分页/email/receive
            var fetchFunction = function(page,callback){
                /* var param = app.get('checkValue').searchData($scope.searchData)
                 param.loginname =userInfo.data.loginname;*/
                var param = {};
                param.loginname = userInfo.data.loginname;

                $http.post(url+'/email/dusbin', $.extend({},page,param)).success(callback);
            };
            $scope.dustbin = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.dustbin);

            //垃圾箱删除
            $scope.dustbins = function(item){
                switch (item){
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    default :
                        break;
                }
            };
        }

        //发邮件
        function email(){
            //获取收件箱的分页/email/receive
            var fetchFunction = function(page,callback){
                /* var param = app.get('checkValue').searchData($scope.searchData)
                 param.loginname =userInfo.data.loginname;*/
                var param = {};
                param.loginname = userInfo.data.loginname;

                $http.post(url+'/email/send', $.extend({},page,param)).success(callback);
            };
            $scope.inbox = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.inbox);
        }

        //全选/全不选
        $scope.selectAll = function(selector,$event){
            var inputs = $(selector).find('input[type=checkbox]'),boolean=true;
            inputs.each(function(){
               if(this.checked==false){
                   boolean = false;
               }
            });
            if(boolean){
                inputs.each(function(){
                    this.checked=false;
                });
                $event.target.checked = false;
            }else{
                inputs.each(function(){
                    this.checked=true;
                });
                $event.target.checked = true;
            }
        };

        $scope.email = {address:'',title:'',content:''};
        //发送邮件
        $scope.sendEmail = function(){
            var checkValue = app.get('checkValue'),info={};
             info.address = checkValue.isEmail($scope.email.address||'');
            if(!info.address.state){
                yMake.layer.msg('收件人地址不正确!',{icon:2});
                return;
            }
        };
        $scope.contacts = [
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'舒恒',
                address:'shuheng@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            }
        ];

        $scope.selectContact = function (item) {
            $scope.email.address += item.name+'<'+item.address+'>;';
        };
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
