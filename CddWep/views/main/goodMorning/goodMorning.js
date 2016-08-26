/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：早安1919
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('goodMorningCrl', ['$scope', '$http', 'url', function ($scope, $http, url) {

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo')), checkVlaue = app.get('checkValue');
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.services = false;                        //服务项目(物流)
        if (role == 1) {
            $scope.demand = true;
            loadPP();
        } else if (role == 2) {
            $scope.services = true;
            loadWL();
        }

        //物流
        function loadWL() {
            //分页
            var currentBrand = function (page, callback) {
                console.log($scope.searchData);
                var parm = app.get('checkValue').searchData($scope.searchData);
                console.log('123');
                console.log(parm);
                $http.post(url + '/paper/showPageList', $.extend({}, page, parm)).success(callback);
            };
            $scope.currentBrand = app.get('Paginator').list(currentBrand, 6);

            //下载
            $scope.down = function (item) {
                console.log(item.content);
                window.location.href = url + '/file/download?path=' + item.content;
                //window.location.href();
            };
        }

        //品牌
        function loadPP() {
            //分页
            var currentBrand = function (page, callback) {
                console.log($scope.searchData);
                var parm = app.get('checkValue').searchData($scope.searchData);
                console.log('123');
                console.log(parm);
                $http.post(url + '/paper/showPageList', $.extend({}, page, parm)).success(callback);
            };
            $scope.currentBrand = app.get('Paginator').list(currentBrand, 6);

            //下载
            $scope.down = function (item) {
                console.log(item.content);
                window.location.href = url + '/file/download?path=' + item.content;
                //window.location.href();
            };
        }

    }]);
});