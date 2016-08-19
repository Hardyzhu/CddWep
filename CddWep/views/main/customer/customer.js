/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：客户需求
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('customerCrl', ['$scope', '$http', 'url', function ($scope, $http, url) {
        ////搜索
        //var search=function(page,callback){
        //    var params={
        //        city:$scope.city,
        //        name:$scope.name
        //    };
        //    var currentCheck = function(page,callback){
        //        $http.post(url+'/khrequest/showPageList', $.extend({},page,params)).success(callback);
        //    };
        //    $scope.projectItem = app.get('Paginator').list(currentCheck,6);
        //};


        //获取分页数据
        var currentCheck = function (page, callback) {
            $http.post(url + '/khrequest/showPageList', $.extend({}, page, {})).success(callback);
        };
        $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
        console.log($scope.projectItem);

        $scope.change = function () {

        };


        yMake.fn.autoHeight('.bgWhite', 45);
    }]);
});