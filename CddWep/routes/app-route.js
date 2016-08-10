define(function (require) {
    var app = require('../app');
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main/starAssertNormal');
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '': {
                        templateUrl: 'views/login/login.html',
                        controllerUrl: 'views/login/login',
                        controller: 'loginCrl'
                    }
                }
            })
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
                        controller: 'leftCrl'
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
                        controller: 'customerCrl'
                    }
                }
            })
            //服务团队
            .state('main.clients.serviceTeam', {
                url: '/serviceTeam',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/clients/serviceTeam/serviceTeam.html',
                        controllerUrl: 'views/main/clients/serviceTeam/serviceTeam',
                        controller: 'serviceTeamCrl'
                    }
                }
            })

            //我的客户里面的差错记录
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

            //早安1919
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
            //新建早安1919
            .state('main.newGoodMorning', {
                url: '/newGoodMorning',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/newGoodMorning/newGoodMorning.html',
                        controllerUrl: 'views/main/newGoodMorning/newGoodMorning',
                        controller: 'newGoodMorningCrl'
                    }
                }
            })
            //我的服务商
            .state('main.myService', {
                url: '/myService',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/myService/myService.html',
                        controllerUrl: 'views/main/myService/myService',
                        controller: 'myServiceCrl'
                    }
                }
            })
            //我的服务商里面的上报差错
            .state('main.myService.errorManagement', {
                url: '/errorManagement',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/myService/errorManagement/errorManagement.html',
                        controllerUrl: 'views/main/myService/errorManagement/errorManagement',
                        controller: 'myServiceErrorManagementCrl'
                    }
                }
            })
            //品质中心里面的差错明细
            .state('main.qualityCenter.errorManagement.errorAnalyze', {
                url: '/errorAnalyze',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/qualityCenter/errorManagement/errorAnalyze/errorAnalyze.html',
                        controllerUrl: 'views/main/qualityCenter/errorManagement/errorAnalyze/errorAnalyze',
                        controller: 'errorAnalyzeCrl'
                    }
                }
            })
            //品质中心里面的差错分析
            .state('main.qualityCenter.errorManagement.errorDetail', {
                url: '/errorDetail',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/qualityCenter/errorManagement/errorDetail/errorDetail.html',
                        controllerUrl: 'views/main/qualityCenter/errorManagement/errorDetail/errorDetail',
                        controller: 'errorDetailCrl'
                    }
                }
            })
            //星级评定标准
            .state('main.starManage', {
                url: '/starAssertNormal',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/starManage/starAssertNormal.html',
                        controllerUrl: 'views/main/starManage/starAssertNormal',
                        controller: 'starAssertNormalCrl'
                    }
                }
            })
            //我的星级
            .state('main.myStar', {
                url: '/myStar',
                views: {
                    'main@main': {
                        templateUrl: 'views/main/myStar/myStar.html',
                        controllerUrl: 'views/main/myStar/myStar',
                        controller: 'myStarCrl'
                    }
                }
            })

    }]);
});