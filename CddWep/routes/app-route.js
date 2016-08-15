define(function (require) {
    var app = require('../app');

    app.run(['$rootScope','$location','$timeout','$stateParams',function($rootScope,$location,$timeout,$stateParams){
        $rootScope.params = $stateParams;
        $rootScope.$on('$stateChangeSuccess',function(event,toState){
            var state = ['login','register','forget'];
            //查找对应的路由
            if(state.indexOf(toState.name)>-1){
                return;
            }
            if(!sessionStorage.getItem('userInfo')){
               // event.preventDefault();
                layer.msg('暂无登陆信息,请重新登陆!',{icon:0,time:2000});
                $timeout(function(){
                    $location.path('/login');
                },3000);
            }
        });
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            //登录
            .state('login', {
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'views/login/login.html',
                        controllerUrl: 'views/login/login',
                        controller: 'loginCrl',
                        dependencies: ['services/checkValue']
                    }
                }
            })
            //注册
            .state('register', {
                url: '/register',
                views: {
                    '': {
                        templateUrl: 'views/register/register.html',
                        controllerUrl: 'views/register/register',
                        controller: 'registerCrl',
                        dependencies: ['services/checkValue']
                    }
                }
            })
            //忘记密码
            .state('forget', {
                url: '/forget',
                views: {
                    '': {
                        templateUrl: 'views/forget/forget.html',
                        controllerUrl: 'views/forget/forget',
                        controller: 'forgetCrl',
                        dependencies: ['services/checkValue']
                    }
                }
            })
            //首页
            .state('main', {
                url: '/main',
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'views/main/main.html',
                        controllerUrl: 'views/main/main',
                        controller: 'mainCrl'
                    },
                    'top@main': {
                        templateUrl: 'views/main/top/top.html',
                        controllerUrl: 'views/main/top/top',
                        controller: 'topCrl'
                    },
                    'left@main': {
                        templateUrl: 'views/main/left/left.html',
                        controllerUrl: 'views/main/left/left',
                        controller: 'leftCrl',
                       // resolve:[]
                    }
                }
            })
            //基础信息
            .state('main.baseInfo', {
                url: '/baseInfo',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/baseInfo/baseInfo.html',
                        controllerUrl: 'views/main/baseInfo/baseInfo',
                        controller: 'baseInfoCrl'
                    }
                }
            })
            //客户需求
            .state('main.customer', {
                url: '/customer',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/customer/customer.html',
                        controllerUrl: 'views/main/customer/customer',
                        controller: 'customerCrl',
                        dependencies: ['services/PageServices']
		  			}
		  		}
		  	})
		  	//我的客户--服务团队
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
            //合同条款
            .state('main.clients.clause', {
                url: '/clause',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/clause/clause.html',
                        controllerUrl: 'views/main/clients/clause/clause',
                        controller: 'serviceTeamCrl'
                    }
                }
            })
            //运营报表-配送报表
            .state('main.clients.reports', {
                url: '/reports',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/reports/reports.html',
                        controllerUrl: 'views/main/clients/reports/reports',
                        controller: 'reportsCrl'
                    }
                }
            })
            //调拨报表
            .state('main.clients.reports.allot', {
                url: '/allot',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/reports/allot/allot.html',
                        controllerUrl: 'views/main/clients/reports/allot/allot',
                        controller: 'allotCrl'
                    }
                }
            })
            //退货数据
            .state('main.clients.reports.returnData', {
                url: '/returnData',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/reports/returnData/returnData.html',
                        controllerUrl: 'views/main/clients/reports/returnData/returnData',
                        controller: 'returnDataCrl'
                    }
                }
            })
            //时效数据
            .state('main.clients.reports.agingData', {
                url: '/agingData',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/reports/agingData/agingData.html',
                        controllerUrl: 'views/main/clients/reports/agingData/agingData',
                        controller: 'agingDataCrl'
                    }
                }
            })
            //出入库报表
            .state('main.clients.reports.outPut', {
                url: '/outPut',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/reports/outPut/outPut.html',
                        controllerUrl: 'views/main/clients/reports/outPut/outPut',
                        controller: 'outPutCrl'
                    }
                }
            })
            //盘点差异表
            .state('main.clients.reports.inventory', {
                url: '/inventory',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/reports/inventory/inventory.html',
                        controllerUrl: 'views/main/clients/reports/inventory/inventory',
                        controller: 'inventoryCrl'
                    }
                }
            })

            //公函管理
            .state('main.clients.officeManagement', {
                url: '/officeManagement',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/officeManagement/officeManagement.html',
                        controllerUrl: 'views/main/clients/officeManagement/officeManagement',
                        controller: 'officeManagementCrl'
                    }
                }
            })

            //差错管理
            .state('main.clients.errorManagement', {
                url: '/errorManagement',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/errorManagement/errorManagement.html',
                        controllerUrl: 'views/main/clients/errorManagement/errorManagement',
                        controller: 'errorManagementCrl'
                    }
                }
            })

            //投诉管理
            .state('main.clients.complaintRecord', {
                url: '/complaintRecord',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/complaintRecord/complaintRecord.html',
                        controllerUrl: 'views/main/clients/complaintRecord/complaintRecord',
                        controller: 'complaintRecordCrl'
                    }
                }
            })

            //理赔管理
            .state('main.clients.claimManagement', {
                url: '/claimManagement',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/claimManagement/claimManagement.html',
                        controllerUrl: 'views/main/clients/claimManagement/claimManagement',
                        controller: 'claimManagementCrl'
                    }
                }
            })

            //账户中心
            .state('main.accountCenter', {
                url: '/accountCenter',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/accountCenter/accountCenter.html',
                        controllerUrl: 'views/main/accountCenter/accountCenter',
                        controller: 'accountCenterCrl'
                    }
                }
            })

            //仓到店条款
            .state('main.clause', {
                url: '/clause',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clause/clause.html',
                        controllerUrl: 'views/main/clause/clause',
                        controller: 'clausCrl'
                    }
                }
            })

            //SOP条款
            .state('main.sopClause', {
                url: '/sopClause',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/sopClause/sopClause.html',
                        controllerUrl: 'views/main/sopClause/sopClause',
                        controller: 'sopClauseCrl'
                    }
                }
            })

            //通报栏
            .state('main.navBar', {
                url: '/navBar',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/navBar/navBar.html',
                        controllerUrl: 'views/main/navBar/navBar',
                        controller: 'navBarCrl'
                    }
                }
            })

            //星级管理--星级评定标准
            .state('main.starManage', {
                url: '/starManage',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/starManage/starAssertNormal.html',
                        controllerUrl: 'views/main/starManage/starAssertNormal',
                        controller: 'starAssertNormalCrl'
                    }
                }
            })

            //我的星级
            .state('main.starManage.myStar', {
                url: '/myStar',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/starManage/myStar/myStar.html',
                        controllerUrl: 'views/main/starManage/myStar/myStar',
                        controller: 'myStarCrl'
                    }
                }
            })

            //问题反馈
            .state('main.problemAnswer', {
                url: '/problemAnswer',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/problemAnswer/problemAnswer.html',
                        controllerUrl: 'views/main/problemAnswer/problemAnswer',
                        controller: 'problemAnswerCrl'
                    }
                }
            })

            //问题反馈--问题填写
            .state('main.problemAnswer.problemWrite', {
                url: '/problemWrite',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/problemAnswer/problemWrite/problemWrite.html',
                        controllerUrl: 'views/main/problemAnswer/problemWrite/problemWrite',
                        controller: 'problemWriteCrl'
                    }
                }
            })

            //早安1919(物流)
            .state('main.goodMorning', {
                url: '/goodMorning',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/goodMorning/goodMorning.html',
                        controllerUrl: 'views/main/goodMorning/goodMorning',
                        controller: 'goodMorningCrl'
                    }
                }
            })
/******************************以上是物流管理*****************************/



    }]);
});