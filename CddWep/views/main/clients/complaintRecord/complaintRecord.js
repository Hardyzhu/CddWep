/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：投诉管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('complaintRecordCrl',['$scope',function($scope){
        $scope.title = '投诉记录';
        $scope.items = [
            {
                complaintPerson:'xx酒业',
                complaintType:'类型1',
                complaintContent:'投诉类容',
                complaintDate:'投诉时间',
                firstReplyTime:'2016-08-10 17:25:02',
                secondReplyTime:'2016-08-10 18:25:02',
                complaintEvaluate:'满意'
            },
            {
                complaintPerson:'yy酒业',
                complaintType:'类型1',
                complaintContent:'投诉类容',
                complaintDate:'投诉时间',
                firstReplyTime:'2016-08-10 17:25:02',
                secondReplyTime:'2016-08-10 18:25:02',
                complaintEvaluate:'未评价'
            }

        ];

        var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)
    }]);
});