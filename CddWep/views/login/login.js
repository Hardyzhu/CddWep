/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：登录页面
 */
define(function(require){
	var app = require('../../app');

	app.controller('loginCrl',['$scope', '$location', 'url','$http',function($scope,$location,url,$http){
        //默认选中
        $scope.rememberPassword = true;
		//获取登录信息
		$scope.loginInfo=localStorage.getItem('loginInfo');
		if($scope.loginInfo!=null){
			$scope.loginInfo = JSON.parse($scope.loginInfo);
			$scope.username = $scope.loginInfo.username;
			$scope.password = $scope.loginInfo.password;
			$scope.rememberPassword = true;
		}
		//登录
		$scope.login = function(){
            $location.path('/main/baseInfo');
            return
            console.log(app.get('checkValue'));
            //var username = app.get('checkValue').isNull($scope.username);
            //var password = app.get('checkValue').isNull($scope.password);
            //console.log(password);
			if(username.state){
				layer.tips('请输入用户名', '#username', {
					tips: [1, '#3595CC'],
					time: 2000,
					tipsMore: true
				});
				return
			}
			if(password.state){
				layer.tips('请输入密码', '#password', {
					tips: [1, '#3595CC'],
					time: 2000,
					tipsMore: true
				});
				return
			}
			var loginInfo = {
                loginname:$scope.username,
				password:$scope.password
			};
            //保存信息
            if($scope.rememberPassword){
                //移除之前已经存在的，保存现在的新信息
                if(localStorage.getItem('loginInfo')){
                    localStorage.removeItem('loginInfo');
                }
                localStorage.setItem('loginInfo',JSON.stringify(loginInfo));
            }
            $http({
                method:"GET",
                url: url+'/warehouse/user/login',
                params:{
                    "loginname":$scope.username,
                    "password":$scope.password
                }
            }).success(function(data){
                if(data.code=='0'){
                    //登陆信息保存在
                    sessionStorage.setItem('userInfo',JSON.stringify(data));
                    layer.msg(data.message,{icon:1});
                    //$location.path('/main/baseInfo');
                    return;
                }else{
                    layer.tips(data.message, '#username', {
                        tips: [1, '#3595CC'],
                        time: 2000,
                        tipsMore: true
                    });
                    return;
                }
            }).error(function(){
                layer.alert('登录失败，请稍候重试！',{icon:2});
            });

		};
	}]);
});