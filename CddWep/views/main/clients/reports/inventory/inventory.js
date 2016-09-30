/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：盘点差异报表
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('inventoryCrl',['$scope','$http','url','$location',function($scope,$http,url,$location){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
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

        $scope.title = '盘点差异报表';

        $scope.searchData = {};
        //分页查询
        var currentCheck = function(page,callback){
            var param = app.get('checkValue').dateRangeFormat($scope.searchData);
            $http.post(url+'/difference/showPageList', $.extend({loginname:userInfo.data.loginname},page,param)).success(callback);
        };
        $scope.inventory = app.get('Paginator').list(currentCheck,6);

        $scope.loadDetail = function (id) {
            $location.path('main/clients/reports/inventory/inventoryDetail/'+id)
        };
        //导出
        $scope.downloadFile=function(){
            layer.confirm("是否下载模板？",
                {btn : ['是','否']},function(){
                    window.location.href=url +"/difference/export?loginname="+userInfo.data.loginname;
                    yMake.layer.msg("文件导出成功 ",{icon:1,time:1000});
                    layer.msg("",{time:1});
                })
        };

        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});