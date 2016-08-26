/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：通报栏
 */
define(function (require) {
    var app = require('../../../app');
    //过滤器
    app.filter('typeFormat', function () {
        return function (inp) {
            //类型暂未给出
            var info = "";
            switch (inp) {
                case '1':
                    info = '类型1';
                    break;
                case '2':
                    info = '类型2';
                    break;
                case '3':
                    info = '类型3';
                    break;
            }
            return info;
        };
    });

    app.controller('navBarCrl', ['$scope', 'url', '$http', function ($scope, url, $http) {

        //搜索条件
        $scope.searchData = {};

        //条件
        $scope.division = [
            {value:1,name:'类型1'},
            {value:2,name:'类型2'},
            {value:3,name:'类型3'}
        ];
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.brand = false;                        //通报栏表格(物流)
        $scope.transport = false;                    //通报栏表格(品牌)
        $scope.backstage = false;                    //通报栏表格(后台)
        $scope.newNotice = false;                   //新建(后台)
        if (role == 1) {
            $scope.brand = true;
        } else if (role == 2) {
            $scope.transport = true;
        } else {
            $scope.backstage = true;
            $scope.newNotice = true;
        }

        var currentCheck = function (page, callback) {
            console.log(page);
            console.log($scope.searchData);
            var param = app.get('checkValue').searchData($scope.searchData);
            console.log(param);
            $http.post(url + '/brief/showPageList', $.extend({},page,param)).success(callback);
        };
        $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
        console.log($scope.projectItem);

        //下载
        $scope.download = function (fileName) {
            console.log(fileName);
            window.location.href = url + '/file/download?path=' + fileName;
        };


        // yMake.fn.autoHeight('.bgWhite',45);
    }]);
});