/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：理赔管理
 */
define(function(require){
	var app = require('../../../../app');
	app.controller('claimManagementCrl',['$scope','$http','url',function($scope,$http,url){
		//下拉菜单
		$scope.selected ='';
		$scope.dropdownItems=[
			{'d':'类型1'},
			{'d':'类型2'},
			{'d':'类型3'},
			{'d':'类型4'},
			{'d':'类型5'}
			];
		//数据
		$scope.items = [
			{
				id:'1',
				sbDate:'2016-07-01',
				type:'盘点差异',
				claimno:'872875',
				bill:'4829875',
				value:'1200',
				//sbvalue:'1200',     //索赔金额试题中没有
				status:'未支付'
			},
			{
				id:'2',
				sbDate:'2016-07-01',
				type:'盘点差异',
				claimno:'872875',
				bill:'4829875',
				value:'1200',
				status:'未支付'
			},
			{
				id:'3',
				sbDate:'2016-07-01',
				type:'盘点差异',
				claimno:'872875',
				bill:'4829875',
				value:'1200',
				status:'未支付'
			}
		];
		//搜索按钮点击事件
		$scope.btnSearch=function(){

		};
		//导出菜单点击事件
		$scope.outMessage=function(){

		};
			yMake.fn.autoHeight('.bgWhite',45);
	}]);

});