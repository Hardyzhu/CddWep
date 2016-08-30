/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：SOP条款
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('sopClauseCrl', ['$scope', 'url', '$http', '$location', '$state','$rootScope',function ($scope, url, $http, $location,$state,$rootScope) {
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)

        if (role == 1) {
            $scope.services = true;
        } else if (role == 2) {
            $scope.demand = true;
        } else if (role == 3) {
            $scope.houtai = true;
        }


        //初始化
        $scope.searchData = {};
        //获取分页数据
        if (role == 1) {
            var currentCheck = function (page, callback) {
                console.log($scope.searchData);
                var param = app.get('checkValue').searchData($scope.searchData);
                console.log(param);
                $http.post(url + '/sop/showPageList', $.extend({},page, param)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);

            //下载
            $scope.download = function (fileName) {
                window.location.href = url + '/file/download?path=' + fileName;
            };
        }else if(role == 2){
            var currentCheck = function (page, callback) {
                console.log($scope.searchData);
                var param = app.get('checkValue').searchData($scope.searchData);
                console.log(param);
                $http.post(url + '/sop/showPageList', $.extend({},page, param)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);

            //下载
            $scope.download = function (fileName) {
                window.location.href = url + '/file/download?path=' + fileName;
            };
        }else if(role == 3){
            var currentCheck = function (page, callback) {
                console.log($scope.searchData);
                var param = app.get('checkValue').searchData($scope.searchData);
                console.log(param);
                $http.post(url + '/sop/showPageList', $.extend({},page, param)).success(callback);
            };
            $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
            console.log($scope.projectItem);

            //编辑事件
            $scope.edit = function (item) {
                $rootScope.itemInfo = item;
                $state.go('main.sopClause.newSopClause');
            };

            //删除
            $scope.deleteById = function (id) {
                $http.get(url + '/sop/delete?id=' + id).success(function () {
                    $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
                    yMake.layer.msg('删除成功！', {icon: '1', time: 2000});
                }).error(function(){
                    yMake.layer.msg('删除失败！', {icon: '2', time: 2000});
                })
            };
        }


        //yMake.fn.autoHeight('.bgWhite',45);
        /*$scope.items = [{company:'652856',types:'入库操作SOP',time:'2017-10-22',shim:'关于XXXX的通报'},
         {company:'6528561',types:'类型2',time:'2017-10-22',shim:'关于XXXX的通报'},
         {company:'6523256',types:'类型3',time:'2017-10-22',shim:'关于XXXX的通报'},
         {company:'65318561',types:'类型4',time:'2017-10-22',shim:'关于XXXX的通报'},
         {company:'6526123',types:'类型5',time:'2017-10-22',shim:'关于XXXX的通报'}];*/
    }]);
});
