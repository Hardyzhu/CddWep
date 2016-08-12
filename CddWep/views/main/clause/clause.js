/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：仓到店条款
 */
define(function(require){
    var app = require('../../../app');

    app.controller('clausCrl',['$scope',function($scope){
        $scope.title = '仓到店条款';
        $scope.items = [{company:'652856',types:'XXXXXXXXXX规定',time:'2017-10-22'},
            {company:'6528561',types:'XXXX管理规定',time:'2017-10-22'},
            {company:'6523256',types:'GKHKH管理规定',time:'2017-10-22'},
            {company:'65318561',types:'XXXX管理规定',time:'2017-10-22'},
            {company:'6526123',types:'GKHKH管理规定',time:'2017-10-22'}];
            yMake.fn.autoHeight('.bgWhite',45)
    }]);
});