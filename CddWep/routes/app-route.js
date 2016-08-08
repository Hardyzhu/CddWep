define(function(require){
	var app = require('../app');
	app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/index');
		$stateProvider
		  		.state('index',{
		  			url:'/index',
		  			views:{
		  				'':{
							templateUrl:'views/main/main.html',
	  						controllerUrl:'views/main/main',
	  						controller:'mainCrl'
						},
		  				'top@index':{
	  						templateUrl:'views/top/top.html',
	  						controllerUrl:'views/top/top',
	  						controller:'topCrl'
		  				},
		  				'left@index':{
	  						templateUrl:'views/left/left.html',
	  						controllerUrl:'views/left/left',
	  						controller:'leftCrl'
		  				},
		  				//黑名单
		  				'main@index':{
  							templateUrl:'views/content/blacklist/blacklist.html',
				  			controllerUrl:'views/content/blacklist/blacklist',
				  			controller:'blackCrl'
		  				}
		  			}
		  		})
		  		
	}]);
});