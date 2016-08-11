/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：投诉管理
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('complaintDetailCrl',['$scope',function($scope){
        $scope.title='投诉明细';
        $scope.items = [
            {
                complaintCompany:'XX酒业',
                beComplaintCompany:'XX物流',
                complaintType:'类型1',
                complaintDate:'2016-07-01  00:00:00',
                firstReplyTime:'2016-07-01  01:00:00',
                secondReplyTime:'2016-07-01  12:00:00',
                evaluate:'未评价'
            },
            {
                complaintCompany:'XX酒业',
                beComplaintCompany:'XX物流',
                complaintType:'类型1',
                complaintDate:'2016-07-01  00:00:00',
                firstReplyTime:'2016-07-01  01:00:00',
                secondReplyTime:'2016-07-01  12:00:00',
                evaluate:'未评价'
            },
            {
                complaintCompany:'XX酒业',
                beComplaintCompany:'XX物流',
                complaintType:'类型1',
                complaintDate:'2016-07-01  00:00:00',
                firstReplyTime:'2016-07-01  01:00:00',
                secondReplyTime:'2016-07-01  12:00:00',
                evaluate:'满意'
            },
            {
                complaintCompany:'XX酒业',
                beComplaintCompany:'XX物流',
                complaintType:'类型1',
                complaintDate:'2016-07-01  00:00:00',
                firstReplyTime:'2016-07-01  01:00:00',
                secondReplyTime:'2016-07-01  12:00:00',
                evaluate:'不满意'
            },
            {
                complaintCompany:'XX酒业',
                beComplaintCompany:'XX物流',
                complaintType:'类型1',
                complaintDate:'2016-07-01  00:00:00',
                firstReplyTime:'2016-07-01  01:00:00',
                secondReplyTime:'2016-07-01  12:00:00',
                evaluate:'未评价'
            },
            {
                complaintCompany:'XX酒业',
                beComplaintCompany:'XX物流',
                complaintType:'类型1',
                complaintDate:'2016-07-01  00:00:00',
                firstReplyTime:'2016-07-01  01:00:00',
                secondReplyTime:'2016-07-01  12:00:00',
                evaluate:'未评价'
            }

        ];

        var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)
    }]);
});