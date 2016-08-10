/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：导航页面(分不同的权限进入不同的页面)
 */
define(function(require){
    var app = require('../../../app');

    app.directive('outTag', function(){
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                /*（1品牌、2物流、3后台）*/
                scope.pageUrl = 'views/main/left/' + attrs.permiss + '.html';
                attrs.$observe("permiss",function(permiss){
                    console.log(permiss);
                    if(permiss==1){
                        scope.pageUrl = 'views/main/left/brand.html';
                    }else if(permiss==2){
                        scope.pageUrl = 'views/main/left/logistics.html';
                    }else{
                        scope.pageUrl = 'views/main/left/backstage.html';
                    }
                });
            },
            template: '<div class="sidebar" ng-include="pageUrl"></div>',
            replace:true
        }
    });

    app.controller('leftCrl',['$scope',function($scope){
        $scope.permiss = '2';
    }]);
});