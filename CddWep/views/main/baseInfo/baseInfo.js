/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：基础信息
 */
define(function(require){
	var app = require('../../../app');

	app.controller('baseInfoCrl',['$scope','$rootScope','url','$http','$location',function($scope,$rootScope,url,$http,$location){

        //获取用户信息
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //获取对应角色
        var role = userInfo.data.type;               //(1:品牌，2：物流，3：后台)
        $scope.services = false;                        //服务项目(物流)
        $scope.demand = false;                          //仓配需求(品牌)

        if(role==1){
            $scope.demand = true;
        }else if(role==2){
            $scope.services = true;
        }

		$scope.title = '基础信息';
		//基础信息
        $scope.show1 = true;
        $scope.show2 = false;
        $scope.show3 = false;

        $scope.storage = function(){
            $scope.show1 = true;
            $scope.show2 = false;
            $scope.show3 = false;
        };
        $scope.city = function(){
            $scope.show1 = false;
            $scope.show2 = true;
            $scope.show3 = false;
        };
        $scope.trunk = function(){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = true;
        };
        (function load(){
            if(userInfo!=null){
                var id = userInfo.data.id;
                $http.post(url+'/user/selectById?id='+id).success(function(data){
                    $scope.bases = data.data;
                });
            }

        })();

		//$scope.bases = {
		//	companyName:'',
		//	intro:'',
		//	aptitude:'',
		//	legalPerson:'',
		//	contact:'',
		//	email:'',
		//	address:''
		//};
        $scope.register = function(){
            //注册成功之后登陆
            var info = {};
            info.companyName = app.get('checkValue').isNull($scope.bases.companyName);
            info.intro = app.get('checkValue').isNull($scope.bases.intro);
            info.phone = app.get('checkValue').isTel($scope.bases.phone);
            info.email = app.get('checkValue').isEmail($scope.bases.email);
            info.address = app.get('checkValue').isNull($scope.bases.address);
            if(!info.companyName.state){
                yMake.layer.msg(info.companyName.info+'公司名称',{icon:'#F00',time:2000});
                return;
            }else if(!info.intro.state){
                yMake.layer.msg(info.intro.info,{icon:'#F00',time:2000});
                return;
            }else if(!info.phone.state){
                yMake.layer.msg(info.phone.info+'公司简介',{icon:'#F00',time:2000});
                return;
            }else if(!info.email.state){
                yMake.layer.msg(info.email.info+'公司法人',{icon:'#F00',time:2000});
                return;
            }else if(!info.address.state){
                yMake.layer.msg(info.address.info+'公司名称',{icon:'#F00',time:2000});
                return;
            }
        };
        /*$scope.add = function(){
            $location.path();
        };*/
        var photoUrl = [];
		$scope.uploadPhoto = function(index){
			$('#example').modal({backdrop:'static'});
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
                    /*console.info("此文件上传成功：");
                    console.info(file.name);
                    console.info("此文件上传到服务器地址：");
                    console.info(response);
                    $("#uploadInf").append("<p>上传成功，文件地址是：" + response + "</p>");*/

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
        //获取浏览器的高度
        yMake.fn.autoHeight('.bgWhite',45);
	}]);
});