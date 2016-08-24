/**
 * 作者：makaiqin
 * 时间：2016-08-10
 * 描述：意见反馈
 */
define(function (require) {
    var app = require('../../../app');
    //过滤器
    app.filter('typeFormat', function () {
        return function (inp) {
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

    app.filter('statusFormat', function () {
        return function (inp) {
            var info = "";
            switch (inp) {
                case '1':
                    info = '已回复';
                    break;
                case '2':
                    info = '未回复';
                    break;
            }
            return info;
        };
    });

    app.controller('viewAnswerCrl', ['$scope', 'url', '$http', '$location', function ($scope, url, $http, $location) {

        //问题状态
        $scope.division = [
            {value: 1, name: '已回复'},
            {value: 2, name: '未回复'}
        ];
        //初始化
        $scope.searchData = {};
        //获取分页数据
        var currentCheck = function (page, callback) {
            console.log($scope.searchData);
            var parm = app.get('checkValue').searchData($scope.searchData);
            console.log(parm);
            $http.post(url + '/suggestion/showPageList', $.extend({}, parm)).success(callback);
        };
        $scope.projectItem = app.get('Paginator').list(currentCheck, 6);
        console.log($scope.projectItem);

        $scope.lookSome = function (item) {
            item = JSON.stringify(item);
            $location.path('/main/viewAnswer/viewWrite/' + item);
        };


    }]);

});


