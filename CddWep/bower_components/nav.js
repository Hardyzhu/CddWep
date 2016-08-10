/**
 *  作者：yeshengqiang
 *	时间：2016-08-08
 *	描述：导航页面(分不同的权限进入不同的页面)
 */
$(function(){
    var h3 = $(".sidebar_box").find("h3");
    console.log(h3);
    var tree_one = $(".sidebar_box").find(".sidebar_one");
    var h4 = $(".sidebar_one").find("h4");
    var tree_two = $(".sidebar_one").find(".sidebar_two");
    h3.each(function(i){
        $(this).click(function(){
            tree_one.eq(i).slideToggle();
            tree_one.eq(i).parent().siblings().find(".sidebar_one").slideUp();
        })
    })
    h4.each(function(i){
        $(this).click(function(){
            tree_two.eq(i).slideToggle();
            tree_two.eq(i).parent().siblings().find(".sidebar_two").slideUp();
        })
    })
})
$(function(){
    var wHeight = $(window).height();
    $(".sidebar").height(wHeight-55);
});