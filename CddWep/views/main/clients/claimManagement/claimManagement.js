/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
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
        }else if(role==2){
			$scope.parentTitle = '我的客户';
			$scope.title = '理赔管理';
			$scope.demand = true;
			console.log("物流");
		}else if(role==3){
			$scope.parentTitle = '品质中心';
			$scope.title = '理赔管理';
			$scope.backTitle = true;
			console.log("后台");
		}

		//下拉菜单
		$scope.selected ='';
		$scope.dropdownItems=[
			{'d':'1'},
			{'d':'2'},
			{'d':'3'},
			{'d':'4'},
			{'d':'5'}
			];

		$scope.dropdownProvince=[
			'北京','湖北','浙江','江苏'
		];

		//获取分页数据
		var currentCheck = function (page, callback) {
			$http.post(url + '/claim/showPageList', $.extend({}, page, {})).success(callback);
		};
		$scope.projectItem = app.get('Paginator').list(currentCheck, 6);
		console.log($scope.projectItem);

		//搜索按钮点击事件
		$scope.btnSearch=function(){
			function btnSearch(page, callback) {
				var params = {
					sbdate: $scope.sbdate,
					type: $scope.type
				};

				$http.post(url + '/claim/showPageList', $.extend({}, page, params)).success(callback);
			}
			$scope.projectItem = app.get('Paginator').list(currentCheck, 6);
			console.log($scope.projectItem);
			console.log($scope.type);
			console.log($scope.sbdate);
		};

		//导出点击事件
		$scope.outMessage=function(){
			var teamInfo = {

			};
			window.location.href=url+'/claim/export1';
		};

			//yMake.fn.autoHeight('.bgWhite',45);
	}]);

});