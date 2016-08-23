/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：合同管理
 */
define(function(require){
    var app = require('../../../app');

    app.controller('clauseManagementCrl',['$scope','$http','url',function($scope,$http,url){

        //分页查询
        var fetchFunction = function(page,callback){
            $http.post(url+'/pact/showPageList', $.extend({},page,{})).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        console.log($scope.searchPaginator);

        //删除
        $scope.del = function(id){
            console.log(id);
        };
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});

