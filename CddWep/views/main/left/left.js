/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：导航页面(分不同的权限进入不同的页面)
 */
define(function(require){
    var app = require('../../../app');

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
            '<div class="sidebar_boxs" ng-repeat="nav in navs" ng-class="{active:$index==0}">'+
                '<h3 ng-click="select(nav,$event)" data-url="{{nav.link}}">'+
                '<span class="glyphicon" ng-class="nav.icon"></span>{{nav.label}}</h3>'+
                '<ul class="sidebar_one" style="dispaly:block;" ng-class="{active:$index==0}">'+
                    '<li ng-repeat="item in nav.children">'+
                        '<h4 class="two font14" ng-click="select2(item,$event)" data-url="{{item.link}}"><span class="glyphicon" ng-class="item.icon"></span>{{item.label}}</h4>'+
                        '<ul class="sidebar_two">'+
                            '<li class="three" ng-click="select3($event)" data-url="{{itm.link}}" ng-repeat="itm in item.children"><span class="glyphicon" ng-class="itm.icon"></span>{{itm.label}}</li>'+
                        '</ul>'+
                    '</li>'+
                '</ul>'+
            '</div>',
            replace:true
        }
    });


    app.controller('leftCrl',['$scope','$state',function($scope,$state){
        $scope.permiss = '2';

        $scope.select = function(item,event) {
            if(item.children.length==0){
                var url = event.target.getAttribute('data-url');
                $state.go(url);
            }else{
                $(event.target).nextAll('.sidebar_one').slideToggle();
            }
            $(event.target).parent().addClass('active');
            $(event.target).parent().siblings().removeClass('active');
            $(event.target).parent().siblings().find('.sidebar_one').slideUp();
        };
        $scope.select2 = function(item,event) {
            if(item.children.length==0){
                var url = event.target.getAttribute('data-url');
                $state.go(url);
            }else{
                $(event.target).nextAll('.sidebar_two').slideToggle();
            }
            $(event.target).parent().addClass('active');
            $(event.target).parent().siblings().removeClass('active');
            $(event.target).parent().siblings().find('.sidebar_two').slideUp();
        };

        $scope.select3 = function(event){
            var url = event.target.getAttribute('data-url');
            $state.go(url);
            $(event.target).addClass('active');
            $(event.target).siblings().removeClass('active');
        };

        if($scope.permiss==2){
            $scope.navs = [
                {
                    "label": "基本信息(物流)",icon:'glyphicon-file',link:'main.baseInfo',
                    "children": []
                },
                {
                    "label": "客户需求",icon:'glyphicon-list-alt',link:'main.customer',
                    "children": []
                },
                {
                    "label": "我的客户",icon:'glyphicon-user',
                    "children": [
                        {
                            "label": "服务团队",icon:'glyphicon-user',link:'main.clients',
                            "children": []
                        },
                        {
                            "label": "合同条款",icon:'glyphicon-user',link:'main.clients.clause',
                            "children": []
                        },
                        {
                            "label": "运营报表",icon:'glyphicon-user',
                            "children": [
                                {"label": "配送报表","link":"main.clients.reports",icon:'glyphicon-user'},
                                {"label": "调拨报表","link":"main.clients.reports.allot",icon:'glyphicon-user'},
                                {"label": "退货数据","link":"main.clients.reports.returnData",icon:'glyphicon-user'},
                                {"label": "时效数据","link":"main.clients.reports.agingData",icon:'glyphicon-user'},
                                {"label": "出入库报表","link":"main.clients.reports.outPut",icon:'glyphicon-user'},
                                {"label": "盘点差异表","link":"main.clients.reports.inventory",icon:'glyphicon-user'}
                            ]
                        },
                        {
                            "label": "公函管理",icon:'glyphicon-file',link:'main.clients.officeManagement',
                            "children": []
                        },
                        {
                            "label": "差错管理",icon:'glyphicon-file',link:'main.clients.errorManagement',
                            "children": []
                        },
                        {
                            "label": "投诉管理",icon:'glyphicon-file',link:'main.clients.complaintRecord',
                            "children": []
                        },
                        {
                            "label": "理赔管理",icon:'glyphicon-file',link:'main.clients.claimManagement',
                            "children": []
                        }
                    ]
                },
                {
                    "label": "账户中心",icon:'glyphicon-credit-card',link:'main.accountCenter',
                    "children": []
                },
                {
                    "label": "仓到店条款",icon:'glyphicon-usd',link:'main.clause',
                    "children": []
                },
                {
                    "label": "SOP条款",icon:'glyphicon-dashboard',link:'main.sopClause',
                    "children": []
                },
                {
                    "label": "通报栏",icon:'glyphicon-bullhorn',link:'main.navBar',
                    "children": []
                },
                {
                    "label": "星级管理",icon:'glyphicon-star',
                    "children": [
                        {"label": "星级评定标准","link":"main.starManage",icon:'glyphicon-star',"children": []},
                        {"label": "我的星级 ","link":"main.starManage.myStar",icon:'glyphicon-star',"children": []}
                    ]
                },
                {
                    "label": "问题反馈",icon:'glyphicon-paste',link:'main.problemAnswer',
                    "children": []
                },
                {
                    "label": "早安1919",icon:'glyphicon-apple',link:'main.goodMorning',
                    "children": []
                }
            ];
        }else if($scope.permiss==1){
            $scope.navs = [
                {
                    "label": "基本信息(品牌)",icon:'glyphicon-file',link:'main.baseInfo',
                    "children": []
                },
                {
                    "label": "客户需求",icon:'glyphicon-list-alt',link:'main.customer',
                    "children": []
                },
                {
                    "label": "我的客户",icon:'glyphicon-user',
                    "children": [
                        {
                            "label": "服务团队",icon:'glyphicon-user',link:'main.clients',
                            "children": []
                        },
                        {
                            "label": "合同条款",icon:'glyphicon-user',link:'main.clients.clause',
                            "children": []
                        },
                        {
                            "label": "运营报表",icon:'glyphicon-user',
                            "children": [
                                {"label": "配送报表","link":"main.clients.reports",icon:'glyphicon-user'},
                                {"label": "调拨报表","link":"main.clients.reports.allot",icon:'glyphicon-user'},
                                {"label": "退货数据","link":"main.clients.reports.returnData",icon:'glyphicon-user'},
                                {"label": "时效数据","link":"main.clients.reports.agingData",icon:'glyphicon-user'},
                                {"label": "出入库报表","link":"main.clients.reports.outPut",icon:'glyphicon-user'},
                                {"label": "盘点差异表","link":"main.clients.reports.inventory",icon:'glyphicon-user'}
                            ]
                        },
                        {
                            "label": "公函管理",icon:'glyphicon-file',link:'main.clients.officeManagement',
                            "children": []
                        },
                        {
                            "label": "差错管理",icon:'glyphicon-file',link:'main.clients.errorManagement',
                            "children": []
                        },
                        {
                            "label": "投诉管理",icon:'glyphicon-file',link:'main.clients.complaintRecord',
                            "children": []
                        },
                        {
                            "label": "理赔管理",icon:'glyphicon-file',link:'main.clients.claimManagement',
                            "children": []
                        }
                    ]
                },
                {
                    "label": "账户中心",icon:'glyphicon-list-alt',link:'main.accountCenter',
                    "children": []
                },
                {
                    "label": "仓到店条款",icon:'glyphicon-list-alt',link:'main.clause',
                    "children": []
                },
                {
                    "label": "SOP条款",icon:'glyphicon-list-alt',link:'main.sopClause',
                    "children": []
                },
                {
                    "label": "通报栏",icon:'glyphicon-list-alt',link:'main.navBar',
                    "children": []
                },
                {
                    "label": "星级管理",icon:'glyphicon-user',
                    "children": [
                        {"label": "星级评定标准","link":"main.starManage",icon:'main.starManage',"children": []},
                        {"label": "我的星级 ","link":"main.starManage.myStar",icon:'main.starManage.myStar',"children": []}
                    ]
                },
                {
                    "label": "问题反馈",icon:'glyphicon-list-alt',link:'main.problemAnswer',
                    "children": []
                },
                {
                    "label": "早安1919",icon:'glyphicon-list-alt',link:'main.goodMorning',
                    "children": []
                }
            ];
        }else{
            $scope.navs = [
                {
                    "label": "基本信息（后台）",icon:'glyphicon-file',link:'main.baseInfo',
                    "children": []
                },
                {
                    "label": "客户需求",icon:'glyphicon-list-alt',link:'main.customer',
                    "children": []
                },
                {
                    "label": "我的客户",icon:'glyphicon-user',
                    "children": [
                        {
                            "label": "服务团队",icon:'glyphicon-user',link:'main.clients',
                            "children": []
                        },
                        {
                            "label": "合同条款",icon:'glyphicon-user',link:'main.clients.clause',
                            "children": []
                        },
                        {
                            "label": "运营报表",icon:'glyphicon-user',
                            "children": [
                                {"label": "配送报表","link":"main.clients.reports",icon:'glyphicon-user'},
                                {"label": "调拨报表","link":"main.clients.reports.allot",icon:'glyphicon-user'},
                                {"label": "退货数据","link":"main.clients.reports.returnData",icon:'glyphicon-user'},
                                {"label": "时效数据","link":"main.clients.reports.agingData",icon:'glyphicon-user'},
                                {"label": "出入库报表","link":"main.clients.reports.outPut",icon:'glyphicon-user'},
                                {"label": "盘点差异表","link":"main.clients.reports.inventory",icon:'glyphicon-user'}
                            ]
                        },
                        {
                            "label": "公函管理",icon:'glyphicon-file',link:'main.clients.officeManagement',
                            "children": []
                        },
                        {
                            "label": "差错管理",icon:'glyphicon-file',link:'main.clients.errorManagement',
                            "children": []
                        },
                        {
                            "label": "投诉管理",icon:'glyphicon-file',link:'main.clients.complaintRecord',
                            "children": []
                        },
                        {
                            "label": "理赔管理",icon:'glyphicon-file',link:'main.clients.claimManagement',
                            "children": []
                        }
                    ]
                },
                {
                    "label": "账户中心",icon:'glyphicon-list-alt',link:'main.accountCenter',
                    "children": []
                },
                {
                    "label": "仓到店条款",icon:'glyphicon-list-alt',link:'main.clause',
                    "children": []
                },
                {
                    "label": "SOP条款",icon:'glyphicon-list-alt',link:'main.sopClause',
                    "children": []
                },
                {
                    "label": "通报栏",icon:'glyphicon-list-alt',link:'main.navBar',
                    "children": []
                },
                {
                    "label": "星级管理",icon:'glyphicon-user',
                    "children": [
                        {"label": "星级评定标准","link":"main.starManage",icon:'main.starManage',"children": []},
                        {"label": "我的星级 ","link":"main.starManage.myStar",icon:'main.starManage.myStar',"children": []}
                    ]
                },
                {
                    "label": "问题反馈",icon:'glyphicon-list-alt',link:'main.problemAnswer',
                    "children": []
                },
                {
                    "label": "早安1919",icon:'glyphicon-list-alt',link:'main.goodMorning',
                    "children": []
                }
            ];
        }
    }]);
});