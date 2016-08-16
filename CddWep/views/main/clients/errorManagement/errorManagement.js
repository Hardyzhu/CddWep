/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：差错管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('errorManagementCrl',['$scope','$http','url',function($scope,$http,url){
        $scope.title = '差错记录';
        $scope.items = [
            {
                reportPerson:'xx酒业',
                oneType:'操作类',
                twoType:'时效类',
                threeType:'退货时效',
                compensateNum:'1000',
                errorDescribe:'差错描述',
                reportDate:'2016-8-10 14:15:21',
                state:'未判定'
            },
            {
                reportPerson:'yy酒业',
                oneType:'供应商类',
                twoType:'劳务供应商类',
                threeType:'包装差错',
                compensateNum:'1001',
                errorDescribe:'差错描述',
                reportDate:'2016-8-11 14:15:21',
                state:'判定有错'
            }
        ];

        /*var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20);*/
        yMake.fn.autoHeight('.bgWhite',45);

        function load(){
            var ss = function(page,callback){
                $.get('service/test.json').success(callback)
            };
            console.log(app.get('Paginator'));
            $scope.searchPaginator = app.get('Paginator').list(ss,6);
        }
        load();

        /*setTimeout(function(){
            $scope.$apply(function(){
                $scope.searchPaginator=$scope.searchPaginator
            });
        },100)*/
    }]);
});