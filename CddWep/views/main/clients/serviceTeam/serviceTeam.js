/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：服务团队
 */
define(function(require){
	var app = require('../../../../app');

	app.controller('serviceTeamCrl',['$scope',function($scope){
		$scope.title = '服务团队';
		$scope.items = [
			{
				id:'1',
				name:'张三',
				phone:'13455667788',
				work:'经理',
				post:'管理',
				des:'无'
			},
			{
				id:'2',
				name:'李四',
				phone:'13455667788',
				work:'经理',
				post:'管理',
				des:'无'
			},
			{
				id:'3',
				name:'王五',
				phone:'13455667788',
				work:'经理',
				post:'管理',
				des:'无'
			}
		];
	}]);
});