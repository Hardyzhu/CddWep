/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：登陆页面
 */
define(function(require){
	var app = require('../../app');
	console.log(app);
	app.controller('loginCrl',['$scope',function($scope){
		$scope.text = '111';
	}]);
});