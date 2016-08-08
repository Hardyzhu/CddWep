/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：登陆页面
 */
define(function(require){
	var app = require('../../app');

	app.controller('loginCrl',['$scope', '$location', '$state',function($scope,$location,$state){
		$scope.title = '登陆';

		$scope.login = function(){
			$location.path('/main/baseInfo');
		};
	}]);
});