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
            $scope.upSer = function(id){

            };
        }

        //品牌方法
        function demFun(){
            //初始化
            $scope.mistake = {};
            //模拟数据
            $scope.items = [
                {name:'类型1',value:'1'},
                {name:'类型2',value:'2'},
                {name:'类型3',value:'3'},
                {name:'类型4',value:'4'}
            ];

            //品牌分页
            var fetchFunction = function (page, callback) {
                $http.post(url+'/mistake/showPageList', $.extend({},page,{})).success(callback)
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
                $http.post(url+'/mistake/add?loginname='+userInfo.data.loginname,$scope.mistake).success(function(data){
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
    }]);
});