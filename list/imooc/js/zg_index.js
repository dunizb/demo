/**
 * Created by Zong on 06/22 0022.
 */
$(function () {
    //主图片部分开始
    var nav = document.getElementById("nav");
    $("#nav").show(2000)
    $(".page>.w>h2").animate({"opacity":"1","top":"230px"},1000, function () {
        $(".page>.w>p").animate({"opacity":"1","top":"296px"},800)
    })
    $(".page-1>.icon-1").fadeIn(1500, function () {
        $(".page-1 .icon-2").fadeIn(1000, function () {
            $(".page-1 .icon-3").fadeIn(1000)
        })
    })
    //主图片部分结束

    //导航部分开始
    window.onscroll = function () {
        if (window.pageYOffset >= nav.offsetHeight) {
            nav.style.backgroundColor = "white";
            $(".logo").css("color", "black");
            $(".r-item a:not(:last)").css("color", "gray");
            $(".r-item a:not(:last)").mouseenter(function () {
                $(this).css("color", "black");
            });
            $(".r-item a:not(:last)").mouseleave(function () {
                $(this).css("color", "gray");
            })
        } else {
            nav.style.backgroundColor = "";
            $(".logo,.r-item a").css("color", "white");
            $(".r-item a:not(:last)").mouseenter(function () {
                $(this).css("color", "white");
            });
            $(".r-item a:not(:last)").mouseleave(function () {
                $(this).css("color", "white");
            })
        }
    }
    //导航部分结束

    //page-2部分开始
    $("#page2").mouseenter(function () {
        $("#page2>.icon-1").fadeIn(1000, function () {
            $("#page2>.icon-2").css("display","block");
            $("#page2>.icon-2").animate({"top":"129px"},500);
        })
    })
    //page-2部分结束

    //page-3部分开始
    $("#page3").mouseenter(function () {
        $("#page3>.container>.icon-1").fadeIn(1500);
    })
    //page-3部分结束

    //page-4部分开始
    $("#page4").mouseenter(function () {
        $("#page4>.icon-1").animate({"left":"50%"},1000)
    })
    //page-4部分结束

    //page-5部分开始
    $("#page5").mouseenter(function () {
        //$("#page5>.container").fadeIn(1500);
        $("#page5>.container").animate({"top":"0px","opacity":1},2000)
    })
    //page-5部分结束

    //foot部分开始
    $("#foot>.waper>.footer-r>a").mouseenter(function () {
        $(this).css("opacity","1");
    });
    $("#foot>.waper>.footer-r>a").mouseleave(function () {
        $(this).css("opacity","0.5");
    });
    $("#foot>.waper>.footer-r>.footer-r-weixin").mouseenter(function () {
        $("#foot>.waper>.footer-r").find("div").css("display","block");
    });
    $("#foot>.waper>.footer-r>.footer-r-weixin").mouseleave(function () {
        $("#foot>.waper>.footer-r").find("div").css("display","none");
    });
    //foot部分结束

    // 返回顶部小火箭
    $(window).scroll(function() {
        if($(window).scrollTop() >= 100){ //向下滚动像素大于这个值时，即出现小火箭~
            $('.actGotop').fadeIn(300); //火箭淡入的时间，越小出现的越快~
        }else{
            $('.actGotop').fadeOut(300); //火箭淡出的时间，越小消失的越快~
        }
    });
    //火箭动画停留时间，越小消失的越快~
    $('.actGotop').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
})
