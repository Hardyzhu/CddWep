/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：客户需求
 */
define(function(require){
	var app = require('../../../app');

	app.controller('customerCrl',['$scope','$http','url',function($scope,$http,url){
        $scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.items = [
            {
                //id:'1',
                name:'拓达科技有限公司',
                city:'北京市',
                //phone:'13855667788',
                storage:'1200',
                citydelivery:'300',
                artery:'6'
            }
        ];

        $scope.search=function(){

        }
        //获取分页数据
        var currentCheck = function(page,callback){
            $http.post(url+'/warehouse/user/hyquery2Page',{page:page,loginname:'pinpai'}).success(callback);
        };

        $scope.projectItem = app.get('Paginator').list(currentCheck,6);
        console.log($scope.projectItem);

        $scope.change = function(){

        };


        yMake.fn.autoHeight('.bgWhite',45);
	}]);
});