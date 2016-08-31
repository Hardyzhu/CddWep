/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：客户财务--客户账户查询
 */
define(function(require){
    var app = require('../../../app');

    app.controller('accountQueryCrl',['$scope','$http','url',function($scope,$http,url){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        if(role==1){
            $scope.parentTitle = '我的账单';
            $scope.demand = true;
        }else if(role==2){
            $scope.parentTitle = '账户中心';
            $scope.services = true;
        }
        $scope.searchData = {};
        //分页
        function load(){
            var fetchFunction = function(page,callback){
                var info = app.get('checkValue').dateRangeFormat($scope.searchData);
                $http.post(url+'/finance/showPageList', $.extend({},page, info)).success(callback)
            };
            $scope.accountQuery = app.get('Paginator').list(fetchFunction,6);
        }
        load();

        //导出
        $scope.downloadFile = function(){
            var teamInfo = {
                //brandedcompanyid: $scope.brandedcompanyid,
                //city: $scope.city,
                //province: $scope.province
            };
            window.open(url+'/finance/export?teamInfo='+JSON.stringify(teamInfo),'_top');
        };

        function jsTimeToString(time){
            if(time==null || typeof time != 'object'){
                return;
            }
            var year=time.getFullYear();
            var month=time.getMonth()+1;
            var day=time.getDate();
            var hour=time.getHours();
            var minute=time.getMinutes();
            var second=time.getSeconds();
            if(month<10){
                month="0"+month;
            }
            if(day<10){
                day="0"+day;
            }/*
            if(hour<10){
                hour="0"+hour;
            }
            if(minute<10){
                minute="0"+minute;
            }
            if(second<10){
                second="0"+second;
            }*/
            var strTime = year+"-"+month+"-"+day;
            return strTime;
        }
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
