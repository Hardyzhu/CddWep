/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：顶部页面
 */
define(function(require){
	var app = require('../../../app');

	app.controller('topCrl',['$scope','$location',function($scope,$location){

        //退出登录
        $scope.exit = function(){
            if(sessionStorage.getItem('userInfo')){
                sessionStorage.removeItem('userInfo');
                layer.msg('退出成功!',{icon:1,time:2000});
                $location.path('/login');
            }
        };
	}]);
});