/**
 *  作者：cl
 *	时间：2016-08-10
 *	描述：通报发布
 */
define(function(require){
    var app = require('../../../../app');

    app.controller('reportReleasedCrl',['$scope',function($scope){

        var bgWhite = $('.bgWhite');
        bgWhite.css('height',$(document).height()-bgWhite.offset().top-20)
    }]);
});
