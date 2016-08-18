/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：盘点差异报表
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('inventoryCrl',['$scope',function($scope){

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
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});