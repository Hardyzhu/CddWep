/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：路由首页
 */
define(function(require){
	var app = require('../../app');

	app.controller('mainCrl',['$scope','$rootScope',function($scope,$rootScope){
        $(function(){
            setTimeout(function () {
                yMake.fn.autoHeight('.leftBox',16);
            },10)
        });
        // 时间控件
        $rootScope.dateRangePicker = function(seletor){
            $(seletor).daterangepicker({
                singleDatePicker: false,
                //timePicker: true, //是否启用时间选择
                timePickerIncrement: 1, //分钟选择的间隔
                format: 'YY-MM-DD', //返回值的格式
                timePicker12Hour: true, //采用24小时计时制
                locale : {
                    applyLabel: '确定',
                    cancelLabel: '取消',
                    format:'YYYY-MM-DD',
                    separator: '/'
                }
            });
        };
        //背景色自适应高度
        $rootScope.autoHeight = function(modifyHeight){
            yMake.fn.autoHeight('.bgWhite',modifyHeight);
        }
	}]);
});