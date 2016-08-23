/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：SOP条款
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('sopClauseCrl', ['$scope', 'url', '$http', '$location', function ($scope, url, $http, $location) {
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
        var currentCheck = function (page, callback) {
            console.log($scope.searchData);
            $http.post(url + '/sop/showPageList', $.extend({}, page, $scope.searchData)).success(callback);
        };
        $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
        console.log($scope.projectItem);

        //编辑事件
        $scope.edit = function (item) {
            item = JSON.stringify(item);
            $location.path('/main/sopClause/newSopClause/' + item);
        };

        //搜索功能
        if (role == 1) {
            $scope.search = function () {
                var params = {
                    fileno: $scope.fileno,
                    theme: $scope.theme,
                    scdate: $scope.scdate,
                    //缺少一个条款明细字段
                };
                var fetchFunction = function (page, callback) {
                    $http.post(url + '/sop/showPageList', $.extend({}, page, params)).success(callback)
                };
                $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            };
        } else if (role == 2) {
            $scope.search = function () {
                var params = {
                    fileno: $scope.fileno,
                    theme: $scope.theme,
                    scdate: $scope.scdate,
                    //缺少一个条款明细字段
                };
                var fetchFunction = function (page, callback) {
                    $http.post(url + '/sop/showPageList', $.extend({}, page, params)).success(callback)
                };
                $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            };
        } else if (role == 3) {
            $scope.search = function () {
                var params = {
                    scdate: $scope.scdate,
                    fileno: $scope.fileno,
                    name: $scope.name
                };
                var fetchFunction = function (page, callback) {
                    $http.post(url + '/sop/showPageList', $.extend({}, page, params)).success(callback)
                };
                $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            };
        }

        //删除
        $scope.deleteById = function (id) {
            $http.get(url + '/sop/delete?id=' + id).success(function () {
                $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
                yMake.layer.msg('删除成功！', {icon: '1', time: 2000});
            }).error(function(){
                yMake.layer.msg('删除失败！', {icon: '2', time: 2000});
            })
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
        // yMake.fn.autoHeight('.bgWhite', 45)
    }]);
});
