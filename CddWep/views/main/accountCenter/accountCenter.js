/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：账户中心
 */
define(function(require){
	var app = require('../../../app');

	app.controller('accountCenterCrl',['$scope','$http','url',function($scope,$http,url){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        console.log(role);
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

        //获取所有的省
        $http.get(url+'/location/loadProvince').success(function(data){
            $scope.provinces = data.data;
        });
        //根据省id获取城市
        $scope.getCity = function(province){
            $scope.searchData.city = '';
            $scope.searchData.brandedcompanyid = '';
            $http.get(url+'/location/loadCity?id='+province).success(function(data){
                $scope.cities = data.data;
            })
        };
        //yMake.fn.autoHeight('.bgWhite',45)
	}]);
});