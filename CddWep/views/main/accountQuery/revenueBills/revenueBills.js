/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：客户财务--平台收入账单
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('revenueBillsCrl',['$scope',function($scope){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        console.log(role);
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        if(role==1){
            $scope.parentTitle = '我的账单';
            $scope.demand = true;
        }else if(role==2){
            $scope.parentTitle = '账户中心';
            $scope.services = true;
        }

        //yMake.fn.autoHeight('.bgWhite',45)
    }]);
});
