/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：差错管理
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('complaintAnalyzeCrl',['$scope',function($scope){
        $scope.title='投诉数据分析';
        $scope.items = [
            {
                VIPNum:'652856',
                companyName:'快速物流',
                complaintNum:'100',
                taskNum:'200',
                firstResponseRate:'50%',
                secondResponseRate:'50%',
                satisfactionRate:'50%',
                complaintTypeTwo:'50%',
                complaintTypeThree:'50%'
            },
            {
                VIPNum:'652856',
                companyName:'快速物流',
                complaintNum:'100',
                taskNum:'200',
                firstResponseRate:'50%',
                secondResponseRate:'50%',
                satisfactionRate:'50%',
                complaintTypeTwo:'50%',
                complaintTypeThree:'50%'
            },
            {
                VIPNum:'652856',
                companyName:'快速物流',
                complaintNum:'100',
                taskNum:'200',
                firstResponseRate:'50%',
                secondResponseRate:'50%',
                satisfactionRate:'50%',
                complaintTypeTwo:'50%',
                complaintTypeThree:'50%'
            },
            {
                VIPNum:'652856',
                companyName:'快速物流',
                complaintNum:'100',
                taskNum:'200',
                firstResponseRate:'50%',
                secondResponseRate:'50%',
                satisfactionRate:'50%',
                complaintTypeTwo:'50%',
                complaintTypeThree:'50%'
            },
            {
                VIPNum:'652856',
                companyName:'快速物流',
                complaintNum:'100',
                taskNum:'200',
                firstResponseRate:'50%',
                secondResponseRate:'50%',
                satisfactionRate:'50%',
                complaintTypeTwo:'50%',
                complaintTypeThree:'50%'
            }

        ];

        var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)
    }]);
});