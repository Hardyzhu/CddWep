/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：询价平台
 */
define(function(require){
    var app = require('../../../app');

    app.controller('inquiryPlatformCrl',['$scope',function($scope){
        $scope.title = '询价平台';
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
