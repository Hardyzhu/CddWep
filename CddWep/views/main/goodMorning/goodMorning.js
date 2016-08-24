/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：早安1919
 */
define(function(require){
    var app = require('../../../app');

    app.controller('goodMorningCrl',['$scope','$http','url',function($scope,$http,url){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo')),checkVlaue = app.get('checkValue');
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        if(role==1){
            $scope.parentTitle = '我的服务商';
            $scope.demand = true;
            loadPP();
        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.services = true;
            loadWL();
        }
        //物流分页
        $scope.searchData = {};
        function loadWL(){
            var currentBrand = function(page,callback){
                $http.post(url+'/paper/showPageList',$.extend({}, page, checkVlaue.searchData($scope.searchData))).success(callback);
            };
            $scope.currentBrand = app.get('Paginator').list(currentBrand,6);
        }

        //我的服务分页
        function loadPP(){
            var currentLog = function(page,callback){
                $http.post(url+'/warehouse/user/hyquery2Page',$.extend({}, page, {})).success(callback);
            };
            $scope.currentLog = app.get('Paginator').list(currentLog,6);
        }


        //查询
        $scope.search = function(){
            if(role==2){
                $scope.currentBrand._load();
            }else if(role==1){
                $scope.currentLog._load();
            }
        };

        //下载
        $scope.down = function(){
            //window.location.href();
        };

        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});