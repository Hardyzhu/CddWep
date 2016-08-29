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
                        $http.get(url+'',{id:param}).success(function(data){
                            yMake.layer.msg('删除成功',{icon:1});
                        }).error(function(data){
                            yMake.layer.msg('删除失败',{icon:1});
                        });
                    });
                }else{
                    yMake.layer.msg('请选择需要删除的邮件',{icon:2});
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

                $http.post(url+'/email/receive', $.extend({},page,param)).success(callback);
            };
            $scope.outBox = app.get('Paginator').list(fetchFunction,6);
        }

        //垃圾箱
        function dustbin(){
            //获取收件箱的分页/email/receive
            var fetchFunction = function(page,callback){
                /* var param = app.get('checkValue').searchData($scope.searchData)
                 param.loginname =userInfo.data.loginname;*/
                var param = {};
                param.loginname = userInfo.data.loginname;

                $http.post(url+'/email/send', $.extend({},page,param)).success(callback);
            };
            $scope.outbox = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.inbox);
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


        //排序
        $scope.sort = function(arr,arg,$event){
            var newArr = getObjArr(arr,arg).sort(),tempArr=[],html = $event.target.innerHTML;

            for(var i = 0;i<newArr.length;i++){
                for(var n = 0;n<arr.length;n++){
                    if(arr[n].state==false){
                        continue;
                    }
                    if(arr[n][arg]==newArr[i]){
                        tempArr.push(arr[n]);
                        arr[n]._state = false;
                        break;
                    }
                }
            }
            if(html.indexOf('↓')==-1&&html.indexOf('↑')==-1){
                $scope.items = tempArr;
                $event.target.innerHTML = html+'↑';
            } else if(html.indexOf('↑')!=-1){
                $scope.items =  tempArr.reverse();
                $event.target.innerHTML = html.substr(0,html.length-1)+'↓';
            } else if(html.indexOf('↓')!=-1){
                $scope.items = tempArr;
                $event.target.innerHTML = html.substr(0,html.length-1)+'↑';
            }
            $($event.target).parent().siblings().each(function(){
                var text  = $(this).children().html();
                if(text.indexOf('↓')!=-1||text.indexOf('↑')!=-1){
                    $(this).children().html(text.substr(0,text.length-1))
                }
            })
        };

        //获取对象属性数组
        function getObjArr(arr,arg){
            var newArr = [];
            for(var n in arr){
                if(arr.hasOwnProperty(n)){
                    for(var i in arr[n]){
                        if(arr[n].hasOwnProperty(i)&&i==arg){
                            newArr.push(arr[n][i]);
                        }
                    }
                }
            }
            return newArr;
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
        //获取选中id集合
        $scope.selectedIds = function(selector){
            var arr = [];
            $(selector).find('input[type=checkbox]').each(function(){
                if(this.checked){
                    arr.push(this.value);
                }
            });
            return arr;
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
