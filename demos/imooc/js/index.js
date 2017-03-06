/**
 * Created by ZhangBing on 2016/6/24 0024.
 */
$(function () {
    $('.family_list img').each(function (i) {
        this.src = 'images/index/family-' + (i + 1) + '.jpg';
    });

    // 鼠标移到实战上旋转new图标
    $(".top_nav li:eq(1)").mouseenter(function () {
        $(this).find("i").css({"transform":"rotate(360deg)","transition":"all .5s"});
    });
    $(".top_nav li:eq(1)").mouseleave(function () {
        $(this).find("i").css({"transform":"rotate(0deg)","transition":"all 0s"});
    });

    //显示隐藏搜索框
    $("#searchBtn").click(function () {
        $("#searchTxt").css("width",200);
        setTimeout(function(){
            $("#searchTxt").focus();
        },1000);
    });
    $("#searchTxt").focus(function () {
        $("#searchTipDiv").show();
    });
    searchTxtBlur();

    //鼠标移到p上取消搜索框的blur事件
    $("#searchTipDiv p").mouseenter(function(){
        $("#searchTxt").off("blur");
    });
    //选中关键字搜索
    $("#searchTipDiv p").click(function () {
        $("#searchTxt").val($(this).text());
        searchTxtBlur();
        var url = "http://www.imooc.com/index/search";
        var words = "?words="+$(this).text();
        window.open(url+words,"_self");
    });
    $("#searchTipDiv").mouseout(function(){
        searchTxtBlur();
    });

    //搜索跳转
    $("#searchTxt").keyup(function (e) {
        e = e || window.event;
        var searchKey = $("#searchTxt").val();
        if(searchKey !== ""){
            if(e.keyCode === 13){
                //http://www.imooc.com/index/search?words=JavaScript
                var url = "http://www.imooc.com/index/search";
                var words = "?words="+searchKey;
                window.open(url+words,"_self");
            }
        }
    });


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

    //轮播图
    lunboBanner();

    //鼠标进入手机图标显示二维码
    $(".li_phone").mouseenter(function () {
        $(".li_phone").css("backgroundColor", "#787D82");
        $("#ewm").css("display", "block");
    });
    $(".li_phone").mouseleave(function () {
        $("#ewm").css("display", "none");
        $(".li_phone").css("backgroundColor", "#000");
    });
    //鼠标移入二维码继续显示
    $("#ewm").mouseenter(function () {
        $(".li_phone").mouseenter();
    });
    $("#ewm").mouseleave(function () {
        $(".li_phone").mouseleave();
    });

    //扩展链接透明度变化
    $(".dynamic-group a").mouseenter(function(){
        $(this).animate({"opacity":"1"},300);
    });
    $(".dynamic-group a").mouseleave(function(){
        $(this).animate({"opacity":0.6},300);
    });

    // 慕课大家庭部分
    $('.family_box').mouseenter(function () {
        $(this).find('.family_bigMask,.family_word').fadeOut(200);
    }).mouseleave(function () {
        $(this).find('.family_bigMask,.family_word').fadeTo(200, 0.6);
    });
    //鼠标进入 li ，当前 li下的 div 淡出，其他div 不变
    $('.family_box a').children('div').mouseenter(function () {
        //$(this).children('div').stop().fadeTo('normal', 0.6);
        //$(this).stop().fadeOut();
        $(this).css("opacity",0);
        $(this).parent().parent().next().eq(0).children(".info").show();
    });
    $('.family_box a').children('div').mouseleave(function () {
        $(this).css("opacity",0.6);
        $(this).parent().parent().next().eq(0).children(".info").hide();
    });

    //显示隐藏手机慕课，随时随地学习
    $('.active').mouseenter(function () {
        $(this).children('span').addClass('spanActive');
        $('.mobile_show').stop().animate({'height': 0, 'opacity': 0}, 600);
        $('.mobile_hide').stop().animate({'height': 300, 'opacity': 1}, 600);
    }).mouseleave(function () {
        $(this).children('span').removeClass('spanActive');
        $('.mobile_show').stop().animate({'height': 307, 'opacity': 1}, 600);
        $('.mobile_hide').stop().animate({'height': 0, 'opacity': 0}, 600);
    });
    $('.star').mouseenter(function () {
        $(this).fadeTo('normal',.6);
    }).mouseleave(function () {
        $(this).fadeTo('normal',1);
    });

    // 鼠标移到课程显示课程进度
    showCourseInfo();

    //显示隐藏微信二维码
    $(".link_2").mouseenter (function () {
        $(".flw-weixin-box").css("display","block");
    });
    $(".link_2").mouseleave (function () {
        $(".flw-weixin-box").css("display","none");
    });

});

function searchTxtBlur(){
    $("#searchTxt").blur(function () {
        if($(this).val() == ""){
            $(this).css("width",0);
        }
        $("#searchTipDiv").hide();
    });
}

/**
 * 页面滚动的时候动画展示图片
 */
