/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：SOP条款
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('sopClauseCrl', ['$scope', 'url', '$http', function ($scope, url, $http) {
        //$scope.title = 'SOP条款';
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)

        if(role==1){
            $scope.demand = true;
        }else if(role==2){
            $scope.services = true;
        }

        var fetchFunction = function (page, callback) {
            $http.post(url + '/sop/showPageList', $.extend({}, page, {})).success(callback)
        };
        $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        console.log($scope.searchPaginator);

        $scope.search = function () {
            var params={
                fileno:$scope.fileno,
                theme:$scope.theme,
                scdate:$scope.scdate,
                //缺少一个条款明细字段
            };
            var fetchFunction = function (page, callback) {
                $http.post(url + '/sop/showPageList', $.extend({}, page, params)).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
        };

        //下载
        $scope.download = function (fileName) {
            window.location.href = url + '/file/download?path=' + fileName;
        };

        /*$scope.items = [{company:'652856',types:'入库操作SOP',time:'2017-10-22',shim:'关于XXXX的通报'},
         {company:'6528561',types:'类型2',time:'2017-10-22',shim:'关于XXXX的通报'},
         {company:'6523256',types:'类型3',time:'2017-10-22',shim:'关于XXXX的通报'},
         {company:'65318561',types:'类型4',time:'2017-10-22',shim:'关于XXXX的通报'},
         {company:'6526123',types:'类型5',time:'2017-10-22',shim:'关于XXXX的通报'}];*/
        yMake.fn.autoHeight('.bgWhite', 45)
    }]);
});
