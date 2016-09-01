/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：账户中心
 */
define(function (require) {
    var app = require('../../../../app');
    //过滤器
    app.filter('typeFormat', function () {
        return function (inp) {
            //类型暂未给出
            var info = "";
            switch (inp) {
                case '1':
                    info = '仓储管理费';
                    break;
                case '2':
                    info = '配送费';
                    break;
                case '3':
                    info = '干线调拨费';
                    break;
                case '4':
                    info = '退货费';
                    break;
            }
            return info;
        };
    });
    app.controller('accountCenterCheckCrl', ['$scope', 'url', '$http','$rootScope', function ($scope, url, $http,$rootScope) {

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.parentTitle = '';                        //父标题
        $scope.childTitle='';                           //子标题
        if (role == 1) {
            $scope.parentTitle = '我的账单';     //我的账户(品牌)
            $scope.childTitle='我的账单明细';
        } else if (role == 2) {
            $scope.parentTitle = '账户中心';     //账户中心(物流)
            $scope.childTitle='账户中心明细';
        }
        //条件
        $scope.division = [
            {value: 1, name: '仓储管理费'},
            {value: 2, name: '配送费'},
            {value: 3, name: '干线调拨费'},
            {value: 3, name: '退货费'}
        ];
        $scope.searchData = {};

        //获取分页数据
        //var currentCheck = function (page, callback) {
        //    var param = app.get('checkValue').dateRangeFormat($scope.searchData);
        //    //$http.post(url + '/bill/showPageList?loginname='+userInfo.data.loginname, $.extend({}, page,param)).success(callback);
        //    $http.post(url + '/bill/showPageList?loginname='+'tf', $.extend({}, page,param)).success(callback);
        //};
        //$scope.bill = app.get('Paginator').list(currentCheck, 6);
        //$scope.searchPaginator =$scope.bill;

        var param = $rootScope.params;
        $http.post(url + '/bill/checkminnute', $.extend({loginname:userInfo.data.loginname,type: param.type}, $scope.searchData))
            .success(function (data) {
                $scope.searchData = data;
                console.log( $scope.searchData);
            });

        // 导出
        $scope.downloadFile = function () {

            window.location.href = url + '/bill/export?loginname=' + userInfo.data.loginname;
        };

        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});