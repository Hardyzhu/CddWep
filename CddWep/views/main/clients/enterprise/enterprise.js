/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：企业资质
 */
define(function(require) {
    var app = require('../../../../app');
    
    app.controller('enterpriseCrl',['$scope','url','$http',function($scope,url,$http){

		//获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        if(role==1){
            $scope.parentTitle = '我的服务商';
            $scope.demand = true;
        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.services = true;
        }
        
        $scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.title = '企业资质';

        //获取所有的省
        $http.get(url+'/location/loadProvince').success(function(data){
            $scope.provinces = data.data;
        });
        //根据省id获取城市
        $scope.getCity = function(province){
            $http.get(url+'/location/loadCity?id='+province).success(function(data){
                $scope.cities = data.data;
            })
        };
        $scope.getEnterprise = function(city){
            $http.get(url+'/location/loadDetail?city='+city).success(function(data){
                $scope.enterprises = data.data;
            })
        };
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
