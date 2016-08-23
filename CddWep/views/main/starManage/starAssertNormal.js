/**
 *  作者：maxu
 *	时间：2016-08-09
 *	描述：星级评定标准
 */
define(function(require){
    var app = require('../../../app');

    app.filter('typeFormat',function(){
        return function(inp){
            var info = '';
            switch (inp){
                case '1':
                    info = '差错率';
                    break;
                case '2':
                    info = '投诉率';
                    break;
                case '3':
                    info = '盘点差异率';
                    break;
                case '4':
                    info = '配送超时率';
                    break;
            }
            return info;
        }
    });

    app.controller('starAssertNormalCrl',['$scope','url','$http','$location',function($scope,url,$http,$location){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //物流
        $scope.backstage = false;                          //后台
        $scope.title = '';                                //对应名称
        if(role==2){
            $scope.services = true;
            $scope.title = '星级评定标准';
        }else if(role==3){
            $scope.backstage = true;
            $scope.title = '评比规格';
        }

        //查询所有星级管理
         $http.post(url+'/score/selectAll').success(function(data){
             $scope.score = data.data;
             //var reg = new RegExp('\\.','g');
             angular.forEach($scope.score,function(item,key){
                for(var i in item){
                    if(item.hasOwnProperty(i)){
                        if(item[i]<=1){
                            item[i] = parseInt(item[i]*100) +'%';
                        }
                    }
                }
             });
             yMake.layer.msg('查询成功',{icon:1});
         }).error(function(){
             yMake.layer.msg("查询失败",{icon:2});
         });

        //中转一下
        $scope.centerChange = function(obj){
            var temp = [];
            angular.forEach(obj,function(item,key){
                var tempObj = {};
                for(var i in item) {
                    if (i != undefined) {
                        tempObj[i] = item[i];
                    }
                }
                temp.push(tempObj);
            });
            return temp;
        };
        //后台提交修改之后的数据
        $scope.sub = function(){
            $scope.temp = $scope.centerChange($scope.score);
            angular.forEach($scope.temp,function(item,key){
                for(var i in item){
                    if(item.hasOwnProperty(i)&&/\d+%$/g.test(item[i])){
                        item[i] = item[i].replace(/%$/g,'')/100;
                    }
                }
            });
            console.log($scope.temp);
            $http.post(url+'/score/update',$scope.temp).success(function(data){
                console.log(data);
                yMake.layer.msg('提交成功',{icon:1});
            }).error(function(){
                yMake.layer.msg('提交失败',{icon:1});
            });
        };
    }]);
});