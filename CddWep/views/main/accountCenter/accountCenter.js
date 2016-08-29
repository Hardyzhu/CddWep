/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：账户中心
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('accountCenterCrl', ['$scope', 'url', '$http', function ($scope, url, $http) {

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        console.log(role);
        $scope.brand = false;                        //(物流)
        $scope.transport = false;                    //(品牌)
        $scope.parentTitle = '';                        //父标题
        if (role == 1) {
            $scope.parentTitle = '我的账单';     //我的账户(品牌)
            $scope.brand = true;
        } else if (role == 2) {
            $scope.parentTitle = '账户中心';     //账户中心(物流)
            $scope.transport = true;
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
        var currentCheck = function (page, callback) {
            console.log($scope.searchData);
            var param = app.get('checkValue').searchData($scope.searchData);
            console.log(param);
            $http.post(url + '/bill/showPageList?loginname='+userInfo.data.loginname, $.extend({}, page,param)).success(callback);
        };
        $scope.bill = app.get('Paginator').list(currentCheck, 6);
        $scope.searchPaginator =$scope.bill;
        console.log($scope.searchPaginator);


        //获取所有的省
        $http.get(url + '/location/loadProvince').success(function (data) {
            $scope.provinces = data.data;
        });
        //根据省id获取城市
        $scope.getCity = function (province) {
            $scope.searchData.city = '';
            $http.get(url + '/location/loadCity?id=' + province).success(function (data) {
                $scope.cities = data.data;
            })
        };
        //本月应收款
        $http.get(url + '/bill/currenttotalsum?loginname=' + userInfo.data.loginname).success(function (data) {
            if (data.code == 0) {
                $scope.currenttotalsum = 0;
            }
            else {
                $scope.currenttotalsum = data.data;
            }
            console.log(data);
        });
        //累计应收款
        $http.get(url + '/bill/totalsum?loginname=' +userInfo.data.loginname).success(function (data) {
            if (data.code == 0) {
                $scope.totalsum = 0;
            }
            else {
                $scope.totalsum = data.data;
            }
            console.log(data);
        });

        //查看
        $scope.billCheck = function (item) {

            console.log(item);
            $('#demandNew').modal({backdrop: 'static', keyboard: false});
            $scope.modalTitle = '账单明细';
            $scope.bill = item;//缓存
        };

        // 导出
        $scope.downloadFile = function () {

            window.location.href = url + '/bill/export?loginname=' + userInfo.data.loginname;
        };

        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});