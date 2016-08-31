/**
 *  作者：cl
 *    时间：2016-08-10
 *    描述：差错管理
 */
define(function (require) {
    var app = require('../../../../../app');

    app.controller('errorAnalyzeCrl', ['$scope', '$http', 'url', function ($scope, $http, url) {
        //$scope.title='差错数据分析';
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

        var fetchFunction = function (page, callback) {
            var parm = app.get('checkValue').dateRangeFormat($scope.searchData);
            $http.post(url + '/mistake/query2Tj?loginname=' + userInfo.data.loginname, $.extend({}, page, parm)).success(callback)
        };
        $scope.mistakeAnalyze = app.get('Paginator').list(fetchFunction, 6);
        console.log($scope.mistakeAnalyze);

        //导出
        $scope.downloadFile = function () {
            var teamInfo = {
                //brandedcompanyid: $scope.brandedcompanyid,
                //city: $scope.city,
                //province: $scope.province
            };
            //导出接口暂时没有，待修改
            window.open(url + '/mistake/export?teamInfo=' + JSON.stringify(teamInfo), '_top');
        };

        /*var bgWhite = $('.bgWhite');
         bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)*/
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});