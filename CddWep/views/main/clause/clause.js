/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：仓到店条款
 */
define(function(require){
    var app = require('../../../app');

    app.controller('clausCrl',['$scope','url','$http',function($scope,url,$http){
        $scope.title = '仓到店条款';
        function load(){
            var fetchFunction = function(page,callback){
                $http.post(url+'/storagetoshop/showPageList', $.extend({},page,{})).success(callback)
            };
            $scope.items = app.get('Paginator').list(fetchFunction,6);

        }
        load();
        console.log($scope.items);
        /*$scope.items = [{company:'652856',types:'XXXXXXXXXX规定',time:'2017-10-22'},
            {company:'6528561',types:'XXXX管理规定',time:'2017-10-22'},
            {company:'6523256',types:'GKHKH管理规定',time:'2017-10-22'},
            {company:'65318561',types:'XXXX管理规定',time:'2017-10-22'},
            {company:'6526123',types:'GKHKH管理规定',time:'2017-10-22'}
        ];*/

        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});