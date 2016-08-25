/**
 *  作者：cl
 *    时间：2016-08-10
 *    描述：差错管理
 */
define(function (require) {
    var app = require('../../../../app');

    app.controller('errorManagementCrl', ['$scope', '$http', 'url', function ($scope, $http, url) {


        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.backstage = false;                       //后台
        $scope.parentTitle = '';                        //父标
        $scope.title = '';                        //子标题
        if(role==1){
            $scope.parentTitle = '我的服务商';
            $scope.title = '差错管理';
            $scope.demand = true;
            demFun();
        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.title = '差错管理';
            $scope.services = true;
            serFun();
        }else{
            $scope.parentTitle = '品质中心';
            $scope.backstage = true;
            bacFun();
        }

        //物流方法
        function serFun(){
            //下拉菜单
            $scope.selected ='';
            $scope.dropdownItems=[
                {name:'1', value:'1'},
                {name:'2', value:'2'},
                {name:'3', value:'3'},
                {name:'4', value:'4'}
            ];

            //ng-model="searchData.type2"
            //物流分页+查询
            var fetchFunction = function (page, callback) {
                console.log($scope.searchData);
                var parm = app.get('checkValue').searchData($scope.searchData);
                console.log('123');
                console.log(parm);
                $http.post(url+'/mistake/showPageList?loginname='+userInfo.data.loginname, $.extend({},page, parm)).success(callback)
            };
            $scope.serData = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.serData);
            //物流的导出
            $scope.serExport = function(){
                window.location.href = url+'/mistake/export';
            };

            //取消按钮点击事件
            $scope.cancle = function(){
                //清空数据
                $scope.errorContent={};
            };


            //物流的申述--提交部分
            $scope.errorContent={};
            $scope.addSer = function(){
                console.log($scope.errorContent);
                if(($scope.errorContent.a==undefined)||($scope.errorContent.a==null&&$scope.errorContent.b==undefined&&$scope.errorContent.b==null)){
                    yMake.layer.msg('所填内容不能为空!', {icon: '2'});
                    return;
                }
                $http.post(url + '/mistake/update', $scope.errorContent).success(function (data) {
                    console.log(data);
                    $scope.serData._load();
                    $scope.errorContent={};
                    yMake.layer.msg('申述成功!', {icon: '1', time: 2000});
                }).error(function () {
                    yMake.layer.msg('申述失败!', {icon: '2', time: 2000});
                });
            };
        }

        //品牌方法
        function demFun(){
            //初始化
            $scope.mistake = {};
            $scope.searchData = {};
            //模拟数据
            $scope.items = [
                {name:'类型1',value:'1'},
                {name:'类型2',value:'2'},
                {name:'类型3',value:'3'},
                {name:'类型4',value:'4'}
            ];

            //品牌分页+查询
            var fetchFunction = function (page, callback) {
                console.log($scope.searchData);
                var parm = app.get('checkValue').searchData($scope.searchData);
                console.log('123');
                console.log(parm);
                $http.post(url+'/mistake/showPageList?loginname='+userInfo.data.loginname, $.extend({},page, parm)).success(callback)
            };
            $scope.demData = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.serData);

            //品牌的上报--打开模态框
            $scope.report = function(item){
                $('#demandNew').modal('show');
                console.log(item);
            };

            //新增差错
            $scope.addMistake = function(){
                console.log($scope.mistake);
                $('#demandNew').modal('hide');
                $http.post(url+'/mistake/add',$scope.mistake).success(function(data){
                    console.log(data);
                    $scope.demData._load();
                    yMake.layer.msg('上传成功！',{icon:1});
                    $scope.mistake={};
                }).error(function(){
                    yMake.layer.msg('上传出错！',{icon:2})
                })
            };
            //取消
            $scope.close = function(){
                //清空数据
                $scope.mistake={};
            };
            $scope.demExport=function(){
                layer.confirm("是否导出文件？",
                    {btn : ['是','否']},function(){
                        window.location.href=url +"/mistake/export";
                        yMake.layer.msg("导出总结文件成功 ",{icon:1,time:1000});
                        layer.msg("",{time:1});
                    })
            };

        }

        //后台方法
        function bacFun(){
            //物流分页
            var fetchFunction = function (page, callback) {
                var param = app.get('checkValue').searchData($scope.searchData)
                $http.post(url+'/mistake/showPageList?loginname='+userInfo.data.loginname, $.extend({},page,param)).success(callback)
            };
            $scope.bacData = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.bacData);
            //物流的导出
            $scope.serExport = function(){
                window.location.href = url+'/mistake/export';
                yMake.layer.msg('导出成功',{icon:1});
            };

            //判定
            $scope.decide = function(id){
                var info = {};
                info.id = id;
                info.appeal = '0';
                layer.confirm('判定', {
                    btn: ['有错','无错'] //按钮
                }, function(){
                    layer.closeAll('dialog');
                    info.appeal = '1';
                    $http.post(url+'/mistake/updateAppeal',info).success(function(data){
                        yMake.layer.msg('判定成功',{icon:1});
                    }).error(function(){
                        yMake.layer.msg('判定失败',{icon:2});
                    });
                }, function(){
                    info.appeal = '2';
                    $http.post(url+'/mistake/updateAppeal',info).success(function(data){
                        yMake.layer.msg('判定成功',{icon:1});
                    }).error(function(){
                        yMake.layer.msg('判定失败',{icon:2});
                    });
                });
            };

        }
    }]);
});