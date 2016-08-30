/**
 *  作者：yeshengqiang
 *    时间：2016-08-09
 *    描述：出入库报表
 */
define(function (require) {
    var app = require('../../../../../app');
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
            $http.post(url + '/outinput/showPageListD', $.extend({}, page, param)).success(callback);
        };
        $scope.searchDadilyPaginator = app.get('Paginator').list(currentCheck, 6);
        console.log($scope.searchDadilyPaginator);
        //月报表查询
        var currentCheck = function (page, callback) {
            console.log(page);
            console.log($scope.searchData);
            var param = app.get('checkValue').searchData($scope.searchData);
            console.log(param);
            $http.post(url + '/outinput/showPageListM', $.extend({}, page, param)).success(callback);
        };
        $scope.searchMonthlyPaginator = app.get('Paginator').list(currentCheck, 6);
        console.log($scope.searchMonthlyPaginator);
        //状态
        var state = 1;
        $scope.changeState1 = function () {
            state = 1;
            $scope.searchDadilyPaginator._load();
        };
        $scope.changeState2 = function () {
            state = 2;
            $scope.searchMonthlyPaginator._load();
        };
        //搜索

        $scope.search = function () {
            //日报表查询分页
            if($scope.searchData.types==''||$scope.searchData.types==null){
                yMake.layer.msg('请补全搜索类型',{icon:2});
                return;
            }
                switch (+state) {
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
            if($scope.searchData.types==''||$scope.searchData.types==null){
                yMake.layer.msg('请补全搜索类型',{icon:2});
                return;
            }
            window.location.href = url + '/outinput/export?type=' + '1';
        };

        //查看日报表明细
        $scope.dailyCheck = function (item) {
            $('#daily').modal({backdrop: 'static', keyboard: false});
            $scope.modalTitle = '查看日报表明细';
            console.log(item);
            $scope.daily = {};
            $scope.daily.storagecode = item.storagecode;
            $scope.daily.storagename = item.storagename;
            $scope.daily.goodscode = item.goodscode;
            $scope.daily.goodsname = item.goodsname;
            $scope.daily.amount = item.amount;
            $scope.daily.weight = item.weight;
            $scope.daily.volum = item.volum;
            $scope.daily.shdate = item.shdate;
            $scope.daily.fydate = item.fydate;
            if (item.types == 1) {
                $scope.daily.types = "入库";
            } else {
                $scope.daily.types = "出库";
            }
        };

        //查看月报表明细
        $scope.monthlyCheck = function (item) {
            $('#monthly').modal({backdrop: 'static', keyboard: false});
            $scope.modalTitle = '查看月报表明细';
            console.log(item);
            $scope.monthly = {};
            $scope.monthly.storagecode = item.storagecode;
            $scope.monthly.storagename = item.storagename;
            $scope.monthly.goodscode = item.goodscode;
            $scope.monthly.goodsname = item.goodsname;
            $scope.monthly.amount = item.amount;
            $scope.monthly.weight = item.weight;
            $scope.monthly.volum = item.volum;
            $scope.monthly.shdate = item.shdate;
            $scope.monthly.fydate = item.fydate;
            if (item.types == 1) {
                $scope.monthly.types = "入库";
            } else {
                $scope.monthly.types = "出库";
            }
        };
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});