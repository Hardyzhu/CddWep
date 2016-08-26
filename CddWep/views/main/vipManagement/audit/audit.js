/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：认证审核
 */
define(function(require){
   var app = require('../../../../app');

    app.controller('auditCrl',['$scope','url','$http','$rootScope',function($scope,url,$http,$rootScope){
        $scope.title = '认证审核';
        console.log('认证审核');
        $scope.changeIt = function(state) {
            $http.post(url + '/user/setState',{state:state,id:$rootScope.params.id}).success(function (data) {
                console.log(data);
                yMake.layer.msg('审核成功!', {icon: '1', time: 2000});
                $location.path('/main/vipManagement');
            }).error(function () {
                yMake.layer.msg('审核失败!', {icon: '2', time: 2000});
            });
        }
    }]);

});