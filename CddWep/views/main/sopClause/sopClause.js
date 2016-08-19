/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：SOP条款
 */
define(function(require){
    var app = require('../../../app');

    app.controller('sopClauseCrl',['$scope','url','$http',function($scope,url,$http){
        $scope.title = 'SOP条款';

        function load(){
            var fetchFunction = function(page,callback){
                //$http.post(url+'/sop/showPageList', $.extend({},page,{})).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
        }
        load();
        /*$scope.items = [{company:'652856',types:'入库操作SOP',time:'2017-10-22',shim:'关于XXXX的通报'},
            {company:'6528561',types:'类型2',time:'2017-10-22',shim:'关于XXXX的通报'},
            {company:'6523256',types:'类型3',time:'2017-10-22',shim:'关于XXXX的通报'},
            {company:'65318561',types:'类型4',time:'2017-10-22',shim:'关于XXXX的通报'},
            {company:'6526123',types:'类型5',time:'2017-10-22',shim:'关于XXXX的通报'}];*/
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});