$(window).scroll(function(){
    var topDiv = $(".top").height(),        //顶部通栏的高度
        sliderDiv = $("#slider").height(),  //轮播图的高度
        box1 = $("#mainbox").children().eq(0).height();  //第一个主题部分介绍的高度
    //滚动的高度
    var scrollTop = $(this).scrollTop();

    //鼓动第一部分
    if(scrollTop > parseInt(box1/2)){
        $(".header_bm_wrap .header_bm_l").show().animate({"marginLeft":"-40%"},600);
        $(".header_bm_wrap .header_bm_r").show().animate({"marginLeft":"25%"},600);
    }
    var totalHeight = topDiv+sliderDiv;
    //滚动第二部分
    if(scrollTop > totalHeight){
        $("#mainbox").find(".intro1-star").animate({"top":-30},600);
    }
    //滚动第三部分
    totalHeight += parseInt(box1/1.5);
    if(scrollTop > totalHeight){
        $("#mainbox").find(".intro2-computer1").animate({"top":-30},600);
    }
    //滚动第四部分
    totalHeight += parseInt(box1);
    if(scrollTop > totalHeight){
        $("#mainbox").find(".intro3-calender").animate({"top":-30},600);
    }
    //滚动第五部分
    totalHeight += parseInt(box1);
    if(scrollTop > totalHeight){
        $("#mainbox").find(".intro4-hand").animate({"top":-30},600);
    }
});

function showCourseInfo(){
    //生成课程信息
    var arrCourse = [
        {
            "title":"基于Swift的语言教程第二季",
            "image":"images/index/body (10).jpg",
            "update":"更新至12-2",
            "timeLong":"课程时长10小时10分钟"
        },
        {
            "title":"基于Swift的语言教程第一季",
            "image":"images/index/body (9).jpg",
            "update":"更新至12-10",
            "timeLong":"课程时长10小时50分钟"
        },
        {
            "title":"CSS深入理解",
            "image":"images/index/body (11).jpg",
            "update":"更新至12-10",
            "timeLong":"课程时长10小时50分钟"
        },
        {
            "title":"微信平台",
            "image":"images/index/body (2).jpg",
            "update":"更新至12-10",
            "timeLong":"课程时长10小时50分钟"
        },
        {
            "title":"JAVA",
            "image":"images/index/body (4).jpg",
            "update":"更新至12-10",
            "timeLong":"课程时长10小时50分钟"
        },
        {
            "title":"jQuery基础修炼",
            "image":"images/index/body (6).jpg",
            "update":"更新至12-10",
            "timeLong":"课程时长10小时50分钟"
        },
        {
            "title":"Android",
            "image":"images/index/body (7).jpg",
            "update":"更新至12-10",
            "timeLong":"课程时长10小时50分钟"
        },
        {
            "title":"移动优先的跨终端web",
            "image":"images/index/body (8).jpg",
            "update":"更新至12-10",
            "timeLong":"课程时长10小时50分钟"
        }
    ];
    var oc = null,
        htmlStr = "";
    for(var i=0; i<arrCourse.length; i++){
        oc = arrCourse[i];
            //<li>
            //    <a href="#">
            //        <div class="icourse-img">
            //            <img src="images/body (8).jpg"/>
            //        </div>
            //        <div class="icourse-intro clearfix">
            //            <p>移动优先的跨终端web</p>
            //            <span class="l">更新至X-X</span>
            //            <span class="r">课程时长X小时X分钟</span>
            //        </div>
            //    </a>
            //</li>
        htmlStr = '<li>' +
                '<a href="#">'+
                '<div class="icourse-img">'+
                '<img src="'+oc.image+'"/>'+
                '</div>'+
                '<div class="icourse-intro clearfix">'+
                '<p>'+oc.title+'</p>'+
                '<span class="l">'+oc.update+'</span>'+
                '<span class="r">'+oc.timeLong+'</span>'+
                '</div>'+
                '</a>'+
            '</li>';
        $(".icourse-course").append(htmlStr);

    }

    //课程更新信息
    var arrUpdateCourse=[
        {
            "p":"我对Flexbox布局模式的理解",
            "span1":"先测试一下",
            "span2":"测试1"
        },{
            "p":"您没有权限查看该页面！！",
            "span1":"测试2",
            "span2":"测试2"
        },{
            "p":"技术支持：第五组",
            "span1":"测试3",
            "span2":"测试3"
        },{
            "p":"目前无法连接服务器，请检查您的网络连接或者查看",
            "span1":"测试4",
            "span2":"测试4"
        },{
            "p":"李笑来《新生——七年就是一辈子》",
            "span1":"测试5",
            "span2":"测试5"
        },{
            "p":"人生最重要的概念：复利",
            "span1":"测试6",
            "span2":"测试6"
        },{
            "p":"最根本的学习与创作：践行",
            "span1":"测试七",
            "span2":"测试七"
        },{
            "p":"主动选择 —— 重生的关键",
            "span1":"测试8",
            "span2":"测试8"
        }
    ];
    //鼠标进入课程介绍，改变下侧栏目内容
    $(".icourse-course li").mouseenter(function(){
        var i = $(this).index();
        $(this).children("a").children(".icourse-intro").empty();
        $(this).children("a").children(".icourse-intro").html("<p>"+arrUpdateCourse[i].p+"</p><span class='l'>"+arrUpdateCourse[i].span1+"</span><span class='r'>"+arrUpdateCourse[i].span2+"</span>");
    });
    $(".icourse-course li").mouseleave(function(){
        var i = $(this).index();
        $(this).children("a").children(".icourse-intro").html("<p>"+arrCourse[i].title+"</p><span class='l'>"+arrCourse[i].update+"</span><span class='r'>"+arrCourse[i].timeLong+"</span>");
    });
}

