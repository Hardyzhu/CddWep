/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：调拨报表
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('allotCrl',['$scope','url','$http',function($scope,url,$http){
        $scope.title = '调拨报表';
        $scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.state = '已认证';
        function load(){
            var currentCheck = function(page,callback){
                $http.post(url+'/warehouse/user/hyquery2Page',
                    {pageSize:page,address:$scope.address,companyName:$scope.companyName}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(currentCheck,6);
        }
        load();
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});
