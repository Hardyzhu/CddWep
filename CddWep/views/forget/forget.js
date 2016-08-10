/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：忘记密码
 */
define(function(require){
    var app = require('../../app');

    app.controller('forgetCrl',['$scope', '$location', '$state',function($scope,$location,$state){

        $scope.register = function(){
            //注册成功之后登陆
            $location.path('/login');
        };
    }]);
});