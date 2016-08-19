/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：询价平台
 */
define(function (require) {
    var app = require('../../../app');
    app.controller('inquiryPlatformCrl', ['$scope','url', '$http',function ($scope,url,$http) {
        $scope.division = {"北京市": ["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        yMake.fn.autoHeight('.bgWhite', 45);
        //分页
        var fetchFunction = function (page, callback) {
            $http.post(url + '/storage/checkPrice', $.extend({}, page, {})).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        console.log( $scope.searchPaginator);

        //下载
        $scope.download = function(fileName){
            window.location.href=url+'/file/download?path='+fileName;
        };

    }]);
});
