/**
 *  作者：cl
 *    时间：2016-08-10
 *    描述：通报发布
 */
define(function (require) {
    var app = require('../../../../app');
    app.controller('reportReleasedCrl', ['$scope', 'url', '$http','$location', function ($scope, url, $http,$location) {
        $scope.title = '新建通报';

        //条件
        $scope.division = [
            {value: 1, name: '类型1'},
            {value: 2, name: '类型2'},
            {value: 3, name: '类型3'}
        ];
        var urls = [];//上传附件;
        $scope.uploadPhoto = function (index) {
            var img = $('#' + index);
            $('#uploadPhoto').modal({backdrop: 'static'});
            $('#upload').empty().append('<div id="zyUpload"></div>');
            $("#zyUpload").zyUpload({
                width: "100%",                 // 宽度
                height: "100%",                 // 宽度
                itemWidth: "140px",                 // 文件项的宽度
                itemHeight: "115px",                 // 文件项的高度
                url: url + "/file/upload?type=1",  // 上传文件的路径
                fileType: ["jpg", "png", "txt", "js", "exe"],// 上传文件的类型
                fileSize: 51200000,                // 上传文件的大小
                multiple: true,                    // 是否可以多个文件上传
                dragDrop: true,                    // 是否可以拖动上传文件
                tailor: true,                    // 是否可以裁剪图片
                del: true,                    // 是否可以删除文件
                finishDel: false,  				  // 是否在上传文件完成后删除预览
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
                    // 文件上传成功的回调方法
                    var fileName = JSON.parse(response).data, photoUrl = url + '/' + fileName, src = img.children().attr('src');
                    img.empty().append("<img src=" + photoUrl + " width='100%' height='100%'/>");
                    if (urls.length > 0 && urls.indexOf(fileName) != -1) {

                    } else if (src != null) {
                        urls.splice(urls.indexOf(src.substring(src.lastIndexOf('upload'))), 1, fileName)
                    } else {
                        urls.push(fileName)
                    }
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
        //新建
        $scope.adddata ={};
        $scope.addBrief = function () {


            var name = app.get('checkValue').isNull($scope.adddata.name);
            var type = app.get('checkValue').isNull($scope.adddata.type);
            var title = app.get('checkValue').isNull($scope.adddata.title);
            if(!name.state){
                yMake.layer.msg('请输入通报企业',{icon:0});
                return;
            }else if(!type.state){
                yMake.layer.msg('请输入通报类型',{icon:0});
                return;
            }else if(!title.state){
                yMake.layer.msg('请输入通报主题',{icon:0});
                return;
            }

            $http.post(url + '/brief/add',$scope.adddata).success(function () {
                yMake.layer.msg('保存成功!', {icon: 1});
                $location.path('/main/navBar');
            }).error(function () {
                yMake.layer.msg('保存出错!', {icon: 2})
            })

        };

        var bgWhite = $('.bgWhite');
        bgWhite.css('height', $(document).height() - bgWhite.offset().top - 20)
    }]);
});
