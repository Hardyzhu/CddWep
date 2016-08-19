/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：通报栏
 */
define(function(require){
    var app = require('../../../app');

    app.controller('navBarCrl',['$scope', 'url', '$http',function($scope, url, $http){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)

        if(role==1){
            $scope.demand = true;
        }else if(role==2){
            $scope.services = true;
        }


        //分页   接口调用有问题
        var fetchFunction = function (page, callback) {
            $http.post(url + '/brief/showPageList', $.extend({}, page, {})).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        console.log($scope.searchPaginator);

        //搜索
        $scope.search = function () {
            var params = {
                tbdate: $scope.tbdate
            };
            var fetchFunction = function (page, callback) {
                $http.post(url + '/brief/showPageList', $.extend({}, page, params)).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.searchPaginator);
        };

        //下载
        $scope.download = function (fileName) {
            window.location.href = url + '/file/download?path=' + fileName;
        };

       // yMake.fn.autoHeight('.bgWhite',45);
    }]);
});