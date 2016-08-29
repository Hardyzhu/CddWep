/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：仓到店条款
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('clausCrl', ['$scope', 'url', '$http', '$location','$rootScope', function ($scope, url, $http, $location,$rootScope) {
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)

        if (role == 1) {
            $scope.services = true;
        } else if (role == 2) {
            $scope.demand = true;
        } else if (role == 3) {
            $scope.houtai = true;
        }


        //初始化
        $scope.searchData = {};
        if (role == 1) {
            //获取分页数据
            var currentCheck = function (page, callback) {
                console.log(page);
                console.log($scope.searchData);
                var param = app.get('checkValue').searchData($scope.searchData);
                console.log(param);
                $http.post(url + '/storagetoshop/showPageList', $.extend({},page,param)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);

            //下载
            $scope.downloadFile = function (fileName) {
                window.location.href = url + '/file/download?path=' + fileName;
            };
        } else if (role == 2) {
            //获取分页数据
            var currentCheck = function (page, callback) {
                console.log($scope.searchData);
                var param = app.get('checkValue').searchData($scope.searchData);
                console.log(param);
                $http.post(url + '/storagetoshop/showPageList', $.extend({},page,param)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);

            //下载
            $scope.downloadFile = function (fileName) {
                window.location.href = url + '/file/download?path=' + fileName;
            };
        } else if (role == 3) {
            //获取分页数据
            var currentCheck = function (page, callback) {
                console.log($scope.searchData);
                var param = app.get('checkValue').searchData($scope.searchData);
                console.log(param);
                $http.post(url + '/storagetoshop/showPageList', $.extend({}, page, param)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);

            //删除
            $scope.deleteById = function (id) {
                $http.get(url + '/storagetoshop/delete?id=' + id).success(function () {
                    yMake.layer.msg('删除成功！', {time: 2000, icon: 1});
                    $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
                }).error(function () {
                    yMake.layer.msg('删除失败！', {time: 2000, icon: 2});
                });
            };

            //编辑事件
            $scope.edit = function (item) {
                $rootScope.clause = item;
                $location.path('/main/clause/newClause');
            };
        }


        setTimeout(function(){
            yMake.fn.autoHeight('.bgWhite',45);
        },10)
    }]);
});