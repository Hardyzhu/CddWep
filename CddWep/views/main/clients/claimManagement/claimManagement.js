/**
 *  作者：yeshengqiang
 *	时间：2016-08-23
 *	描述：理赔管理
 */
define(function(require){
	var app = require('../../../../app');

	//过滤器
	app.filter('statusFormat',function(){
		return function(inp){
			var info = '';
			/*if(attr.toLowerCase()=='status'){

			}*/
			switch (inp){
				case '1':
					info = '未支付';
					break;
				case '2':
					info = '已支付';
					break;
			}
			return info;
		}
	});

	app.controller('claimManagementCrl',['$scope','$http','url',function($scope,$http,url){

		//查看
		$scope.lookSome=function(item){
			console.log(item);
			$scope.khrequest={};
			$scope.khrequest.a=item.sbdate;
			$scope.khrequest.b=item.type;
			$scope.khrequest.c=item.wlname;
			$scope.khrequest.d=item.brandedname;
			$scope.khrequest.e=item.claimno;
			$scope.khrequest.f=item.status;
			$scope.khrequest.g=item.bill;
			$scope.khrequest.h=item.value;
		};

		//初始化
		$scope.searchData = {};
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
		console.log(role);
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
		$scope.backTitle = false;                       //品质中心(后台)
        $scope.parentTitle = '';                        //父标题
        $scope.title = '';                              //子标题
        if(role==1){
			$scope.parentTitle = '我的服务商';
			$scope.title = '保险理赔';
            $scope.services = true;
			console.log("品牌");
			//获取分页数据
			var currentCheck = function (page, callback) {
				var parm = app.get('checkValue').searchData($scope.searchData);
				$http.post(url + '/claim/showPageList?loginname='+userInfo.data.loginname, $.extend({},page, parm)).success(callback);
			};
			$scope.projectItem = app.get('Paginator').list(currentCheck, 6);

			//导出点击事件
			$scope.outMessage=function(){
				var teamInfo = {

				};
				//window.location.href=url+'/claim/export1?teamInfo='+;
				window.open(url+'/claim/export1?teamInfo='+JSON.stringify(teamInfo),'_top');
			};
        }else if(role==2){
			$scope.parentTitle = '我的客户';
			$scope.title = '理赔管理';
			$scope.demand = true;
			//获取分页数据
			var currentCheck = function (page, callback) {
				var parm = app.get('checkValue').searchData($scope.searchData);
				$http.post(url + '/claim/showPageList?loginname='+userInfo.data.loginname, $.extend({},page, parm)).success(callback);
			};
			$scope.projectItem = app.get('Paginator').list(currentCheck, 6);

			//导出点击事件
			$scope.outMessage=function(){
				window.location.href=url+'/claim/export1';
			};
		}else if(role==3){
			$scope.parentTitle = '品质中心';
			$scope.title = '理赔管理';
			$scope.backTitle = true;
			console.log("后台");
			//获取分页数据
			var currentCheck = function (page, callback) {
				var parm = app.get('checkValue').searchData($scope.searchData);
				$http.post(url + '/claim/showPageList?loginname='+userInfo.data.loginname, $.extend({}, page, parm)).success(callback);
			};
			$scope.projectItem = app.get('Paginator').list(currentCheck, 6);

			//导出点击事件
			$scope.outMessage=function(){
				var teamInfo = {

				};
				window.location.href=url+'/claim/export1';
			};
		}

		//下拉菜单
		$scope.selected ='';
		$scope.dropdownItems=[
			{name:'1', value:'1'},
			{name:'2', value:'2'},
			{name:'3', value:'3'},
			{name:'4', value:'4'},
			{name:'5', value:'5'}
			];

		$scope.dropdownProvince=[
			'北京','湖北','浙江','江苏'
		];


	}]);

});