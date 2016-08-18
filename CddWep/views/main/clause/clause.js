/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：仓到店条款
 */
define(function(require){
    var app = require('../../../app');

    app.controller('clausCrl',['$scope',function($scope){
        $scope.title = '仓到店条款';
        $scope.items = [
            {fileno:'652856',name:'XXXXXXXXXX规定',scdate:'2017-10-22'},
            {fileno:'652856',name:'XXXXXXXXXX规定',scdate:'2017-10-22'},
            {fileno:'652856',name:'XXXXXXXXXX规定',scdate:'2017-10-22'},
            {fileno:'652856',name:'XXXXXXXXXX规定',scdate:'2017-10-22'},
            {fileno:'652856',name:'XXXXXXXXXX规定',scdate:'2017-10-22'},
            {fileno:'652856',name:'XXXXXXXXXX规定',scdate:'2017-10-22'}
        ];
            yMake.fn.autoHeight('.bgWhite',45);
    }]);
});