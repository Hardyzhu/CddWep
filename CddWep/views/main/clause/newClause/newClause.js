/**
 *  作者：
 *    时间：2016-08-08
 *    描述：仓到库条款新增和修改页面
 */
define(function (require) {
    var app = require('../../../../app');

    app.controller('newClauseCrl', ['$scope','$rootScope', 'url', '$http', function ($scope,$rootScope, url, $http) {
        if($rootScope.params.item){
            console.log($rootScope.params.item);
            $scope.title="修改仓到店条款";
            var param=JSON.parse($rootScope.params.item);
            $scope.clauseInfo = {};
            $scope.clauseInfo.name = param.name;
            $scope.clauseInfo.content = param.content;
            $scope.clauseInfo.id = param.id;

            //修改
            $scope.save=function(){
                $http.post(url + '/storagetoshop/update', $scope.clauseInfo).success(function (data) {
                    yMake.layer.msg('修改成功!', {icon: '1', time: 2000});
                }).error(function () {
                    yMake.layer.msg('修改失败!', {icon: '2', time: 2000});
                });
            };
        }else {
            $scope.title="新增仓到店条款";
            //新增
            $scope.save=function(){
                $scope.clauseInfo = {};
                $http.post(url + '/storagetoshop/add', $scope.clauseInfo).success(function () {
                    yMake.layer.msg('添加成功!', {icon: '1', time: 2000});
                    $("#newAddModal").modal("hide");
                }).error(function () {
                    yMake.layer.msg('添加失败!', {icon: '2', time: 2000});
                });
            };

        }

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
    }]);
});
