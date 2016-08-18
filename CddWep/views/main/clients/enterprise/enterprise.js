/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：企业资质
 */
define(function(require) {
    var app = require('../../../../app');

    app.controller('enterpriseCrl',['$scope',function($scope){
        $scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.title = '企业资质';
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
