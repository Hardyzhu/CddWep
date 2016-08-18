/**
 *  作者：makaiqin
 *	时间：2016-08-10
 *	描述：问题反馈
 */
define(function(require){
    var app = require('../../../app');

    app.controller('problemAnswerCrl',['$scope','url','$http',function($scope,url,$http){
        //$scope.title = '问题反馈';

        $scope.items= [
            {
                id:'1',
                type:'物流',
                detail:'如何查询物流信息',
                fkdate:'2016/8/38',
                response:'已解决'
            }

        ];

        var answerList = function(page,callback){
            $http.post(url+'/warehouse/suggestion/showPageList',{pageSize:page}).success(callback);
        };
        $scope.answerList = app.get('Paginator').list(answerList,6);
        console.log($scope.answerList);
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});