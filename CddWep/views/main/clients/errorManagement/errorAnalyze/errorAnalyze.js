/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：差错管理
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('errorAnalyzeCrl',['$scope',function($scope){
        $scope.title='差错数据分析';
        function load(){
            var fetchFunction = function(page,callback){
                //$http.post(url+'/complaint/showPageList', $.extend({},page,{})).success(callback)
            };
            $scope.mistakeAnalyze = app.get('Paginator').list(fetchFunction,6);
        }
        //load();

        //导出
        $scope.downloadFile = function(){
            var teamInfo = {
                //brandedcompanyid: $scope.brandedcompanyid,
                //city: $scope.city,
                //province: $scope.province
            };
            window.open(url+'/team/export?teamInfo='+JSON.stringify(teamInfo),'_top');
        };

        /*var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)*/
    }]);
});