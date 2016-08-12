/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：配送报表
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('reportsCrl',['$scope',function($scope){
        $scope.title = '配送报表';
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});
