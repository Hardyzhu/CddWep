/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：仓到店条款
 */
define(function(require){
    var app = require('../../../app');

    app.controller('clausCrl',['$scope','url','$http',function($scope,url,$http){
        $scope.title = '仓到店条款';
            var fetchFunction = function(page,callback){
                $http.post(url+'/sop/showPageList', $.extend({},page,{})).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);


        //删除
        $scope.deleteById = function(id){
          $http.get(url+'/sop/delete?id='+id).success(function(){
              layer.msg('删除成功！',{time:1500,icon:1});
              load();
          }).error(function(){
              layer.msg('删除失败！',{time:1500,icon:2});
          });
        };


        //下载
        $scope.download = function(fileName){
            window.location.href=url+'/file/download?path='+fileName;
        };


        //yMake.fn.autoHeight('.bgWhite',45)
    }]);
});