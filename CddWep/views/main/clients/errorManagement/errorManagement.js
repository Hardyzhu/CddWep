/**
 *  作者：cl
 *    时间：2016-08-10
 *    描述：差错管理
 */
define(function (require) {
    var app = require('../../../../app');

    app.controller('errorManagementCrl', ['$scope', '$http', 'url', function ($scope, $http, url) {
        $scope.title = '差错记录';
        $scope.division1 = [
            "类型1",
            "类型2",
            "类型3",
            "类型4"
        ];
        $scope.division2 = [
            "类型1",
            "类型2",
            "类型3",
            "类型4"
        ];
        $scope.division3 = [
            "类型1",
            "类型2",
            "类型3",
            "类型4"
        ];
        $scope.items = [
            {
                sbname: 'xx酒业',
                type1: '操作类',
                type2: '时效类',
                type3: '退货时效',
                money: '1000',
                description: '差错描述',
                sbdate: '2016-8-10 14:15:21',
                reply: '未判定'
            }
        ];

        $scope.search=function(){

        };

        /*var bgWhite = $('.bgWhite');
         bgWhite.css('height',$(document).height()-bgWhite.offset().top-20);*/
        yMake.fn.autoHeight('.bgWhite', 45);

        function load() {
            var ss = function (page, callback) {
                $.get('service/test.json').success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(ss, 6);
        }

        load();

        /*setTimeout(function(){
         $scope.$apply(function(){
         $scope.searchPaginator=$scope.searchPaginator
         });
         },100)*/
    }]);
});