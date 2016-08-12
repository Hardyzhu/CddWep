/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：路由首页
 */
define(function(require){
	var app = require('../../app');

	app.controller('mainCrl',['$scope',function($scope){
		setTimeout(function(){
			var leftBox = $('.leftBox'),mainBox= $('.mainBox');
			leftBox.css('height',$(document).height()-leftBox.offset().top);
			mainBox.css('height',$(document).height()-mainBox.offset().top);
		},100);
	}]);
});