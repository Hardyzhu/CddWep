/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：导航页面(分不同的权限进入不同的页面)
 */
define(function(require){
    var app = require('../../../app');

    /*app.directive('outTag', function(){
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                *//*（1品牌、2物流、3后台）*//*
                scope.pageUrl = 'views/main/left/' + attrs.permiss + '.html';
                attrs.$observe("permiss",function(permiss){
                    console.log(permiss);
                    if(permiss==1){
                        scope.pageUrl = 'views/main/left/brand.html';
                    }else if(permiss==2){
                        scope.pageUrl = 'views/main/left/logistics.html';
                    }else{
                        scope.pageUrl = 'views/main/left/backstage.html';
                    }
                });
            },
            template: '<div class="sidebar" ng-include="pageUrl"></div>',
            replace:true
        }
    });*/

    app.directive('sideBar',function(){
        return {
            restrict:'E',
            transclude:true,
            scope:{
                navs:'&'
            },
            controller:['$scope',function($scope){
                $scope.navs = $scope.navs();
            }],
            template:
            '<div class="sidebar_boxs" ng-repeat="nav in navs" >'+
                '<h3 ng-click="select(nav,$event)" data-url="{{nav.link}}">'+
                '<span class="glyphicon" ng-class="nav.icon"></span>{{nav.label}}</h3>'+
                '<ul class="sidebar_one" style="dispaly:block;" ng-class="{active:$index==0}">'+
                    '<li ng-repeat="item in nav.children">'+
                        '<h4 class="two font14" ng-click="select2(item,$event)" data-url="{{item.link}}"><span class="glyphicon" ng-class="item.icon"></span>{{item.label}}</h4>'+
                        '<ul class="sidebar_two">'+
                            '<li class="three" data-url="{{itm.link}}" ng-repeat="itm in item.children"><span class="glyphicon" ng-class="itm.icon"></span>{{itm.label}}</li>'+
                        '</ul>'+
                    '</li>'+
                '</ul>'+
            '</div>',
            replace:true
        }
    });


    app.controller('leftCrl',['$scope',function($scope){
        $scope.permiss = '2';

        $scope.select = function(item,event) {
            if(item.children.length==0){
                //$state.go();
                event.target.getAttribute('data-url')
            }else{
                $(event.target).addClass('active');
                $(event.target).nextAll('.sidebar_one').slideToggle();
                $(event.target).parent().siblings().find('.sidebar_one').slideUp();
            }
        };
        $scope.select2 = function(item,event) {
            console.log();
            if(item.children.length==0){
                //$state.go();
                alert(1);
                event.target.getAttribute('data-url')
            }else{
                $(event.target).nextAll('.sidebar_two').slideToggle();
                $(event.target).parent().siblings().find('.sidebar_two').slideUp();
            }
        };
        $scope.navs = [
            {
                "label": "基本信息",icon:'glyphicon-file',link:'',
                "children": []
            },
            {
                "label": "股票",icon:'glyphicon-file',
                "children": [
                    {
                        "label": "基本面分析",icon:'glyphicon-file',
                        "children": [
                            {"label": "上市公司基本面数据查看","link":"#",icon:'glyphicon-file'}
                        ]
                    },
                    {
                        "label": "量化选股策略",icon:'glyphicon-file',
                        "children": []
                    }
                ]
            },
            {
                "label": "宏观",icon:'glyphicon-file',
                "children": [
                    {
                        "label": "宏观数据",icon:'glyphicon-file',
                        "children": [
                            {"label": "宏观数据概览","link":"#",icon:'glyphicon-file'}
                        ]
                    },
                    {
                        "label": "宏观经济预测",icon:'glyphicon-file',
                        "children": []
                    },
                    {
                        "label": "宏观经济和大类资产表现",icon:'glyphicon-file',
                        "children": []
                    }
                ]
            }
        ];
    }]);
});