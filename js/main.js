$(function(){
     $("#weixinLink,#myemail,#dashang").popover({
        delay: { "show": 500, "hide": 100 },
        placement:'top',
        html:true
    }).on("mouseenter",function(){
        var _this = this;
        $(this).popover("show")
               .siblings(".popover")
               .on("mouseleave", function () {
                   $(_this).popover('hide');
               });
    }).on("mouseleave", function(){
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
    });

    setInterval(function(){
        $("#bookStore").css({"color":"#FFFF66"});
        setTimeout(function(){
            $("#bookStore").css({"color":"red"});
        },500);
    },1000);
    
});