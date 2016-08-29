/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：公函管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('officeManagementCrl',['$scope',function($scope){

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

        $scope.title = '公函管理';

        $scope.items = [
            {
                id:'1',
                name:'叶圣强2',
                title:'不知道什么鬼4',
                date:'8月22日'
            },{
                id:'2',
                name:'叶圣强1',
                title:'不知道什么鬼3',
                date:'8月22日'
            },{
                id:'3',
                name:'叶圣强3',
                title:'不知道什么鬼1',
                date:'8月22日'
            },{
                id:'4',
                name:'叶圣强5',
                title:'不知道什么鬼2',
                date:'8月22日'
            },{
                id:'5',
                name:'叶圣强4',
                title:'不知道什么鬼5',
                date:'8月22日'
            }
        ];
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
