/**
 *  作者：yeshengqiang
 *    时间：2016-08-09
 *    描述：出入库报表
 */
define(function (require) {
    var app = require('../../../../../app');
    //过滤器
    app.filter('typeFormat', function () {
        return function (inp) {
            //类型暂未给出
            var info = "";
            switch (inp) {
                case '1':
                    info = '入库';
                    break;
                case '2':
                    info = '出库';
                    break;
            }
            return info;
        };
    });
    app.controller('outPutCrl', ['$scope', 'url', '$http', function ($scope, url, $http) {

        //条件
        $scope.division = [
            {value: 1, name: '出库'},
            {value: 2, name: '入库'}
        ];
        $scope.searchData = {};

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;                  //(1:品牌，2：物流，3：后台)
        $scope.transport = false;                        //(物流)
        $scope.brand = false;                          //(品牌)
        $scope.parentTitle = '';                        //父标题
        if (role == 1) {
            $scope.parentTitle = '我的服务商';
            $scope.brand = true;
        } else if (role == 2) {
            $scope.parentTitle = '我的客户';
            $scope.transport = true;
        }


        //日报表查询分页
        $scope.searchData = {};
        var currentCheck = function (page, callback) {
            console.log(page);
            console.log($scope.searchData);
            var param = app.get('checkValue').searchData($scope.searchData);
            console.log(param);
            $http.post(url + '/outinput/showPageListD', $.extend({},page,param)).success(callback);
        };
        $scope.searchDadilyPaginator = app.get('Paginator').list(currentCheck, 6);
        console.log($scope.searchDadilyPaginator);
        //月报表查询
        var currentCheck = function (page, callback) {
            console.log(page);
            console.log($scope.searchData);
            var param = app.get('checkValue').searchData($scope.searchData);
            console.log(param);
            $http.post(url + '/outinput/showPageListM', $.extend({},page,param)).success(callback);
        };
        $scope.searchMonthlyPaginator = app.get('Paginator').list(currentCheck, 6);
        console.log($scope.searchMonthlyPaginator);
        //状态
        var state=1;
        $scope.changeState1= function (){
            state=1;
        };
        $scope.changeState2= function (){
            state=2;
        };
        //搜索

        $scope.search = function () {
                //日报表查询分页
                $scope.searchData = {};
                switch (+state){
                    case 1:
                        $scope.searchDadilyPaginator._load();
                        break;
                    default:
                        $scope.searchMonthlyPaginator._load();
                        break;
                }
        };

        //导出
        $scope.downloadFile = function () {

            window.location.href = url + '/outinput/export?type=' + '1';
        };
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});