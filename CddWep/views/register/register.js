/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：注册页面
 */
define(function(require){
    var app = require('../../app');

    app.controller('registerCrl',['$scope', '$location', '$http', 'url',function($scope,$location,$http,url){
        $scope.userinfo = {};
        $scope.read = true; //默认为未选中
        var urls = [];//资质文件路径
        $scope.uploadPhoto = function(index){
            var img = $('#'+index);
            $('#example').modal({backdrop:'static'});
            $('#upload').empty().append('<div id="zyUpload"></div>');
            $('#zyUpload').zyUpload({
                width            :   "100%",                 // 宽度
                height           :   "100%",                 // 宽度
                itemWidth: "140px",                 // 文件项的宽度
                itemHeight: "115px",                 // 文件项的高度
                url: url+"/file/upload?types=1",  // 上传文件的路径
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
                onSuccess: function (file, response) {
                    // 文件上传成功的回调方法
                    var fileName = JSON.parse(response).data, photoUrl=url+'/'+fileName,src = img.children().attr('src');
                    img.empty().append("<img src="+photoUrl+" width='100%' height='100%'/>");
                    if(urls.length>0&&urls.indexOf(fileName)!=-1){

                    }else if(src!=null){
                        urls.splice(urls.indexOf(src.substring(src.lastIndexOf('upload'))),1,fileName)
                    }else{
                        urls.push(fileName)
                    }
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
            info.type = app.get('checkValue').isNull($scope.userinfo.type);
            info.loginname = app.get('checkValue').isNull($scope.userinfo.loginname);
            info.loginPwd = app.get('checkValue').isNull($scope.userinfo.password);
            info.repeatPwd = app.get('checkValue').isNull($scope.userinfo.repeatPassword);
            info.email = app.get('checkValue').isNull($scope.userinfo.email);
            info.email1 = app.get('checkValue').isEmail($scope.userinfo.email);
            info.name = app.get('checkValue').isNull($scope.userinfo.name);
            info.address = app.get('checkValue').isNull($scope.userinfo.address);
            info.corporation = app.get('checkValue').isNull($scope.userinfo.corporation);
            info.phone = app.get('checkValue').isNull($scope.userinfo.phone);
            info.phone1 = app.get('checkValue').isTel($scope.userinfo.phone);
            info.intro = app.get('checkValue').isNull($scope.userinfo.intro);//公司简介
            if(info.type.state){
                yMake.layer.msg(info.loginname.info+'企业类型',{icon:'#F00',time:2000});
                return;
            } else if(info.loginname.state){
                yMake.layer.msg(info.loginname.info+'登陆名',{icon:'#F00',time:2000});
                return;
            }else if(info.email.state){
                yMake.layer.msg(info.email.info+'邮箱',{icon:'#F00',time:2000});
                return;
            }else if(!info.email1.state){
                yMake.layer.msg(info.email1.info,{icon:'#F00',time:2000});
                return;
            }else if(info.corporation.state){
                yMake.layer.msg(info.corporation.info+'公司法人',{icon:'#F00',time:2000});
                return;
            }else if(info.loginPwd.state){
                yMake.layer.msg(info.logintroinPwd.info+'新密码',{icon:'#F00',time:2000});
                return;
            }else if(info.name.state){
                yMake.layer.msg(info.name.info+'公司名称',{icon:'#F00',time:2000});
                return;
            }else if(info.phone.state){
                yMake.layer.msg(info.phone.info+'联系方式',{icon:'#F00',time:2000});
                return;
            }else if(!info.phone1.state){
                yMake.layer.msg(info.phone1.info,{icon:'#F00',time:2000});
                return;
            }else if(info.repeatPwd.state){//重复密码
                yMake.layer.msg(info.repeatPwd.info+'重复密码',{icon:'#F00',time:2000});
                return;
            }else if(info.intro.state){//重复密码
                yMake.layer.msg(info.repeatPwd.info+'公司简介',{icon:'#F00',time:2000});
                return;
            }else if(urls.length<3){
                yMake.layer.msg('请上传完整的资质文件',{icon:'#F00',time:2000});
                return;
            }else if(!$scope.read){
                yMake.layer.msg('您还未同意用户协议',{icon:'#F00',time:2000});
                return;
            }
            $scope.userinfo.certificate = urls.join(',');
            $http.post(url+'/user/update',$scope.userinfo).success(function(data){
                if(data.code==0){
                    yMake.layer.msg(data.messsage,{icon:'#F00',time:2000})
                }
                yMake.layer.msg('保存成功!');
            });

        };
    }]);
});