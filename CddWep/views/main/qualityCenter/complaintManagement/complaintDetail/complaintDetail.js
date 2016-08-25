/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：投诉管理
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('complaintDetailCrl',['$scope','$http','url',function($scope,$http,url){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

        $scope.title='投诉明细';
        //分页
        function load(){
            var fetchFunction = function(page,callback){
                $http.post(url+'/complaint/showPageList?loginname='+userInfo.data.loginname, $.extend({},page,{})).success(callback)
            };
            $scope.complaintDetail = app.get('Paginator').list(fetchFunction,6);
        }
        load();

        //导出
        $scope.downloadFile = function(){
            var teamInfo = {
                //brandedcompanyid: $scope.brandedcompanyid,
                //city: $scope.city,
                //province: $scope.province
            };
            window.open(url+'/team/export?teamInfo='+JSON.stringify(teamInfo),'_top');
        };
    }]);
});