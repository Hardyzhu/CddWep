define(function(require){
    var app = require('../../../../../app');
    app.controller('lookEmailCrl',['$scope','url','$http','$rootScope','$location',function($scope,url,$http,$rootScope,$location){
        $scope.lookItem={};
        console.log($rootScope.params);
        var id = $rootScope.params;
            console.log(1);
            $http.post(url + '/email/detail',id).success(function (data) {
                console.log(data);
                $scope.lookItem.title=data.data.title;
                $scope.lookItem.sendPerson=data.data.sendid;
                $scope.lookItem.getPerson=data.data.receid;
                $scope.lookItem.time=data.data.fsdate;
                $scope.lookItem.content=data.data.content;
            });
        //返回按钮的点击事件
        $scope.btnReturn=function(){
            $location.path('/main/clients/officeManagement');
        };
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
