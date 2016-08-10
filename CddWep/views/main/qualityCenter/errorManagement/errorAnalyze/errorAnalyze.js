/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：差错管理
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('errorAnalyzeCrl',['$scope',function($scope){
        $scope.title='差错数据分析';
        $scope.items = [
            {
                errorRanking:'1',
                companyAccount:'lswl',
                companyName:'快速物流',
                taskNum:'200',
                errorNum:'100',
                errorRate:'50%',
                errorTypeOne:'10',
                errorTypeTwo:'10',
                errorTypeThree:'10'
            },
            {
                errorRanking:'2',
                companyAccount:'lswl',
                companyName:'快速物流',
                taskNum:'200',
                errorNum:'100',
                errorRate:'50%',
                errorTypeOne:'10',
                errorTypeTwo:'10',
                errorTypeThree:'10'
            },
            {
                errorRanking:'3',
                companyAccount:'lswl',
                companyName:'快速物流',
                taskNum:'200',
                errorNum:'100',
                errorRate:'50%',
                errorTypeOne:'10',
                errorTypeTwo:'10',
                errorTypeThree:'10'
            },
            {
                errorRanking:'4',
                companyAccount:'lswl',
                companyName:'快速物流',
                taskNum:'200',
                errorNum:'100',
                errorRate:'50%',
                errorTypeOne:'10',
                errorTypeTwo:'10',
                errorTypeThree:'10'
            },
            {
                errorRanking:'5',
                companyAccount:'lswl',
                companyName:'快速物流',
                taskNum:'200',
                errorNum:'100',
                errorRate:'50%',
                errorTypeOne:'10',
                errorTypeTwo:'10',
                errorTypeThree:'10'
            },
            {
                errorRanking:'6',
                companyAccount:'lswl',
                companyName:'快速物流',
                taskNum:'200',
                errorNum:'100',
                errorRate:'50%',
                errorTypeOne:'10',
                errorTypeTwo:'10',
                errorTypeThree:'10'
            },
        ];

        var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)
    }]);
});