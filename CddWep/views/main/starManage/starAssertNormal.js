/**
 *  作者：maxu
 *	时间：2016-08-09
 *	描述：星级评定标准
 */
define(function(require){
    var app = require('../../../app');

    app.controller('starAssertNormalCrl',['$scope','url','$http','$location',function($scope,url,$http,$location){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //物流
        $scope.backstage = false;                          //后台

        if(role==2){
            $scope.services = true;
        }else if(role==3){
            $scope.backstage = true;
        }


        yMake.fn.autoHeight('.bgWhite',45);

        $scope.startAsser = {err:'25%',
        		err11:'60%',err12:'100%',
        		err21:'10%',err22:'60%',
        		err31:'0',err32:'10%',
        		fen1:'20',fen2:'50',fen3:'100'};
        
        function load(){
        	$scope.demo = [];
        	 $http.post(url+'/score/selectAll',{Score:$scope.demo}).success(function(data){
        		 $scope.Score=data.Score;
        		 console.log($scope.Score);
             }).error(function(data, status, headers, config){
                 layer.msg("查询失败",{icon:2});
             });
         }
         load();

    }]);
});