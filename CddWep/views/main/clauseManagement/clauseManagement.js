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
            $http.post(url+'/user/hyquery2Page', $.extend({},page,$scope.searchData)).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);

    }]);
});

