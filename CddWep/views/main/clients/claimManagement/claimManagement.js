/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：理赔管理
 */
define(function(require){
	var app = require('../../../../app');
	app.controller('claimManagementCrl',['$scope','$http','url',function($scope,$http,url){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        $scope.title = '';                              //子标题
        if(role==1){
            $scope.parentTitle = '我的服务商';
            $scope.title = '保险理赔';
            $scope.demand = true;
        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.title = '理赔管理';
            $scope.services = true;
        }

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