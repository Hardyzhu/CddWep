/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：投诉管理
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('complaintDetailCrl',['$scope','$http','url',function($scope,$http,url){
        //$scope.title='投诉明细';

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

        //获取分页数据
        var currentCheck = function (page, callback) {
            console.log($scope.searchData);
            var param = app.get('checkValue').searchData($scope.searchData);
            console.log(param);
            $http.post(url + '/complaint/showPageList?loginname='+userInfo.data.loginname, $.extend({},page, param)).success(callback);
        };
        $scope.complaintDetail = app.get('Paginator').list(currentCheck, 6);

        //导出
        $scope.downloadFile = function(){
            var teamInfo = {
                //brandedcompanyid: $scope.brandedcompanyid,
                //city: $scope.city,
                //province: $scope.province
            };
            window.open(url+'/team/export?teamInfo='+JSON.stringify(teamInfo),'_top');
        };
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});