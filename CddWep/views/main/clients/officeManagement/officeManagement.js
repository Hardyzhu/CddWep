/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：公函管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('officeManagementCrl',['$scope',function($scope){
        $scope.title = '公函管理';
        $scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.items = [
            {
                id:'1',
                name:'张三',
                phone:'13455667788',
                work:'经理',
                post:'管理',
                des:'无'
            },
            {
                id:'2',
                name:'李四',
                phone:'13455667788',
                work:'经理',
                post:'管理',
                des:'无'
            },
            {
                id:'3',
                name:'王五',
                phone:'13455667788',
                work:'经理',
                post:'管理',
                des:'无'
            }
        ];
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});
