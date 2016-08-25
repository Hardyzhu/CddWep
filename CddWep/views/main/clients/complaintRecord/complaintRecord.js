/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：投诉管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('complaintRecordCrl',['$scope','url','$http','$location',function($scope,url,$http,$location){
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //一级标题
        $scope.title='';                                //二级标题
        $scope.nextTitle='';                            //三级标题
        if(role==1){
            //品牌 我的服务商  投诉管理
            $scope.parentTitle = '我的服务商';
            $scope.title='投诉管理';
            $scope.demand = true;
        }else if(role==2){
            //物流 我的客户  投诉管理
            $scope.parentTitle = '我的客户';
            $scope.title='投诉管理';
            $scope.services = true;
        }else if(role==3){
            //后台 品质中心 投诉管理 投诉明细/投诉数据分析

        }

        //下拉列表值
        $scope.division=[
             {name:'1',value:'1'},
             {name:'2',value:'2'},
             {name:'3',value:'3'},
             {name:'4',value:'4'}
        ];



        //获取分页数据
        var fetchFunction = function (page, callback) {
            console.log($scope.searchData);
            var parm = app.get('checkValue').searchData($scope.searchData);
            console.log('123');
            console.log(parm);
            $http.post(url+'/complaint/showPageList', $.extend({},page, parm)).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        console.log($scope.serData);


        //导出
        $scope.exp=function(){
        	layer.confirm("是否导出文件？",
                {btn : ['是','否']},function(){
                    window.location.href=url +"/complaint/export";
                    yMake.layer.msg("导出总结文件成功 ",{icon:1,time:1000});
                    layer.msg("",{time:1});
                })
        };

        $scope.returnMessage=function(){
            $http.post(url+'warehouse').success(function(){
                //console.log(data);
            });
        };

        //回复
        $scope.reply = function(item){
            $scope.replyInfo = item;
        };

        //保存回复
        $scope.replySave = function(){
            if($scope.replyInfo.replyagain==null&&$scope.replyInfo.replyagain==undefined){
                yMake.layer.msg('所填内容不能为空!', {icon: '2'});
                return;
            }
            $http.post(url+'/complaint/addReply',$scope.replyInfo).success(function (data) {
                console.log(data);
                $scope.searchPaginator._load();
                $scope.replyInfo={};
                yMake.layer.msg('回复成功!', {icon: '1', time: 2000});
            }).error(function () {
                yMake.layer.msg('回复失败!', {icon: '2', time: 2000});
            });
        };

        //查看
        $scope.lookSome=function(item){
            console.log(item);
            $scope.khrequest={};
            $scope.khrequest.a=item.description;
            $scope.khrequest.b=item.time1;
            $scope.khrequest.c=item.time2;
            $scope.khrequest = {};
            $scope.sopInfo={};
        };

        //上报投诉
        $scope.upData = {};
        $scope.complainUp = function () {
            console.log($scope.sopInfo);
            if(($scope.sopInfo.type==null&&$scope.sopInfo.type==undefined)&&($scope.sopInfo.description==null&&$scope.sopInfo.description==undefined)){
                yMake.layer.msg('所填内容不能为空!', {icon: '2'});
                return;
            }
                $http.post(url + '/complaint/addComplaint?loginname='+userInfo.data.loginname, $scope.sopInfo).success(function (data) {
                    console.log(data);
                    $scope.searchPaginator._load();
                    $scope.khrequest = {};
                    $scope.answerIt={};
                    $scope.sopInfo={};
                    yMake.layer.msg('添加成功!', {icon: '1', time: 2000});
                }).error(function () {
                    yMake.layer.msg('添加失败!', {icon: '2', time: 2000});
                });
        };


        //评价功能
        $scope.upData = {};
        $scope.answerIt={};
        $scope.complainUp = function () {
            console.log($scope.answerIt);
            if($scope.answerIt.a==undefined&&$scope.answerIt.a==null){
                yMake.layer.msg('选择项不能为空!', {icon: '2'});
                return
            }
            $http.post(url + '/complaint/updateStatus', $.extend($scope.answerIt)).success(function (data) {
                console.log(data);
                $scope.searchPaginator._load();
                yMake.layer.msg('评价成功!', {icon: '1', time: 2000});
            }).error(function () {
                yMake.layer.msg('评价失败!', {icon: '2', time: 2000});
            });

        };

        //取消按钮
        $scope.cancle = function(){
            //清空数据
            $scope.khrequest = {};
            $scope.sopInfo={};
            $scope.answerIt={};
            $scope.replyInfo={};
        };
    }]);
});
