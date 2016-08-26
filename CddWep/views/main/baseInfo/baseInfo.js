/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：基础信息
 */
define(function(require){
	var app = require('../../../app');

    /*app.directive('layerShow',function(){
        return {
            restrict:'E',
            template:'<div id="img4" ng-click="uploadPhoto()" class="uploadImg">上传资质文件</div>'+
                        '<div class="zoomIn">'+
                            '<div>'+
                                '<span class="glyphicon glyphicon-edit"></span>'+
                                    '<span class="glyphicon glyphicon-zoom-in" ng-click="zoomIn()"></span>'+
                            '</div>'+
                        '</div>',
            replace:true,
            compile:function(Ele,iAttr){

                return  {
                    postlink:function(){

                    }
                }
            }

        }
    });*/

	app.controller('baseInfoCrl',['$scope','$rootScope','url','$http','$location',function($scope,$rootScope,url,$http,$location){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo')),
            serviceProject = JSON.parse(sessionStorage.getItem('serviceProject')),
            tabList = $('#tabList');
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)

        if(role==1){
            $scope.demand = true;
            loadkhrequest();
        }else if(role==2){
            $scope.services = true;
            $scope.changeView = function() {
                if (serviceProject != null) {
                    tabList.find('a[href="#project"]').tab('show');
                    switch (serviceProject.type) {
                        case 0:
                            $scope.storage();
                            break;
                        case 1:
                            $scope.city();
                            break;
                        case 2:
                            $scope.trunk();
                            break;
                        default :
                            return;
                    }
                }
            };
        }

		$scope.title = '基础信息';
		//基础信息
        $scope.show1 = true;
        $scope.show2 = false;
        $scope.show3 = false;

        $scope.serviceType = 'storage';
        $scope.addType = 0;
        //切换仓储服务
        $scope.storage = function($event){
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
            loadStorage();
            $scope.serviceType = 'storage';
            $scope.addType = 0;
            if($event!=null)$scope.sibling($($event.target),'btn-primary');
        };
        //切换城配服务
        $scope.city = function($event){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
            loadCityDelivery();
            $scope.serviceType = 'dryline';
            $scope.addType = 1;
            if($event!=null)$scope.sibling($($event.target),'btn-primary');
        };
        //切换干线服务
        $scope.trunk = function($event){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
            loadTrunkLine();
            $scope.serviceType = 'dryline';
            $scope.addType = 2;
            if($event!=null)$scope.sibling($($event.target),'btn-primary');
        };
        //切换样式
        $scope.sibling = function(selector,addClass){
            selector.addClass(addClass).siblings().removeClass(addClass);
        };
        //
        $scope.serviceExport = function(serviceType){
            window.open(url+'/'+serviceType+'/export','_top');
        };

        if(userInfo!=null){
            var id = userInfo.data.id;
            $http.post(url+'/user/selectById?id='+id).success(function(data){
                $scope.bases = data.data;
                var img1=$('#img1'),img2=$('#img2'),img3=$('#img3'),img4=$('#img4');
                if(data.data!=null&&data.data.certificate!=null){
                    urls = data.data.certificate.split(',');
                    img1.empty().append('<img src="'+url+'/'+urls[0]+'" width="100%" height="100%"/>');
                    img2.empty().append('<img src="'+url+'/'+urls[1]+'" width="100%" height="100%"/>');
                    img3.empty().append('<img src="'+url+'/'+urls[2]+'" width="100%" height="100%"/>');
                    img4.empty().append('<img src="'+url+'/'+urls[3]+'" width="100%" height="100%"/>');
                    urls = data.data.corporationim.split(',');
                    $('#head1').empty().append('<img src="'+url+'/'+urls[0]+'" width="100%" height="100%"/>');
                    $('#jead1').empty().append('<img src="'+url+'/'+urls[1]+'" width="100%" height="100%"/>');
                }
            });
        }
        //保存
		$scope.save = function(){
            var info = {};
            info.email = app.get('checkValue').isNull($scope.bases.email);
            info.email1 = app.get('checkValue').isEmail($scope.bases.email);
            info.name = app.get('checkValue').isNull($scope.bases.name);
            info.address = app.get('checkValue').isNull($scope.bases.address);
            info.corporation = app.get('checkValue').isNull($scope.bases.corporation);
            info.phone = app.get('checkValue').isNull($scope.bases.phone);
            info.phone1 = app.get('checkValue').isTel($scope.bases.phone);
            info.intro = app.get('checkValue').isNull($scope.bases.intro);//公司简介

            if(!info.name.state){
                yMake.layer.msg(info.name.info+'公司名称',{icon:'2',time:2000});
                return;
            }else if(!info.intro.state){//公司简介
                yMake.layer.msg(info.repeatPwd.info+'公司简介',{icon:'2',time:2000});
                return;
            }else if(!info.corporation.state){
                yMake.layer.msg(info.corporation.info+'公司法人',{icon:'2',time:2000});
                return;
            }else if(!info.phone.state){
                yMake.layer.msg(info.phone.info+'联系方式',{icon:'2',time:2000});
                return;
            }else if(!info.phone1.state){
                yMake.layer.msg(info.phone1.info,{icon:'2',time:2000});
                return;
            }else if(!info.email.state){
                yMake.layer.msg(info.email.info+'邮箱',{icon:'2',time:2000});
                return;
            }else if(!info.email1.state){
                yMake.layer.msg(info.email1.info,{icon:'2',time:2000});
                return;
            }else if(!info.address.state){
                yMake.layer.msg(info.address.info+'公司地址',{icon:'2',time:2000});
                return;
            }/*else if(urls.length<3){
                yMake.layer.msg('请上传完整的资质文件',{icon:'#F00',time:2000});
                return;
            }*/
            urls =[];
            var img1 = getImgSrc('#img1'),img2 = getImgSrc('#img2'),img3 = getImgSrc('#img3'),img4 = getImgSrc('#img4');
            if (img1!=null) urls.push(img1);
            if (img2!=null) urls.push(img2);
            if (img3!=null) urls.push(img3);
            if (img4!=null) urls.push(img4);
            $scope.bases.certificate = urls.join(',');
            var urls1 = [],head1 = getImgSrc('#head1'),head2 = getImgSrc('#head2');
            if (head1!=null) urls1.push(head1);
            if (head2!=null) urls1.push(head2);
            $scope.bases.corporationim = urls1.join(',');
            $http.post(url+'/user/update',$scope.bases).success(function(data){
                if(data.code==0){
                    yMake.layer.msg('保存成功!',{icon:1});
                }else if(data.code!=0){
                    yMake.layer.msg(data.message||'',{icon:'2',time:2000});
                }
            })
        };

        /*$scope.register = function(){
            var info = {};
            info.email = app.get('checkValue').isNull($scope.userinfo.email);
            info.email1 = app.get('checkValue').isEmail($scope.userinfo.email);
            info.name = app.get('checkValue').isNull($scope.userinfo.name);
            info.address = app.get('checkValue').isNull($scope.userinfo.address);
            info.corporation = app.get('checkValue').isNull($scope.userinfo.corporation);
            info.phone = app.get('checkValue').isNull($scope.userinfo.phone);
            info.phone1 = app.get('checkValue').isTel($scope.userinfo.phone);
            info.intro = app.get('checkValue').isNull($scope.userinfo.intro);//公司简介
            if(!info.companyName.state){
                yMake.layer.msg(info.companyName.info+'公司名称',{icon:'#F00',time:2000});
                return;
            }else if(!info.intro.state){
                yMake.layer.msg(info.intro.info,{icon:'2',time:2000});
                return;
            }else if(!info.phone.state){
                yMake.layer.msg(info.phone.info+'公司简介',{icon:'2',time:2000});
                return;
            }else if(!info.email.state){
                yMake.layer.msg(info.email.info+'公司法人',{icon:'2',time:2000});
                return;
            }else if(!info.address.state){
                yMake.layer.msg(info.address.info+'公司名称',{icon:'2',time:2000});
                return;
            }
        };*/
        /*$scope.add = function(){
            $location.path();
        };*/
        var urls = [];//资质文件路径;
		$scope.uploadPhoto = function(index){
            var img = $('#'+index);
			$('#uploadPhoto').modal({backdrop:'static'});
			$('#upload').empty().append('<div id="zyUpload"></div>');
            $("#zyUpload").zyUpload({
                width            :   "100%",                 // 宽度
                height           :   "100%",                 // 宽度
                itemWidth        :   "140px",                 // 文件项的宽度
                itemHeight       :   "115px",                 // 文件项的高度
                url              :   url+"/file/upload?type=1",  // 上传文件的路径
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
                onSuccess: function(file, response){          // 文件上传成功的回调方法
                    // 文件上传成功的回调方法
                    var fileName = JSON.parse(response).data, photoUrl=url+'/'+fileName,src = img.children().attr('src');
                    img.empty().append("<img src="+photoUrl+" width='100%' height='100%'/>");
                    /*if(urls.length>0&&urls.indexOf(fileName)!=-1){

                    }else if(src!=null){
                        urls.splice(urls.indexOf(src.substring(src.lastIndexOf('upload'))),1,fileName)
                    }else{
                        urls.push(fileName)
                    }*/
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

        //获取图片路径
        function getImgSrc (selector){
            var src = $(selector).find('img').attr('src'),
                projectName = url.substr(url.lastIndexOf('/'));
            if(src==''||src==null){
                return ;
            }
            src = src.substr(src.indexOf(projectName)+projectName.length+1);
            return src ;
        }

        //服务项目新增
        $scope.serviceAdd = function(type){
            sessionStorage.removeItem('serviceProject');
            sessionStorage.setItem('serviceProject',JSON.stringify({type:type}));
            $location.path('main/baseInfo/baseInfoNew');
        };
        //仓储服务
        function loadStorage (){
            var fetchFunction = function(page,callback){
                $http.post(url+'/storage/showPageList', $.extend({},page,{})).success(callback)
            };
            $scope.storageData = app.get('Paginator').list(fetchFunction,6);
            $scope.searchPaginator = $scope.storageData
        }
        //默认加载仓储服务
        loadStorage();
        //干线服务
        function loadTrunkLine (){
            var fetchFunction = function(page,callback){
                $http.post(url+'/dryline/showPageList', $.extend({},page,{type:0})).success(callback)
            };
            $scope.trunkLine = app.get('Paginator').list(fetchFunction,6);
            $scope.searchPaginator = $scope.trunkLine
        }
        //城配服务
        function loadCityDelivery (){
            var fetchFunction = function(page,callback){
                $http.post(url+'/dryline/showPageList', $.extend({},page,{type:1})).success(callback)
            };
            $scope.cityDelivery = app.get('Paginator').list(fetchFunction,6);
            $scope.searchPaginator =$scope.cityDelivery
        }
        //仓配需求
        function loadkhrequest (){
            //初始化
            $scope.khrequests = {};

            var fetchFunction = function(page,callback){
                $http.post(url+'/khrequest/showPageList', $.extend({},page,{loginname:userInfo.data.loginname})).success(callback)
            };
            $scope.khrData = app.get('Paginator').list(fetchFunction,6);
            console.log($scope.khrData);

            //仓配需求
            $scope.addOrChange = function(){
                console.log($scope.khrequest);
                $('#demandNew').modal('hide');
                $http.post(url+'/khrequest/add?loginname='+userInfo.data.loginname,$scope.khrequest).success(function(data){
                    console.log(data);
                    $scope.khrData._load();
                    yMake.layer.msg('上传成功！',{icon:1});
                    $scope.khrequests={};
                }).error(function(){
                    yMake.layer.msg('上传出错！',{icon:2})
                })
            };
        }
        //导出
        $scope.downloadFile=function(){
            layer.confirm("是否导出文件？",
                {btn : ['是','否']},function(){
                    window.location.href=url +"/khrequest/export?loginname="+userInfo.data.loginname;
                    yMake.layer.msg("导出总结文件成功 ",{icon:1,time:1000});
                    layer.msg("",{time:1});
                })
        };
        //服务项目编辑
        $scope.change = function(item,type){
            sessionStorage.setItem('serviceProject',JSON.stringify({item:item,type:type}));
            $location.path('main/baseInfo/baseInfoNew');
        };
        //服务项目删除
        $scope.deleteItem = function(item,type){
            layer.alert('确定要删除吗？',{btn:['是','否']},function(){
                var urlType = 'storage';
                type==0?urlType = 'storage':urlType='dryline';
                $http.get(url+'/'+urlType+'/delete?id='+item.id+'&type='+arguments[2]||'').success(function(data){
                    yMake.layer.msg('删除成功',{icon:1});
                    layer.msg('',{time:1});
                    type==0?loadStorage():(function(){
                        loadTrunkLine();
                        loadCityDelivery();
                    })();

                })
            });
        };
        //获取所有的省
        $http.get(url+'/location/loadProvince').success(function(data){
            $scope.provinces = data.data;
            console.log($scope.provinces);
        });
        //根据省id获取城市
        $scope.getCity = function(province){
            $http.get(url+'/location/loadCity?id='+province).success(function(data){
                $scope.cities = data.data;
            })
        };

        //新增仓配需求
        $scope.addKHRequest = function (){
            $scope.modalTitle = '新增仓配需求';
            $('#demandNew').modal({backdrop:'static',keyboard:false});
        };
        //编辑仓配需求
        $scope.khrequestChange = function (item){
            $('#demandNew').modal({backdrop:'static',keyboard:false});
            $scope.modalTitle = '修改仓配需求';
            $scope.khrequest = item;//缓存
        };
        //保存或者修改仓配需求
        $scope.addOrChange = function(){
            if($scope.modalTitle=='新增仓配需求'){
                $scope.khrequest.loginname = userInfo.data.loginname;
                $http.post(url+'/khrequest/add',$scope.khrequest).success(function(data){
                    if(data.code==0){
                        yMake.layer.msg('保存成功!',{icon:1});
                        $scope.khrequest={};
                        $('#demandNew').modal('hide');
                        loadkhrequest();
                    }else if(data.code!=0){
                        yMake.layer.msg(data.messsage,{icon:'2',time:2000});
                        $scope.khrequest={};
                    }
                }).error(function(){
                    yMake.layer.msg('保存出错!',{icon:2})
                })
            }else {
                $http.post(url+'/khrequest/update',$scope.khrequest).success(function(data){
                    if(data.code==0){
                        yMake.layer.msg('保存成功!',{icon:1});
                        $('#demandNew').modal('hide');
                        loadkhrequest();
                    }else if(data.code!=0){
                        yMake.layer.msg(data.message,{icon:'2',time:2000});
                    }
                }).error(function(){
                    yMake.layer.msg('保存出错!',{icon:2});
                })
            }
        };
        //取消
        $scope.close = function(){
            //清空数据
            $scope.khrequest={};
        };
        //删除仓配需求
        $scope.khrequestDelete = function (item){
            layer.alert('确定要删除吗？',{btn:['是','否']},function(){
                $http.get(url+'/khrequest/delete?id='+item.id).success(function(data){
                    if(data.code==0){
                        yMake.layer.msg('删除成功!',{icon:1});
                        loadkhrequest();
                    }else if(data.code!=0){
                        yMake.layer.msg(data.messsage,{icon:'2',time:2000});
                    }
                    layer.msg('',{time:1});
                }).error(function(){
                    layer.msg('',{time:1});
                    yMake.layer.msg('删除失败!',{icon:2})
                })
            });

        };
        //放大图片
        $scope.zoomIn = function(id){
            var src = $('#'+id).find('img').attr('src');
            arguments[1]==null?src=src:src=url+arguments[1];
            if(src==null||src==''){
                yMake.layer.msg('暂无图片',{icon:0});
                return;
            }
            var scrollTop = $(document).scrollTop();
            var img = '<img id="zoomIn" src="'+src+'" class="zoomInImg photoZoom" width="60%" height="60%" style="top:'+(scrollTop+75)+'px">',
                imgBack='<div class="zoomInImgBack photoZoom"></div>',
                close = '<span class="glyphicon glyphicon-remove uploadImgClose photoZoom" onclick="$(\'body\').css(\'overflow\',\'auto\').find(\'.photoZoom\' ).remove();" style="top:'+(scrollTop+75)+'px"></span>';
            $('body').append([img,imgBack,close]).css('overflow','hidden');
        };
        //获取浏览器的高度
        //yMake.fn.autoHeight('.bgWhite',45);
	}]);
});