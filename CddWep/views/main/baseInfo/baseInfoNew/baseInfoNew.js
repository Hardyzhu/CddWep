/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：基础信息
 */
define(function(require){
    var app = require('../../../../app');
    app.controller('baseInfoNewCrl',['$scope','url','$http',function($scope,url,$http){
        $scope.title= '新增服务项目';
        var userInfo = sessionStorage.getItem('userinfo');
        var addOrUpdate = 'add';
        var serviceProject = sessionStorage.getItem('serviceProject');
        if(serviceProject!=null){
            serviceProject = JSON.parse(serviceProject);
            $scope.title = '修改服务项目';
            addOrUpdate = 'update';
            var tabList = $('#tabList');
            switch(serviceProject.type){
                case 0:
                    tabList.find('a[href="#storage"]').tab('show');
                    setTimeout(function(){
                        $scope.$apply(function(){
                            $scope.storage = serviceProject.item;
                        });
                    },100);
                    break;
                case 1:
                    tabList.find('a[href="#city"]').tab('show');
                    setTimeout(function(){
                        $scope.$apply(function(){
                            $scope.cityDelivery = serviceProject.item;
                        });
                    },100);
                    break;
                case 2:
                    tabList.find('a[href="#trunk"]').tab('show');
                    setTimeout(function(){
                        $scope.$apply(function(){
                            $scope.trunkLine = serviceProject.item;
                        });
                    },100);
                    break;
                default :
                    return;
            }
        }
        //添加图片
        var urls = [];//资质文件路径
        $scope.uploadPhoto = function(index){
            var img = $('#'+index);
            $('#uploadFile').modal({backdrop:'static'});
            $('#upload').empty().append('<div id="zyUpload"></div>');
            $("#zyUpload").zyUpload({
                width            :   "100%",                 // 宽度
                height           :   "100%",                 // 宽度
                itemWidth        :   "140px",                 // 文件项的宽度
                itemHeight       :   "115px",                 // 文件项的高度
                url              :   url+"/file/upload",  // 上传文件的路径
                fileType         :   ["jpg","png","txt","js","exe"],// 上传文件的类型
                fileSize         :   51200000,                // 上传文件的大小
                multiple         :   true,                    // 是否可以多个文件上传
                dragDrop         :   true,                    // 是否可以拖动上传文件
                tailor           :   true,                    // 是否可以裁剪图片
                del              :   true,                    // 是否可以删除文件
                finishDel        :   false,  				  // 是否在上传文件完成后删除预览
                /* 外部获得的回调接口 */
                onSelect: function(selectFiles, allFiles){    // 选择文件的回调方法  selectFile:当前选中的文件  allFiles:还没上传的全部文件
                    console.info("当前选择了以下文件：");
                    console.info(selectFiles);
                },
                onDelete: function(file, files){              // 删除一个文件的回调方法 file:当前删除的文件  files:删除之后的文件
                    console.info("当前删除了此文件：");
                    console.info(file.name);
                },
                onSuccess: function(file, response) {          // 文件上传成功的回调方法
                    // 文件上传成功的回调方法
                    var fileName = JSON.parse(response).data, photoUrl = url + '/' + fileName, src = img.children().attr('src');
                    if(index=='img'){
                        $scope.storage.storageform = fileName;
                    }else if(index=='carInfoFile1'){
                        $scope.cityDelivery.trunkimg = fileName;
                    }else if(index=='carInfoFile0'){
                        $scope.trunkLine.trunkimg = fileName;
                    }else{
                        if (urls.length > 0 && urls.indexOf(fileName) != -1) {

                        } else if (src != null) {
                            urls.splice(urls.indexOf(src.substring(src.lastIndexOf('upload'))), 1, fileName)
                        } else {
                            urls.push(fileName)
                        }
                        img.empty().append("<img src=" + photoUrl + " width='100%' height='100%'/>");
                    }
                },
                onFailure: function(file, response){          // 文件上传失败的回调方法
                    console.info("此文件上传失败：");
                    console.info(file.name);
                },
                onComplete: function(response){           	  // 上传完成的回调方法
                    console.info("文件上传完成");
                    console.info(response);
                }
            });
        };

        //获取所有的省
        $http.get(url+'/location/loadProvince').success(function(data){
            $scope.provinces = data.data;
        });
        //根据省id获取城市
        $scope.getCity = function(province){
            $http.get(url+'/location/loadCity?id='+province).success(function(data){
                $scope.cities = data.data;
            })
        };

        //新增仓储服务
        $scope.storage = {};
        $scope.addStorage = function(){
            $scope.storage.storageimg = urls.join(',');
            $scope.storage.loginname=userInfo.data.loginname;
            $http.post(url+'/storage/'+addOrUpdate,$scope.storage).success(function(data){
                if(data.code==0){
                    yMake.layer.msg('新增仓储服务出错！',{icon:1});
                    $scope.trunkLine = {};
                }else{
                    yMake.layer.msg('新增仓储服务失败！',{icon:2})
                }
            }).error(function(){
                yMake.layer.msg('新增仓储服务出错！',{icon:2})
            })
        };
        //新增城配服务
        $scope.cityDelivery = {};
        $scope.addCityDelivery = function(){
            $scope.cityDelivery.type=1;
            $scope.cityDelivery.delivery = $scope.cityDelivery.deliveryStart + '~'+$scope.cityDelivery.deliveryEnd;
            $http.post(url+'/dryline/'+addOrUpdate,$scope.cityDelivery).success(function(data){
                if(data.code==0){
                    yMake.layer.msg('新增城配服务成功！',{icon:1});
                    $scope.cityDelivery = {};
                }else{
                    yMake.layer.msg('新增城配服务失败！',{icon:2})
                }
            }).error(function(){
                yMake.layer.msg('新增城配服务出错！',{icon:2})
            })
        };
        //新增干线服务
        $scope.trunkLine = {};
        $scope.addTrunkLine = function(){
            $scope.trunkLine.type=0;
            $scope.trunkLine.delivery = $scope.trunkLine.deliveryStart + '~'+$scope.trunkLine.deliveryEnd;
            $http.post(url+'/dryline/'+addOrUpdate,$scope.trunkLine).success(function(data){
                if(data.code==0){
                    yMake.layer.msg('新增干线服务成功！',{icon:1});
                    $scope.trunkLine = {};
                }else{
                    yMake.layer.msg('新增干线服务失败！',{icon:2})
                }

            }).error(function(){
                yMake.layer.msg('新增干线服务出错！',{icon:2})
            })
        };
        //获取浏览器的高度
        //yMake.fn.autoHeight('.bgWhite',45);
    }]);
});
