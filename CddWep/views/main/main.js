/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：路由首页
 */
define(function(require){
	var app = require('../../app');

	app.controller('mainCrl',['$scope',function($scope){
        $(function(){
            console.log($('.mainBox').tagName);
            console.log(yMake.fn.getByClass(null,'mainBox').tagName);
            //yMake.fn.autoHeight('mainBox');
        });
	}]);
});