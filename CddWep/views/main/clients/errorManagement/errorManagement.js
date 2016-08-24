/**
 *  作者：cl
 *    时间：2016-08-10
 *    描述：差错管理
 */
define(function (require) {
    var app = require('../../../../app');

    app.controller('errorManagementCrl', ['$scope', '$http', 'url', function ($scope, $http, url) {


        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)
        $scope.parentTitle = '';                        //父标题
        if(role==1){
            $scope.parentTitle = '我的服务商';
            $scope.demand = true;
        }else if(role==2){
            $scope.parentTitle = '我的客户';
            $scope.services = true;
        }

        $scope.division1 = [
            "类型1",
            "类型2",
            "类型3",
            "类型4"
        ];
        $scope.division2 = [
            "类型1",
            "类型2",
            "类型3",
            "类型4"
        ];
        $scope.division3 = [
            "类型1",
            "类型2",
            "类型3",
            "类型4"
        ];
        $scope.items = [
            {
                sbname: 'xx酒业',
                type1: '操作类',
                type2: '时效类',
                type3: '退货时效',
                money: '1000',
                description: '差错描述',
                sbdate: '2016-8-10 14:15:21',
                reply: '未判定'
            }
        ];

        $scope.search=function(){

        };

        /*var bgWhite = $('.bgWhite');
         bgWhite.css('height',$(document).height()-bgWhite.offset().top-20);*/
        //yMake.fn.autoHeight('.bgWhite', 45);
        $scope.mistake= {};
        function load() {
            var fetchFunction = function (page, callback) {
                $http.post(url+'/mistake/showPageList', $.extend({},page,{})).success(callback)
            };
            $scope.mistakes = app.get('Paginator').list(fetchFunction, 6);
        }
        load();



        //导出
        $scope.downloadFile = function(){
            /*if($scope.brandedcompanyid==''||$scope.brandedcompanyid==null||
                $scope.cities==''||$scope.cities==null||
                $scope.provinces==''||$scope.provinces==null){
                yMake.layer.msg('请补全搜索条件',{icon:2});
                return;
            }*/
            var teamInfo = {brandedcompanyid:$scope.brandedcompanyid,city:$scope.cities,province:$scope.provinces};
            window.open(url+'/team/export?teamInfo='+JSON.stringify(teamInfo));
        };

        //新增差错
        $scope.addMistake = function(){
            $('#demandNew').modal('hide');
            $http.post(url+'/mistake/add',$scope.mistake).success(function(data){
                if(data.code==0){
                    yMake.layer.msg('上传成功！',{icon:1})
                }
            }).error(function(){
                yMake.layer.msg('上传出错！',{icon:2})
            })
        };

        $scope.appeal = function(item){

        }
    }]);
});