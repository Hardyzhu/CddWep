/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：合同条款
 */
define(function(require){
	var app = require('../../../../app');
	app.controller('serviceTeamCrl',['$scope','url','$http',function($scope,url,$http){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        if(role==1){
            $scope.parentTitle = '我的服务商';
            $scope.demand = true;
        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.services = true;
        }

		$scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};

		$scope.items= [
			{
				pactno:'ZA27792893',
				brandedcompanyid:'嘀嘀嘀哒',
				pactname:'租赁合同',
				pactoperant:'2016/8/30',
				deadline:'2017/8/30',
				pactscan:'http://www.baidu.com',
				extrapact:'税务合同'
			}

		];
		function load(){
			var currentCheck = function(page,callback){
				$http.post(url+'/warehouse/user/hyquery2Page',
					{pageSize:page,address:$scope.address,companyName:$scope.companyName}).success(callback);
			};
			$scope.searchPaginator = app.get('Paginator').list(currentCheck,6);
		}
		load();
		yMake.fn.autoHeight('.bgWhite',45);
	}]);
});