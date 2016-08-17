/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：注册页面
 */
define(function(require){
    var app = require('../../app');

    app.controller('registerCrl',['$scope', '$location', '$http', 'url',function($scope,$location,$http,url){
        $scope.registerInfo = {};
        $scope.read = false; //默认为未选中
        $scope.uploadPhoto = function(event){

            $('#example').modal({backdrop:'static'});
            $('#upload').empty().append('<div id="zyUpload"></div>');
            $('#zyUpload').zyUpload({
                width            :   "100%",                 // 宽度
                height           :   "100%",                 // 宽度
                itemWidth: "140px",                 // 文件项的宽度
                itemHeight: "115px",                 // 文件项的高度
                url: url+"",  // 上传文件的路径
                fileType: ["jpg", "png", "jpeg", "gif"],// 上传文件的类型
                fileSize: 51200000,                // 上传文件的大小
                multiple: true,                    // 是否可以多个文件上传
                dragDrop: true,                    // 是否可以拖动上传文件
                tailor: true,                    // 是否可以裁剪图片
                del: true,                    // 是否可以删除文件
                finishDel: false,  				  // 是否在上传文件完成后删除预览
                /* 外部获得的回调接口 */
                onSelect: function (selectFiles, allFiles) {    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                },
                onDelete: function (file, files) {
                },
                onSuccess: function (file, response) {          // 文件上传成功的回调方法
                },
                onFailure: function (file, response) {          // 文件上传失败的回调方法
                },
                onComplete: function (response) {           	  // 上传完成的回调方法
                }
            })
        };

        $scope.register = function(){
            //注册成功之后登陆
            var info = {};
            info.loginname = app.get('checkValue').isNull($scope.registerInfo.loginName);
            info.loginPwd = app.get('checkValue').isNull($scope.registerInfo.loginPwd);
            info.repeatPwd = app.get('checkValue').isNull($scope.registerInfo.repeatPwd);
            info.email = app.get('checkValue').isEmail($scope.registerInfo.email);
            info.companyName = app.get('checkValue').isNull($scope.registerInfo.companyName);
            info.address = app.get('checkValue').isNull($scope.registerInfo.address);
            info.companyer = app.get('checkValue').isNull($scope.registerInfo.companyer);
            info.phone = app.get('checkValue').isTel($scope.registerInfo.phone);
            info.companyInfo = app.get('checkValue').isNull($scope.registerInfo.companyInfo);
            if(!info.loginname.state){
                yMake.layer.msg(info.loginname.info+'登陆名',{icon:'#F00',time:2000});
                return;
            }else if(!info.email.state){
                yMake.layer.msg(info.email.info,{icon:'#F00',time:2000});
                return;
            }else if(!info.companyer.state){
                yMake.layer.msg(info.companyer.info+'公司法人',{icon:'#F00',time:2000});
                return;
            }else if(!info.loginPwd.state){
                yMake.layer.msg(info.loginPwd.info+'新密码',{icon:'#F00',time:2000});
                return;
            }else if(!info.companyName.state){
                yMake.layer.msg(info.companyName.info+'公司名称',{icon:'#F00',time:2000});
                return;
            }else if(!info.phone.state){
                yMake.layer.msg(info.phone.info,{icon:'#F00',time:2000});
                return;
            }else if(!info.repeatPwd.state){//重复密码
                yMake.layer.msg(info.repeatPwd.info+'重复密码',{icon:'#F00',time:2000});
                return;
            }
            /*$http.get(url+'/warehouse/user/add',{userinfo:$scope.registerInfo}).success(function(data){
                console.log(data);
                yMake.layer.msg('登陆成功!');
                $location.path('/login');
            });*/

        };
    }]);
});