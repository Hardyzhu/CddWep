define(function(require){
	var app = require('../../app');

	app.directive('outTag', function(){
		return {
			restrict:'E',
			template:'<dl ng-repeat="item in navs"><inner-tag1>{{item.title}}</inner-tag1><inner-tag2 ng-repeat="itm in item.childs" data-btnIndex="{{$index+1}}" data-url="{{itm.url}}">{{itm.name}}</inner-tag2></dl>',
			replace:true,
			transclude:true,
			scope:{
				navs:'='
			},
			controller:['$scope','$state', function($scope,$state){
				console.log($scope.navs);
				//跳转
				this.go = function(inp){
					$state.go(inp);
				};
			}],
			controllerAs:'outCrl'
		};
	});

	app.directive('innerTag1', function(){
		return {
			restrict:'E',
			template:'<dt><span ng-transclude></span></dt>',
			replace:true,
			transclude:true
		};
	});

	app.directive('innerTag2', function(){
		return {
			restrict:'E',
			template:'<dd><span ng-transclude></span></dd>',
			replace:true,
			transclude:true,
			require:'?^outTag',
			compile:function(iElm,iAttr,transclude){
				iAttr.$set('class','add');
				return {
					pre:function(scope,iElm,iAttr,outCrl){
						var hash = window.location.hash
						var index = hash.lastIndexOf('\/');
						hash = hash.substring(index+1);
						if(hash!='index'){
							hash = 'index.'+hash;
						}
						if(iAttr.url==hash){
							iElm.addClass('active');
						}
					},
					post:function(scope,iElm,iAttr,outCrl){
						iElm.on('click',function(){
							outCrl.go(iAttr.url);
							for(var i=0;i<$('.add').length;i++){
								$('.add').eq(i).removeClass('active');
							}
							iElm.addClass('active');
						});
					}
				}
			}
		};
	});

	app.controller('leftClr', ['$scope',function($scope){
		//导航数据
		$scope.navs = [
					{
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