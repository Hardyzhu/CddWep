/**
 *  作者：maxu
 *	时间：2016-08-09
 *	描述：我的星级
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('myStarCrl',['$scope',function($scope){
        $scope.title = '我的星级';
        yMake.fn.autoHeight('.bgWhite',45);
        
        $scope.searchPaginator = [
          			{a:'30',b:'25',c:'20',d:'10',e:'83',f:'三级',g:'456'},
          			{a:'30',b:'25',c:'20',d:'10',e:'67',f:'二级',g:'322'},
          			{a:'30',b:'25',c:'20',d:'10',e:'56',f:'二级',g:'234'},
          			{a:'30',b:'25',c:'20',d:'10',e:'78',f:'一级',g:'123'}
          		];
        
        
    }]);
});

