/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：注册页面
 */
define(function(require){
    var app = require('../../app');

    app.controller('registerCrl',['$scope', '$location', '$state',function($scope,$location,$state){

        $scope.register = function(){
            //注册成功之后登陆
            $location.path('/login');
        };
    }]);
});