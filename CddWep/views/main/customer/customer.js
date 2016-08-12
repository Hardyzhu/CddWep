/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：客户需求
 */
define(function(require){
	var app = require('../../../app');

	app.controller('customerCrl',['$scope',function($scope){
        $scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.items = [
            {
                id:'1',
                company:'拓达科技有限公司',
                city:'北京市',
                phone:'13855667788',
                need1:'1200',
                need2:'300',
                des:'6'
            },
            {
                id:'2',
                company:'北京科技有限公司',
                city:'北京市',
                phone:'13855667788',
                need1:'1100',
                need2:'200',
                des:'1'
            },
            {
                id:'3',
                company:'斯维尔科技有限公司',
                city:'北京市',
                phone:'13855667788',
                need1:'1200',
                need2:'300',
                des:'6'
            },
            {
                id:'4',
                company:'光迅科技有限公司',
                city:'北京市',
                phone:'13855667788',
                need1:'1200',
                need2:'300',
                des:'6'
            },
            {
                id:'5',
                company:'天隆科技有限公司',
                city:'北京市',
                phone:'13855667788',
                need1:'1200',
                need2:'400',
                des:'2'
            }
        ];
        yMake.fn.autoHeight('.bgWhite',45);
	}]);
});