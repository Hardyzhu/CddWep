/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：忘记密码
 */
define(function (require) {
    var app = require('../../app');

    app.controller('forgetCrl', ['$scope', '$location', '$state', 'url', '$http',function ($scope, $location, $state,url,$http) {

        //登录
        $scope.forget = function () {
            if ($scope.username == '' || $scope.username == null) {
                layer.tips('请输入帐号', '#username', {
                    tips: [1, '#3595CC'],
                    time: 4000,
                    tipsMore: true
                });
                return
            }
            if ($scope.email == '' || $scope.email == null) {
                layer.tips('请输入邮箱', '#email', {
                    tips: [1, '#3595CC'],
                    time: 4000,
                    tipsMore: true
                });
                return
            } else {
                var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                if (!reg.test($scope.email)) {
                    layer.tips('邮箱格式不正确！', '#email', {
                        tips: [1, '#3595CC'],
                        time: 4000,
                        tipsMore: true
                    });
                    return
                }
            }
            $.post('',JSON.stringify,{username:$scope.username,email:$scope.email}).success(function(data) {
                console.log(data);

            if (0) {
                layer.tips('帐号不存在', '#username', {
                    tips: [1, '#3595CC'],
                    time: 4000,
                    tipsMore: true
                });
                return;
            } else if (0) {
                layer.tips('邮箱和帐号不匹配', '#password', {
                    tips: [1, '#3595CC'],
                    time: 4000,
                    tipsMore: true
                });
                return;
            } else if (0) {
                layer.alert('找回密码失败，请稍候重试！', {icon: 2});
                return;
            }

            $location.path('/login');
            }).error(function(){
            	layer.alert('找回密码失败，请稍候重试！',{icon:2})
            });
        };
    }]);
});