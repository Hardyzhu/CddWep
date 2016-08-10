/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：差错管理
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('errorDetailCrl',['$scope',function($scope){
        $scope.title='差错明细';
        $scope.items = [
            {
                reportDate:'2016-08-10',
                reportType:'差错类型1',
                reportCompany:'xx酒业',
                errorCompany:'xx物流',
                errorDescribe:'差错描述',
                errorReply:'差错回复'
            },
            {
                reportDate:'2016-08-10',
                reportType:'差错类型1',
                reportCompany:'xx酒业',
                errorCompany:'xx物流',
                errorDescribe:'差错描述',
                errorReply:'差错回复'
            },
            {
                reportDate:'2016-08-10',
                reportType:'差错类型1',
                reportCompany:'xx酒业',
                errorCompany:'xx物流',
                errorDescribe:'差错描述',
                errorReply:'差错回复'
            },
            {
                reportDate:'2016-08-10',
                reportType:'差错类型1',
                reportCompany:'xx酒业',
                errorCompany:'xx物流',
                errorDescribe:'差错描述',
                errorReply:'差错回复'
            },
            {
                reportDate:'2016-08-10',
                reportType:'差错类型1',
                reportCompany:'xx酒业',
                errorCompany:'xx物流',
                errorDescribe:'差错描述',
                errorReply:'差错回复'
            },
            {
                reportDate:'2016-08-10',
                reportType:'差错类型1',
                reportCompany:'xx酒业',
                errorCompany:'xx物流',
                errorDescribe:'差错描述',
                errorReply:'差错回复'
            },
        ];

        var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)
    }]);
});