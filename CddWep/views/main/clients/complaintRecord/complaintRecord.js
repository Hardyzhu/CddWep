/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：投诉管理
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('complaintRecordCrl',['$scope','url','$http','$location',function($scope,url,$http,$location){
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


        $scope.division=[
             {name:'类型1',value:'01'},
             {name:'类型2',value:'02'},
             {name:'类型3',value:'03'},
             {name:'类型4',value:'04'}
        ];

        /*$scope.items = [
            {
                brandedcompanyid:'xx酒业',
                type:'类型1',
                description:'投诉类容',
                sbdate:'投诉时间',
                time1:'2016-08-10 17:25:02',
                time2:'2016-08-10 18:25:02',
                score:'满意',
                status:'未回复'
            }];*/
        
        //获取分页数据
        function load(){
        	$scope.complaint = [];
           var fetchFunction = function(page,callback){
               $http.post(url+'/complaint/showPageList', $.extend({},page,$scope.complaint)).success(callback);
           };
           $scope.searchPaginator = app.get('Paginator').list(fetchFunction,6);
           console.log($scope.searchPaginator);
        }
        load();

        $scope.search = function(){

        };

        $scope.exp=function(){
        	layer.confirm("是否导出文件？",
                    {btn : ['是','否']},function(){
                        if(angular.isUndefined($scope.accountRecord)){
                            layer.msg("请选择要导出的文件 ",{icon:0,time:1000});
                            return;
                        }
                        window.location.href=fileUrl +"/complaint/export.do?financialGroupTotalId="+$scope.accountRecord.financialGroupTotalId;
                        layer.msg("导出总结文件成功 ",{icon:1,time:1000});
                    })
        };

        $scope.returnMessage=function(){
            $http.post(url+'warehouse').success(function(){
                console.log(data);
            });
        };


        /*var record = function(){
            $http.post(url+'')
        };*/
        console.log(app.get('Paginator'));
        /*var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)*/
        yMake.fn.autoHeight('.bgWhite',45)
    }]);
});
