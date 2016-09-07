define(function(require){
    var app = require('../../../../../app');
    app.controller('lookEmailCrl',['$scope','url','$http','$rootScope','$location',function($scope,url,$http,$rootScope,$location){
        $scope.lookItem={};
        console.log(0);
        console.log($rootScope.params);
        var id = $rootScope.params;
            console.log(2);
            $http.post(url + '/email/detail',id).success(function (data) {
                console.log(3);
                console.log(data);
                $scope.lookItem.title=data.data.title;
                //发件人
                $scope.lookItem.sendPerson=data.data.sendname;
                //收件人
                $scope.lookItem.getPerson=data.data.receivename;
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
