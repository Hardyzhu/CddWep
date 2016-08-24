/**
 * 作者：makaiqin
 * 时间：2016-08-10
 * 描述：意见填写
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('viewWriteCrl',['$scope', '$rootScope', 'url', '$http','$location',function($scope, $rootScope, url, $http,$location){
        $scope.title = '意见填写';
        var param=JSON.parse($rootScope.params.item);
        $scope.feedbackInfo={};
        $scope.feedbackInfo.people = param.wlname;
        if(param.type==1){
            $scope.feedbackInfo.type = "类型1";
        }else if(param.type==2){
            $scope.feedbackInfo.type = "类型2";
        }else if(param.type==3){
            $scope.feedbackInfo.type = "类型2";
        }
        $scope.feedbackInfo.detail = param.detail;

        $scope.save=function(){
            $scope.backInfo={};
            $scope.backInfo.id=param.id;
            $scope.backInfo.reply=$scope.reply;
            $http.post(url+"/suggestion/reply?reply="+JSON.stringify($scope.backInfo)).success(function(data){
                console.log(data);
                yMake.layer.msg('回复成功!', {icon: '1', time: 2000});
            }).error(function(){
                yMake.layer.msg('回复失败!', {icon: '2', time: 2000});
            });
        };


    }]);
});
