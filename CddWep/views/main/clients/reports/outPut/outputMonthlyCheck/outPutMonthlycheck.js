/**
 *  作者：yeshengqiang
 *    时间：2016-08-09
 *    描述：出入库报表
 */
define(function (require) {
    var app = require('../../../../../../app');
    app.controller('outPutMonthlyCheckCrl', ['$scope', 'url', '$http','$rootScope',function ($scope, url, $http,$rootScope) {
        console.log($rootScope.params.id);
        //条件
        $scope.division = [
            {value: 1, name: '出库'},
            {value: 2, name: '入库'}
        ];
        $scope.searchData = {};

        ////获取用户信息
        //var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        ////获取对应角色
        //var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        //$scope.transport = false;                        //(物流)
        //$scope.brand = false;                          //(品牌)
        //$scope.parentTitle = '';                        //父标题
        //if (role == 1) {
        //    $scope.parentTitle = '我的服务商';
        //    $scope.brand = true;
        //} else if (role == 2) {
        //    $scope.parentTitle = '我的客户';
        //    $scope.transport = true;
        //}

        var param = $rootScope.params;
        console.log(param);
        $http.post(url+'/outinput/checkMinute?shdate', $.extend({shdate:param.shdate},$scope.searchData))
            .success(function(data){
                $scope.searchData  = data;
                console.log($scope.searchData );
            });

       // yMake.fn.autoHeight('.bgWhite',45);
    }]);
});