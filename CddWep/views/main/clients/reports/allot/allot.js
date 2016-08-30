/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：调拨报表
 */
define(function(require){
    var app = require('../../../../../app');

    app.controller('allotCrl',['$scope','url','$http','$location','$state','$rootScope',function($scope,url,$http,$location,$state,$rootScope){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
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

        $scope.title = '调拨报表';
        //$scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.state = '已认证';

        //获取所有的省
        $http.get(url+'/location/loadProvince').success(function(data){
            $scope.provinces = data.data;
        });
        //根据省得id获取城市
        $scope.getCity=function(province){
            $scope.searchData.city = '';
            $http.get(url+'/location/loadCity?id='+province).success(function(data){
                $scope.cities = data.data;
            })
        };
        //条件
        $scope.division = [
            {value:1,name:'已认证'},
            {value:2,name:'未通过'},
            {value:3,name:'已拉黑'}
        ];

        //初始化
        $scope.searchData = {};
        //分页查询
        var currentCheck = function(page,callback){
            var param = app.get('checkValue').searchData($scope.searchData);
            $http.post(url+'/delivery/showPageList', $.extend({loginname:userInfo.data.loginname,type:2},page,param)).success(callback);
        };
        $scope.searchData = app.get('Paginator').list(currentCheck,6);
        console.log($scope.searchData);

        //查看明细
        $scope.loadDetail = function (item) {
            $state.go('main.clients.reports.allot.allotDetail',{'wlcompanyid':item.wlcompanyid});
        };
        //导出
        $scope.export=function(){
            layer.confirm("是否导出文件？",
                {btn : ['是','否']},function(){
                    window.location.href=url +"/delivery/export?loginname="+userInfo.data.loginname+"&type=2";
                    yMake.layer.msg("导出总结文件成功 ",{icon:1,time:1000});
                    layer.msg("",{time:1});
                })
        };
        //load();
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});
