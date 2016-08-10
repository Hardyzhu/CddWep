define(function(require){
	var app = require('../app');
	app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/main/clients/serviceTeam');
		$stateProvider
				.state('login',{
					url:'/login',
					views:{
						'':{
							templateUrl:'views/login/login.html',
							controllerUrl:'views/login/login',
							controller:'loginCrl'
						}
					}
				})
				.state('main',{
					url:'/main',
					abstract:true,
					views:{
						'':{
							templateUrl:'views/main/main.html',
	  						controllerUrl:'views/main/main',
	  						controller:'mainCrl'
						},
						'top@main':{
	  						templateUrl:'views/main/top/top.html',
	  						controllerUrl:'views/main/top/top',
	  						controller:'topCrl'
		  				},
		  				'left@main':{
	  						templateUrl:'views/main/left/left.html',
	  						controllerUrl:'views/main/left/left',
	  						controller:'leftCrl'
		  				},
					}
				})
				//基础信息
		  		.state('main.baseInfo',{
		  			url:'/baseInfo',
		  			views:{		  				
		  				'main@main':{
  							templateUrl:'views/main/baseInfo/baseInfo.html',
				  			controllerUrl:'views/main/baseInfo/baseInfo',
				  			controller:'baseInfoCrl'
		  				}
		  			}
		  		})
		  		//客户需求
		  		.state('main.customer',{
		  			url:'/customer',
		  			views:{
		  				'main@main':{
  							templateUrl:'views/main/customer/customer.html',
				  			controllerUrl:'views/main/customer/customer',
				  			controller:'customerCrl'
		  				}
		  			}
		  		})
		  		//我的客户
		  		.state('main.clients',{
		  			url:'/clients',
		  			views:{
		  				'main@main':{
  							templateUrl:'views/main/clients/clients.html',
				  			controllerUrl:'views/main/clients/clients',
				  			controller:'clientsCrl'
		  				}
		  			}
		  		})
		  		//服务团队
		  		.state('main.clients.serviceTeam',{
		  			url:'/serviceTeam',
		  			views:{
		  				'main@main':{
  							templateUrl:'views/main/clients/serviceTeam/serviceTeam.html',
			  				controllerUrl:'views/main/clients/serviceTeam/serviceTeam',
			  				controller:'serviceTeamCrl'
		  				}
		  			}
		  		})
		  		//账户中心
		  		.state('main.accountCenter',{
		  			url:'/accountCenter',
		  			views:{
		  				'main@main':{
  							templateUrl:'views/main/accountCenter/accountCenter.html',
				  			controllerUrl:'views/main/accountCenter/accountCenter',
				  			controller:'accountCenterCrl'
		  				}
		  			}
		  		})
		  		
	}]);
});