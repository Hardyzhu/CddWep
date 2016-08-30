/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：公函管理
 */
define(function(require){
    var app = require('../../../../app');

    app.filter('sendState',function(){
        return function(inp){
            //0已删除 1未读 2已读
            var info = '';
            switch (inp){
                case '1':
                    info = '未读';
                    break;
                case '2':
                    info = '已读';
                    break;
                case '':
                    info = '已删除';
                    break;

            }
            return info;
        }
    });

    app.filter('emailFormat',function(){
        return function(inp){
            if(inp==''||inp==null){
                return '';
            }else{
                return '<'+inp+'>';
            }
        }
    });

    app.controller('officeManagementCrl',['$scope','$http','url','$location','$state',function($scope,$http,url,$location,$state){

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

            //查看的点击事件
            $scope.lookSome=function(id){
                $state.go('main.clients.officeManagement.lookEmail',{'id':id});

            };
            //获取收件箱的分页/email/receive+搜索
            var fetchFunction = function(page,callback){
                /* var param = app.get('checkValue').searchData($scope.searchData)
                 param.loginname =userInfo.data.loginname;*/
                var param = {
                    loginname:userInfo.data.loginname,
                    title:$scope.searchTitle
                };

                $http.post(url+'/email/receive', $.extend({},page,param)).success(callback);
            };
            $scope.inbox = app.get('Paginator').list(fetchFunction,6);
            console.log(123);
            console.log($scope.inbox);

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
                    info1 = '标记';
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
                var param = {
                    loginname:userInfo.data.loginname,
                    title:$scope.searchTitle
                };
                $http.post(url+'/email/send', $.extend({},page,param)).success(callback);
            };
            $scope.outbox = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.outbox);
            //删除
            $scope.del = function(){
                var param = '';
                var inboxs = document.getElementsByName('outbox');
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
                            $scope.outbox._load();
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
                var param = {};
                param.loginname = userInfo.data.loginname;

                $http.post(url+'/email/dusbin', $.extend({},page,param)).success(callback);
            };
            $scope.dustbin = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.dustbin);
            //垃圾箱删除
            $scope.dustbins = function(item){
                //1,删除  2,还原  3，清空
                switch (item){
                    case 1:
                        del();
                        break;
                    case 2:
                        restore();
                        break;
                    case 3:
                        empty();
                        break;
                    default :
                        break;
                }
            };

            //删除
            function del(){
                var param = '';
                var inboxs = document.getElementsByName('dustbin');
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
                            $scope.dustbin._load();
                        }).error(function(data){
                            yMake.layer.msg('删除失败',{icon:2});
                        });
                    });
                }else{
                    yMake.layer.msg('请选择需要删除的邮件',{icon:2});
                }
            }

            //还原
            function restore(){
                var param = '';
                var inboxs = document.getElementsByName('dustbin');
                for(var i = 0, ii = inboxs.length ; i < ii; i++){
                    if(inboxs[i].checked==true){
                        param += inboxs[i].value + ',';
                    }
                }
                console.log(param);
                if(param!=''){
                    var index = param.search(new RegExp('\\,$','gi'));
                    if(index>0)param = param.substring(0,index);
                    layer.confirm('确定还原？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        layer.closeAll('dialog');
                        $http.post(url + '/email/receive/setlotsread',{ids:param}).success(function(data){
                            yMake.layer.msg('还原成功',{icon:1});
                            $scope.dustbin._load();
                        }).error(function(data){
                            yMake.layer.msg('还原失败',{icon:2});
                        });
                    });
                }else{
                    yMake.layer.msg('请选择需要还原的邮件',{icon:2});
                }
            }

            //清空
            function empty(){
                layer.confirm('确定清空垃圾箱？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    layer.closeAll('dialog');
                    $http.post(url + '/email/dusbin/delete').success(function(data){
                        yMake.layer.msg('清空成功',{icon:1});
                        $scope.dustbin._load();
                    }).error(function(data){
                        yMake.layer.msg('清空失败',{icon:2});
                    });
                });
            }
        }

        //发邮件
        function email(){
            //获取收件箱的分页/email/receive
            $scope.par = {};
            var fetchFunction = function(page,callback){
                $http.post(url+'/email/showPageList', $.extend({},page,$scope.par)).success(callback);
            };
            $scope.book = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.book);

            //初始化发件箱
            $scope.email = {address:'',title:'',content:'',receid:''};
            //发送邮件
            $scope.sendEmail = function(){
                var checkValue = app.get('checkValue'),info={};
                info.address = checkValue.isAllEmail($scope.email.address);
                if(!info.address.state){
                    yMake.layer.msg(info.address.info,{icon:2});
                    return;
                }
                $scope.email.receid = $scope.email.receid.replace(new RegExp('\\,$','i'),'');
                $scope.email.loginname = userInfo.data.loginname;
                console.log($scope.email);
                $http.post(url+'/email/add',$scope.email).success(function(data){
                    console.log(data);
                    yMake.layer.msg('发送成功',{icon:1});
                    $scope.email = {};
                }).error(function(){
                    yMake.layer.msg('发送失败',{icon:2});
                });
            };

            //选取id
            $scope.selectContact = function (item) {
                $scope.email.receid += item.id + ',';
                $scope.email.address += item.name+'<'+item.email+'>;';
            };
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


        $scope.contacts = [
            {
                id:'1',
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                id:'2',
                name:'舒恒',
                address:'shuheng@qq.com'
            },
            {
                id:'3',
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                id:'4',
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                id:'5',
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                id:'6',
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                id:'7',
                name:'叶圣强',
                address:'Yeshengqiang@qq.com'
            },
            {
                id:'8',
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


        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
