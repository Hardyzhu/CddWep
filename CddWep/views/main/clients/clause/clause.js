/**
 *  作者：yeshengqiang
 *    时间：2016-08-09
 *    描述：合同条款
 */
define(function (require) {
    var app = require('../../../../app');
    app.controller('serviceTeamCrl', ['$scope', 'url', '$http', function ($scope, url, $http) {

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        if (role == 1) {
            $scope.parentTitle = '我的服务商';
            $scope.demand = true;
            demFun();
        } else if (role == 2) {
            $scope.parentTitle = '我的客户';
            $scope.services = true;
            serFun();
        }
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

        //初始化
        $scope.searchData = {};

        //品牌
        function demFun() {
            //公共分页方法
            var fetchFunction = function (page, callback) {
                var param = app.get('checkValue').searchData($scope.searchData);
                $http.post(url + '/pact/showPageList?loginname=' + userInfo.data.loginname, $.extend({}, page, param)).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.searchPaginator);

            //下载
            $scope.download = function (fileName) {
                window.open(url + '/file/download?path=' + fileName, '_top');
            };
        }

        //物流
        function serFun() {
            //公共分页方法
            var fetchFunction = function (page, callback) {
                var param = app.get('checkValue').searchData($scope.searchData);
                console.log(param);
                $http.post(url + '/pact/showPageList?loginname=' + userInfo.data.loginname, $.extend({}, page, param)).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.searchPaginator);

            //下载
            $scope.download = function (fileName) {
                window.open(url + '/file/download?path=' + fileName, '_top');
            };
        }




        //yMake.fn.autoHeight('.bgWhite',45);
    }]);
});