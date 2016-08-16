/**
 *  作者：yeshengqiang
 *	时间：2016-08-09
 *	描述：服务团队
 */
define(function(require){
    var app = require('../../../app');

    app.controller('clientsCrl',['$scope','url','$http',function($scope,url,$http){
        $scope.division = {"北京市":["东城区", "延庆县"], "上海市": ["黄浦区", "南汇区", "奉贤区", "崇明县"], "天津市": ["和平区", "静海县", "蓟县"]};
        $scope.items = [
            {
                id:'1',
                name:'张三',
                phone:'13455667788',
                work:'经理',
                post:'管理',
                des:'无'
            },
            {
                id:'2',
                name:'李四',
                phone:'13455667788',
                work:'经理',
                post:'管理',
                des:'无'
            },
            {
                id:'3',
                name:'王五',
                phone:'13455667788',
                work:'经理',
                post:'管理',
                des:'无'
            }
        ];

        function load(){
            var currentCheck = function(page,callback){
                $http.post(url+'/warehouse/user/hyquery2Page',
                    {pageSize:page,address:$scope.address,companyName:$scope.companyName}).success(callback);
            };
            $scope.searchPaginator = app.get('Paginator').list(currentCheck,6);
        }
        load();

        /**
         * 上传
         */
        $scope.exportFile = function () {
            $('#export').modal({backdrop: 'static', keyboard: false});
            $('#upload').empty().append('<div id="zyUpload"></div>');
            $("#zyUpload").zyUpload({
                width: "100%",                 // 宽度
                height: "100%",                 // 宽度
                itemWidth: "140px",                 // 文件项的宽度
                itemHeight: "115px",                 // 文件项的高度
                url: url + "/warehouse/file/upload?types=2",  // 上传文件的路径
                fileType: ["jpg", "png", "txt", "js", "exe"],// 上传文件的类型
                fileSize: 51200000,                // 上传文件的大小
                multiple: true,                    // 是否可以多个文件上传
                dragDrop: true,                    // 是否可以拖动上传文件
                tailor: true,                    // 是否可以裁剪图片
                del: true,                    // 是否可以删除文件
                finishDel: false,  				  // 是否在上传文件完成后删除预览
                //paramKey:'types',
                //paramValue:'2',
                /* 外部获得的回调接口 */
                onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    console.info("当前选择了以下文件：");
                    console.info(selectFiles);
                },
                onDelete: function (file, files) {              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
                    console.info("当前删除了此文件：");
                    console.info(file.name);
                },
                onSuccess: function (file, response) {          // 文件上传成功的回调方法
                    console.info("此文件上传成功：");
                    console.info(file.name);
                    console.info("此文件上传到服务器地址：");
                    console.info(response);
                },
                onFailure: function (file, response) {          // 文件上传失败的回调方法
                    console.info("此文件上传失败：");
                    console.info(file.name);
                },
                onComplete: function (response) {           	  // 上传完成的回调方法
                    console.info("文件上传完成");
                    console.info(response);
                }
            });
        };

        //背景色自适应高度
        yMake.fn.autoHeight('.bgWhite',45);
    }]);
});