/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：基础信息
 */
define(function(require){
	var app = require('../../../app');

	app.controller('baseInfoCrl',['$scope',function($scope){
		$scope.title = '基础信息';
	}]);
});