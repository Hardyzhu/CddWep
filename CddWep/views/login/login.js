/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：登录页面
 */
define(function(require){
	var app = require('../../app');

	app.controller('loginCrl',['$scope', '$location', '$state','url',function($scope,$location,$state,url){
        console.log(url);
		$scope.login = function(){
			$location.path('/main/baseInfo');
		};
	}]);
});