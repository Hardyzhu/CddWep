/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：基础信息
 */
define(function(require){
	var app = require('../../../app');

	app.controller('baseInfoCrl',['$scope',function($scope){
		$scope.title = '基础信息';
		//基础信息
		$scope.bases = [
			{
				title:'公司名称',
				des:'成都市XXX有限公司'
			},{
				title:'公司简介',
				des:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
			},{
				title:'公司资质',
				des:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
			},{
				title:'公司法人',
				des:'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
			},{
				title:'联系方式',
				des:'13544232123'
			},{
				title:'公司邮箱',
				des:'www.673089899@qq.com'
			},{
				title:'公司地址',
				des:'湖北省武汉市江夏区软件园C6栋208室'
			}
		];
	}]);
});