/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：投诉管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('complaintRecordCrl',['$scope','$http',function($scope,$http){
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


        $scope.division=[
            "类型1",
            "类型2",
            "类型3",
            "类型4"
        ];

        $scope.items = [
            {
                brandedcompanyid:'xx酒业',
                type:'类型1',
                description:'投诉类容',
                sbdate:'投诉时间',
                time1:'2016-08-10 17:25:02',
                time2:'2016-08-10 18:25:02',
                score:'满意',
                status:'未回复'
            }];

        $scope.search = function(){

        };

        $scope.export=function(){

        };

        $scope.returnMessage=function(){
            $http.post(url+'warehouse').success(function(){
                console.log(data);
            });
        };


        /*var record = function(){
            $http.post(url+'')
        };*/
        console.log(app.get('Paginator'));
        /*var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)*/
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});