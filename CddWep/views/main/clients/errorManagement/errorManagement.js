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
        if(role==1){
            $scope.parentTitle = '我的服务商';
            $scope.demand = true;
            demFun();
        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.services = true;
            serFun();
        }else{
            $scope.parentTitle = '品质中心';
            $scope.backstage = true;
            bacFun();
        }

        //物流方法
        function serFun(){

            //物流分页
            var fetchFunction = function (page, callback) {
                $http.post(url+'/mistake/showPageList', $.extend({},page,{})).success(callback)
            };
            $scope.serData = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.serData);
            //物流的导出
            $scope.serExport = function(){
                window.location.href = url+'/mistake/export';
            };

            //物流的申述--打开模态框
            $scope.appeal = function(item){
                $('#appeal').modal('show');
                console.log(item);
            };

            //物流的申述--提交部分
            $scope.addSer = function(id){

            };
        }

        //品牌方法
        function demFun(){

        }

        //后台方法
        function bacFun(){
            //物流分页
            var fetchFunction = function (page, callback) {
                $http.post(url+'/mistake/showPageList', $.extend({},page,{})).success(callback)
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