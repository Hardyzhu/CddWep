/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：合同条款
 */
define(function(require){
	var app = require('../../../../app');

	app.controller('serviceTeamCrl',['$scope',function($scope){
		$scope.title = '合同条款';
		yMake.fn.autoHeight('.bgWhite',45);
	}]);
});