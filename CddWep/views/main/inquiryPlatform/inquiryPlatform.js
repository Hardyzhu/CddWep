/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：询价平台
 */
define(function(require){
    var app = require('../../../app');

    app.controller('inquiryPlatformCrl',['$scope',function($scope){
        $scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.title = '询价平台';
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
