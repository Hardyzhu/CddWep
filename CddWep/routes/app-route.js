define(function(require){
	var app = require('../app');
	app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
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
		  				}
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
				//差错管理
				.state('main.clients.errorManagement',{
					url:'/errorManagement',
					views:{
						'main@main':{
							templateUrl:'views/main/clients/errorManagement/errorManagement.html',
							controllerUrl:'views/main/clients/errorManagement/errorManagement',
							controller:'errorManagementCrl'
						}
					}
				})
		  		//合同条款
		  		.state('main.clients.clause',{
		  			url:'/clause',
		  			views:{
		  				'main@main':{
  							templateUrl:'views/main/clients/clause/clause.html',
			  				controllerUrl:'views/main/clients/clause/clause',
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

				//早安1919
				.state('main.goodMorning',{
					url:'/goodMorning',
					views:{
						'main@main':{
							templateUrl:'views/main/goodMorning/goodMorning.html',
							controllerUrl:'views/main/goodMorning/goodMorning',
							controller:'goodMorningCrl'
						}
					}
				})
				//新建早安1919
			.state('main.newGoodMorning',{
				url:'/newGoodMorning',
				views:{
					'main@main':{
						templateUrl:'views/main/newGoodMorning/newGoodMorning.html',
						controllerUrl:'views/main/newGoodMorning/newGoodMorning',
						controller:'newGoodMorningCrl'
		  				}
		  			}
		  		})
		  		
	}]);
});