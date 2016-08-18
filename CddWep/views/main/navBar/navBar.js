/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：通报栏
 */
define(function(require){
    var app = require('../../../app');

    app.controller('navBarCrl',['$scope',function($scope){
        $scope.items = [
            {name:'XX物流',type:'类型1',tbdate:'2017-10-22',title:'关于XXXX的通报'},
            {name:'XX物流',type:'类型1',tbdate:'2017-10-22',title:'关于XXXX的通报'},
            {name:'XX物流',type:'类型1',tbdate:'2017-10-22',title:'关于XXXX的通报'},
            {name:'XX物流',type:'类型1',tbdate:'2017-10-22',title:'关于XXXX的通报'},
            {name:'XX物流',type:'类型1',tbdate:'2017-10-22',title:'关于XXXX的通报'},
            {name:'XX物流',type:'类型1',tbdate:'2017-10-22',title:'关于XXXX的通报'},
        ];
        $scope.btnSearch=function(){

        };
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});