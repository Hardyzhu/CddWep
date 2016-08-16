/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：导航页面(分不同的权限进入不同的页面)
 */
define(function(require){
    var app = require('../../../app');

    app.directive('sideBar',function(){
        return {
            restrict:'E',
            transclude:true,
            scope:{
                permiss:'@'
            },
            controller:['$scope','$http',function($scope,$http){
                $scope.navs = null;
                $scope.$watch('permiss',function(newValue,oldValue){
                    var jsonName = '';
                    if($scope.permiss==2){
                        jsonName = 'logistics';

                    }else if($scope.permiss==1){
                        jsonName = 'brand';
                    }else{
                        jsonName = 'backstage';
                    }
                    if(jsonName!=''){
                        $http.post('views/main/left/'+jsonName+'.json').success(function(data){
                            $scope.navs = data;
                        });
                    }
                });
            }],
            template:
            '<div class="sidebar_boxs" ng-repeat="nav in navs" ng-class="{active:$index==0}">'+
                '<h3 ng-click="select(nav,$event)" data-url="{{nav.link}}">'+
                '<span class="glyphicon" ng-class="nav.icon"></span>{{nav.label}}</h3>'+
                '<ul class="sidebar_one" style="dispaly:block;">'+
                    '<li ng-repeat="item in nav.children" ng-class="{active:$index==0}">'+
                        '<h4 class="two font14" ng-click="select2(item,$event)" data-url="{{item.link}}"><span class="glyphicon" ng-class="item.icon"></span>{{item.label}}</h4>'+
                        '<ul class="sidebar_two">'+
                            '<li class="three" ng-click="select3($event)" data-url="{{itm.link}}" ng-repeat="itm in item.children"><span class="glyphicon" ng-class="itm.icon"></span>{{itm.label}}</li>'+
                        '</ul>'+
                    '</li>'+
                '</ul>'+
            '</div>',
            replace:true
        }
    });


    app.controller('leftCrl',['$scope','$state','$http',function($scope,$state,$http){
        $scope.permiss = '2';
        $scope.btnIndex = '0';
        //获取用户权限
        if(!sessionStorage.getItem('userInfo')){
            var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            console.log(userInfo);
        }
        $scope.select = function(item,event) {
            if(item.children.length==0){
                var obj = event.target || event.srcElement;
                var url = obj.getAttribute('data-url');
                $state.go(url);
            }else{
                $(event.target).nextAll('.sidebar_one').slideToggle();
            }
            $(event.target).parent().addClass('active');
            $(event.target).parent().siblings().removeClass('active');
            $(event.target).parent().siblings().find('.sidebar_one').slideUp();
        };
        $scope.select2 = function(item,event) {
            if(item.children.length==0){
                var obj = event.target || event.srcElement;
                var url = obj.getAttribute('data-url');
                $state.go(url);
            }else{
                $(event.target).nextAll('.sidebar_two').slideToggle();
            }
            $(event.target).parent().addClass('active');
            $(event.target).parent().siblings().removeClass('active');
            $(event.target).parent().siblings().find('.sidebar_two').slideUp();
        };

        $scope.select3 = function(event){
            var obj = event.target || event.srcElement;
            var url = obj.getAttribute('data-url');
            $state.go(url);
            $(event.target).addClass('active');
            $(event.target).siblings().removeClass('active');
        };
    }]);
});