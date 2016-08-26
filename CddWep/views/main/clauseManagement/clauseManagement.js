/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：合同管理
 */
define(function(require){
    var app = require('../../../app');

    app.controller('clauseManagementCrl',['$scope','$http','url',function($scope,$http,url){
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //分页查询
        var fetchFunction = function(page,callback){
            $http.post(url+'/pact/showPageList?loginname='+userInfo.data.loginname, $.extend({},page,{})).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        console.log($scope.searchPaginator);

        //删除
        $scope.del = function(id){
            layer.confirm('确定删除？', {
                btn: ['确定','取消'] //按钮
            }, function(){
                layer.closeAll('dialog');
                $http.post(url+'/pact/delete',{id:id}).success(function(data){
                    $scope.searchPaginator._load();
                    yMake.layer.msg('删除成功',{icon:1});
                }).error(function(data){
                    yMake.layer.msg('删除失败',{icon:2});
                })
            });
        };

        //下载
        $scope.down = function(fileName){
            window.location.href = url + '/file/download?path=' + fileName;
        };

        //修改
        $scope.add = function(){

        };

        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});

