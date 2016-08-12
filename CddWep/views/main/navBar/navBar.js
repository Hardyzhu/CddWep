/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：通报栏
 */
define(function(require){
    var app = require('../../../app');

    app.controller('navBarCrl',['$scope',function($scope){
        $scope.title = '通报栏';
        $scope.items = [{company:'XX物流',types:'类型1',time:'2017-10-22',shim:'关于XXXX的通报'},
            {company:'XX物流',types:'类型1',time:'2017-10-22',shim:'关于XXXX的通报'},
            {company:'XX物流',types:'类型1',time:'2017-10-22',shim:'关于XXXX的通报'},
            {company:'XX物流',types:'类型1',time:'2017-10-22',shim:'关于XXXX的通报'},
            {company:'XX物流',types:'类型1',time:'2017-10-22',shim:'关于XXXX的通报'}];
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});