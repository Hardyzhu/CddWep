/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：早安1919
 */
define(function(require){
	var app = require('../../../../app');

	app.controller('claimManagementQualityCentralCrl',['$scope','$http','url',function($scope,$http,url){
		$scope.title = '早安1919';
		//分页
		function load(){
			var fetchFunction = function(page,callback){
				$http.post(url+'/paper/showPageList', $.extend({},page,{})).success(callback)
			};
			$scope.claim = app.get('Paginator').list(fetchFunction,6);
		}
		load();

		//导出
		$scope.downloadFile = function(){
			var teamInfo = {
				//brandedcompanyid: $scope.brandedcompanyid,
				//city: $scope.city,
				//province: $scope.province
			};
			window.open(url+'/team/export?teamInfo='+JSON.stringify(teamInfo),'_top');
		};
	}]);
});