var timerId = null;
function lunboBanner(){
    //初始化宽度
    var innerWidth = $(".inner").width();
    $(".slider_body li").width(innerWidth);

    //轮播图
    var slider = $("#slider");
    var ul = slider.find(".slider_body");
    var ulLis = ul.find("li");
    var ol = slider.find("ol");

    //左右箭头
    var arr = $("#arr"),
        arrLeft = $("#left"),  //左箭头
        arrRight = $("#right");    //右箭头

    var imgWidth = ulLis.width(),
        timer = null,
        fl = true;

    var index = 0,              //点击箭头的时候记录索引  -- 图片的索引
        olIndex = 0,            //记录序号的索引
        count = ulLis.length;   //记录有多少张图片---真实图片的个数

    //生成三张图片
    var imgJson = {
        "slider1":"images/index/slider1.jpg",
        "slider2":"images/index/slider2.jpg",
        "slider3":"images/index/slider3.jpg",
        "slider4":"images/index/slider4.jpg"
    };
    //background:url("../images/slider2.jpg") no-repeat center
    var i = 0;
    for(var o in imgJson){
        $(ulLis[i]).css("background",'url('+imgJson[o]+') no-repeat center');
        i++;
    }

    //1. 生成序号，生成最后一张图片
    for (var i = 0; i < ulLis.length; i++) {
        var li = "";
        if(i == 0){
            li = "<li class='active'></li>";
        }else{
            li = "<li></li>";
        }
        ol.append(li);
    }

    //动态生成最后一张图片 克隆第一张
    var firstImg = ul.find("li:eq(0)").clone(true);
    //加到ul上
    ul.append(firstImg);

    //2. 为按钮注册事件
    var indexLis = ol.children(),
        $li = null;
        $that = null;
    for (var i = 0; i < indexLis.length; i++) {
        $li = $(indexLis[i]).attr("index",i);

        //点击序号切换图片
        $li.click(function(){
            $that = $(this);
            //鼠标移动到按钮上  当前亮起  其他不亮
            $that.addClass("active").siblings().removeClass("active");
            //鼠标经过按钮移动ul
            ul.animate({"left": -$that.index() * imgWidth});

            //点击序号的时候，让索引同步
            index = olIndex = $that.index();

        });
    }

    //3.鼠标经过box显示箭头
    slider.mouseenter(function(){
        arr.show();
        //鼠标经过停止自动滚动
        clearInterval(timerId);
    });
    slider.mouseleave(function(){
        arr.hide();
        //鼠标离开继续滚动
        autoPlay();
    });

    //4.点击右箭头,下一张
    //var domUl = document.getElementById("slider").children[0].children[0];
    arrRight.click(function(){
        //如果当前是最后一张图片(克隆的第一张图片), 让index = 0 并且偷偷设置ul切换到第一张图片
        if(index === count){
            index = 0;
            ul.css("left","0px");
        }
        index++;
        //animate(domUl,{"left":-index * imgWidth});
        $(".slider_body").animate({"left":-index * imgWidth},500);

        // 切换到下一个序号
        if(olIndex < count - 1) {
            olIndex++;
        }else{
            //如果是最后一项的话，让index= 0； 设置第一项
            olIndex = 0;
        }

        //让当前li高亮显示
        $(indexLis[olIndex]).addClass("active").siblings().removeClass("active");
    });

    //5.点击左箭头，上一张
    arrLeft.click(function(){
        //如果是第一张图片的话，让index=克隆的图片的索引，偷偷的切换到最后一张
        if(index === 0) {
            index = count;
            ul.css("left",-index * imgWidth + "px");
        }
        index--;
        //animate(domUl,{"left":-index * imgWidth});
        $(".slider_body").animate({"left":-index * imgWidth},500);

        //-----6.3 切换到上一个序号
        if(olIndex > 0) {
            olIndex--;
        }else{
            //如果是第一张，把序号切换成最后一张
            olIndex = count - 1;
        }

        //让当前li高亮显示
        $(indexLis[olIndex]).addClass("active").siblings().removeClass("active");
    });


    //7.自动切换
    autoPlay();

    function autoPlay(){
        timerId = setInterval(function () {
            arrRight.trigger("click");
        }, 2000);
    }

}

