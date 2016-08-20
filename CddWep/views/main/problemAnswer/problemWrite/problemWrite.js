/**
 *  作者：makaiqin
 *	时间：2016-08-10
 *	描述：问题填写
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('problemWriteCrl',['$scope','$location','$http','url',function($scope,$location,$http,url){

        $scope.parm = {};

        //下拉菜单
        $scope.selects = [
            {value:'0',name:'选择1'},
            {value:'1',name:'选择2'},
            {value:'2',name:'选择3'}
        ];

        //提交
        $scope.sub = function(){
            app.get('checkValue').isNull();
            $http.post(url + '/suggestion/add', parm).success(function(data){
                console.log(data);
                yMake.layer.msg('提交成功!',{icon:1});
            }).error(function(){
                yMake.layer.msg('提交失败!',{icon:2});
            });
        };

        //取消
        $scope.cancle = function(){
            //切记清空数据
            $scope.parm = {};
            $location.path('/main/problemAnswer');
        };
    }]);
});