/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：登录页面
 */
define(function(require){
	var app = require('../../app');

	app.controller('loginCrl',['$scope', '$location', '$state','url',function($scope,$location,$state,url){
		//获取登录信息
		$scope.loginInfo=sessionStorage.getItem('loginInfo');
		if($scope.loginInfo!=null){
			$scope.loginInfo = JSON.parse($scope.loginInfo);
			$scope.username = $scope.loginInfo.username;
			$scope.password = $scope.loginInfo.password;
			$scope.rememberPassword = true;
		}
		//登录
		$scope.login = function(){
			var bool = true ;
			if($scope.username==''||$scope.username==null){
				layer.tips('请输入用户名', '#username', {
					tips: [1, '#3595CC'],
					time: 4000,
					tipsMore: true
				});
				bool = false;
			}
			if($scope.password==''||$scope.password==null){
				layer.tips('请输入密码', '#password', {
					tips: [1, '#3595CC'],
					time: 4000,
					tipsMore: true
				});
				bool = false;
			}
			if(!bool){
				return
			}
			var loginInfo = {
				username:$scope.username,
				password:$scope.password
			};
			//$.post('',loginInfo).success(function(data){
				if(0){
					layer.tips('帐号不存在', '#username', {
						tips: [1, '#3595CC'],
						time: 4000,
						tipsMore: true
					});
					return;
				}else if(0){
					layer.tips('密码错误', '#password', {
						tips: [1, '#3595CC'],
						time: 4000,
						tipsMore: true
					});
					return;
				}else if(0){
					layer.alert('登录失败，请稍候重试！',{icon:2});
					return;
				}
				//记住密码功能
				if($scope.rememberPassword){
					sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo));
				}else{
					sessionStorage.removeItem('loginInfo');
				}
				$location.path('/main/baseInfo');
			//}).error(function(){
			//	layer.alert('登录失败，请稍候重试！',{icon:2})
			//});
		};
	}]);
});