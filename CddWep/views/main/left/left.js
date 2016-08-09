/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：导航页面
 */
define(function(require){
	var app = require('../../../app');

	app.directive('outNav', function(){
		return {
			restrict:'E',
			template:'<dl class="navBox chouse" ng-repeat="item in navs"><inner-tag1>{{item.title}}</inner-tag1><inner-tag2 ng-repeat="itm in item.childs" data-url="{{itm.url}}">{{itm.name}}</inner-tag2></dl>',
			replace:true,
			scope:{
				navs:'='
			},
			controller:['$scope','$state',function($scope,$state){
				this.goTo = function(inp){
					$state.go(inp);
				};
			}],
			controllerAs:'outTop'
		};
	});

	app.directive('innerTag1', function(){
		return {
			restrict:'E',
			template:'<dt><b class="glyphicon glyphicon-home"></b><span ng-transclude></span><span class="glyphicon glyphicon-menu-right pull-right"></span></dt>',
			replace:true,
			transclude:true,
			require:'?^outNav',
			compile:function(iEle,iAttr,transclude){
				return function(scope,iEle,iAttr,outTop){
					iEle.on('click',function(){
						var oDl = iEle.parent('dl');
						var oDd = oDl.find('dd');
						//其他的收起来
						oDd.removeClass('navDd');
						oDl.removeClass('chouse');
						$('.navDd').slideUp();
						
						$('.navDd').removeClass('active');
						$('.chouse').removeClass('active');
						//针对下面对应的dd高亮显示
						$('.navDd').removeClass('isShow');
						
						//当前的展示开来
						
						$(oDl).find('dd').slideToggle();
						
						oDl.addClass('active');
						oDd.addClass('isShow');
						oDd.addClass('navDd');
						oDl.addClass('chouse');
					});
				}
			}
		};
	});

	app.directive('innerTag2', function(){
		return {
			restrict:'E',
			template:'<dd><span ng-transclude></span></dd>',
			replace:true,
			transclude:true,
			require:'?^outNav',
			compile:function(iEle,iAttr,transclude){
				iAttr.$set('class','navDd');
				return function(scope,iEle,iAttr,outTop){
					iEle.on('click',function(){
						$('.isShow').removeClass('active');
						iEle.addClass('active');
						outTop.goTo(iAttr.url);
					});
				}
			}
		};
	});


	app.controller('leftCrl',['$scope',function($scope){
		$scope.title = '导航';
		//导航

		$scope.navs = [
				{
					title:'基础信息',
					childs:[]
				},{
					title:'电子钱包',
					childs:[
						{
							name:'充值管理',
							url:'index.topUp'
						},
						{
							name:'消费管理',
							url:'index.expense'
						},
						{
							name:'交易审计',
							url:'index.trading'
						}
					]
				},{
					title:'电子钱包',
					childs:[
						{
							name:'充值管理',
							url:'index.topUp'
						},
						{
							name:'消费管理',
							url:'index.expense'
						},
						{
							name:'交易审计',
							url:'index.trading'
						}
					]
				},
				{
					title:'终端系统',
					childs:[
						{
							name:'异系统卡片',
							url:'index.card'
						},
						{
							name:'开卡信息',
							url:'index.info'
						},
						{
							name:'业务和交易',
							url:'index.business'
						},
						{
							name:'黑名单',
							url:'index'
						},
						{
							name:'消费管理组件',
							url:'index.consume'
						},
						{
							name:'业务联动组件',
							url:'index.linkage'
						}
					]
				},
				{
					title:'一卡通系统',
					childs:[
						{
							name:'卡片管理',
							url:'index.cardManage'
						},
						{
							name:'日志监控',
							url:'index.log'
						}
					]
				}
		];
	}]);
});