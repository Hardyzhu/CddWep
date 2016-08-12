/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：出入库报表
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('outPutCrl',['$scope',function($scope){
        $scope.title = '出入库报表';
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});