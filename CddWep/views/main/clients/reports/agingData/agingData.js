/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：时效数据
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('agingDataCrl',['$scope','url','$http',function($scope,url,$http){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.services = false;                        //服务项目(物流)
        $scope.backManage = false;                      //后台管理(后台)
        $scope.parentTitle = '';                        //一级父标题
        $scope.fatherTitle = '';                        //二级父标题
        $scope.title = '';                              //子标题
        $scope.searchData = {};                         //定义对象 前后台传值
        //1 品牌   我的服务商   运营报表   时效数据
        //2 物流   我的客户  运营报表  时效数据
        //3 后台   品质中心  时效管理
        if(role==1){
            $scope.parentTitle ='我的服务商';
            $scope.fatherTitle ='运营报表';
            $scope.title ='时效数据';
            $scope.demand = true;
            //获取分页数据
            var currentCheck = function (page, callback) {
                $http.post(url + '/efficiency/showPageList', $.extend({}, page, $scope.searchData)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);
            //导出点击事件
            $scope.outMessage=function(){
                window.location.href=url+'/efficiency/export';
            };

        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.fatherTitle ='运营报表';
            $scope.title ='时效数据';
            $scope.services = true;
            //获取分页数据
            var currentCheck = function (page, callback) {
                console.log($scope.searchData);
                $http.post(url + '/efficiency/showPageList', $.extend({}, page, $scope.searchData)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);
            //导出点击事件
            $scope.outMessage=function(){
                //var params= {
                //};
                window.location.href=url+'/efficiency/export';
            };

        }else if(role==3){
            $scope.parentTitle ='品质中心';
            $scope.title ='时效管理';
            $scope.backManage = true;
            //获取分页数据
            var currentCheck = function (page, callback) {
                $http.post(url + '/efficiency/showPageList', $.extend({}, page, $scope.searchData)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);
            //导出点击事件
            $scope.outMessage=function(){
                var params= {

                };
                window.location.href=url+'/efficiency/export';
            };

        }

    }]);
});