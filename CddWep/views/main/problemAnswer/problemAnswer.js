/**
 *  作者：makaiqin
 *	时间：2016-08-10
 *	描述：问题反馈
 */
define(function(require){
    var app = require('../../../app');

    app.controller('problemAnswerCrl',['$scope','url','$http','$location',function($scope,url,$http,$location){


        var answerList = function(page,callback){
            $http.post(url+'/warehouse/suggestion/showPageList',{pageSize:page}).success(callback);
        };
        $scope.searchPaginator = app.get('Paginator').list(answerList,6);

        //问题反馈
        $scope.feedback = function(){

            $location.path('/main/problemAnswer/problemWrite');
        };

        yMake.fn.autoHeight('.bgWhite',45);

    }]);
});