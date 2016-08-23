/**
 *  作者：yeshengqiang
 *    时间：2016-08-08
 *    描述：仓到店条款
 */
define(function (require) {
    var app = require('../../../app');

    app.controller('clausCrl', ['$scope', 'url', '$http', function ($scope, url, $http) {
        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)

        if (role == 1 || role == 2) {
            $scope.services = true;
        } else if (role == 3) {
            $scope.houtai = true;
        }

        function load() {
            var fetchFunction = function (page, callback) {
                $http.post(url + '/storagetoshop/showPageList', $.extend({}, page, {})).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.searchPaginator);
        }

        load();

        //搜索
        $scope.search = function () {
            var params = {
                //时间没有控制，时间搜索不成功
                scdate: $scope.scdate,
                fileno: $scope.fileno,
                name: $scope.name
            };
            var fetchFunction = function (page, callback) {
                $http.post(url + '/storagetoshop/showPageList', $.extend({}, page, params)).success(callback)
            };
            $scope.searchPaginator = app.get('Paginator').list(fetchFunction, 6);
            console.log($scope.searchPaginator);
        };

        //删除
        $scope.deleteById = function (id) {
            $http.get(url + '/storagetoshop/delete?id=' + id).success(function () {
                layer.msg('删除成功！', {time: 1500, icon: 1});
                load();
            }).error(function () {
                layer.msg('删除失败！', {time: 1500, icon: 2});
            });
        };

        //新增
        $scope.addItem = function () {
            var info = {};
            //info.name=app.get('checkValue').isNull($scope.bases.email);
            $scope.clauseAddInfo = {};
            $http.post(url + '/storagetoshop/add', $scope.clauseAddInfo).success(function (data) {
                yMake.layer.msg('添加成功!', {icon: '1', time: 2000});
                load();
                $("#newAddModal").modal("hide");
            }).error(function () {
                yMake.layer.msg('添加失败!', {icon: '2', time: 2000});
            });

        };

        //查看详细信息
        $scope.detailItem = function (item) {
            $scope.clauseUpdateInfo = {};
            //$scope.clauseUpdateInfo.fileno = item.fileno;
            $scope.clauseUpdateInfo.name = item.name;
            $scope.clauseUpdateInfo.content = item.content;
            $scope.clauseUpdateInfo.id = item.id;
        };

        //修改
        $scope.updateItem = function (id) {
            $http.post(url + '/storagetoshop/update?id=' + id, $scope.clauseUpdateInfo).success(function (data) {
                console.log(data);
                yMake.layer.msg('修改成功!', {icon: '1', time: 2000});
                load();
                $("#updateModal").modal("hide");
            }).error(function () {
                yMake.layer.msg('修改失败!', {icon: '2', time: 2000});
            });
        };

        //下载
        $scope.downloadFile = function (fileName, download) {
            window.location.href = url + '/file/download?path=' + fileName;
            download++;
        };

        //上传
        $scope.uploadFiles = function(index){
            var urls = [];//文件路径
            //var p = $('#'+index);
            $('#uploadPhoto').modal({backdrop:'static'});
            $('#upload').empty().append('<div id="zyUpload"></div>');
            $('#zyUpload').zyUpload({
                width            :   "100%",                 // 宽度
                height           :   "100%",                 // 宽度
                itemWidth: "140px",                 // 文件项的宽度
                itemHeight: "115px",                 // 文件项的高度
                url: url+"/file/upload?type="+"",  // 上传文件的路径
                fileType: ["doc", "docx","pdf"],// 上传文件的类型
                fileSize: 51200000,                // 上传文件的大小
                multiple: true,                    // 是否可以多个文件上传
                dragDrop: true,                    // 是否可以拖动上传文件
                //tailor: true,                    // 是否可以裁剪图片
                del: true,                    // 是否可以删除文件
                finishDel: false,  				  // 是否在上传文件完成后删除预览
                /* 外部获得的回调接口 */
                onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                },
                onDelete: function (file, files) {
                },
                onSuccess: function (file, response) {
                    // 文件上传成功的回调方法
                    /*var fileName = JSON.parse(response).data, fileUrl=url+'/'+fileName,src = p.children().attr('src');
                    img.empty().append("<p src="+fileUrl+" width='100%' height='100%'/>");
                    if(urls.length>0&&urls.indexOf(fileName)!=-1){

                    }else if(src!=null){
                        urls.splice(urls.indexOf(src.substring(src.lastIndexOf('upload'))),1,fileName)
                    }else{
                        urls.push(fileName)
                    }*/

                    var fileUrl = JSON.parse(response).data;
                    var fileName=fileUrl.substring(fileUrl.lastIndexOf('upload')+10,fileUrl.lastIndexOf('.'));
                    console.log(fileName);
                    $('input.file').val(fileUrl);
                    $('input.fileName').val(fileName);
                },
                onFailure: function (file, response) {          // 文件上传失败的回调方法
                },
                onComplete: function (response) {           	  // 上传完成的回调方法
                }
            })
        };

        //yMake.fn.autoHeight('.bgWhite',45)
    }]);
});