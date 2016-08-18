/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：投诉管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('complaintRecordCrl',['$scope','$http',function($scope,$http){
        $scope.division=[
            "类型1",
            "类型2",
            "类型3",
            "类型4"
        ];
        $scope.items = [
            {
                brandedcompanyid:'xx酒业',
                type:'类型1',
                description:'投诉类容',
                sbdate:'投诉时间',
                time1:'2016-08-10 17:25:02',
                time2:'2016-08-10 18:25:02',
                score:'满意',
                status:'未回复'
            }];

        $scope.search = function(){

        };

        $scope.export=function(){

        };

        $scope.returnMessage=function(){
            $http.post(url+'warehouse').success(function(){
                console.log(data);
            });
        };


        /*var record = function(){
            $http.post(url+'')
        };*/
        console.log(app.get('Paginator'));
        /*var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)*/
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});