/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：顶部页面
 */
define(function(require){
	var app = require('../../../app');

	app.controller('topCrl',['$scope',function($scope){
		$scope.title = '头部';
	}]);
});