//换肤模块，使用了单例模式，可以将所有相关的元素/事件都放在一个对象中，具有了封装性，内部的属性可以由外部传递进来。
var skinChange = {
    //从外部传递的宽和高
    "windowWidth": null,
    "windowHeight": null,

    init: function() {
        this.render(); //获取元素
        this.bind(); //绑定事件
    },
    render: function() {
        var that = this;
        that.skin = $('#skin');
        that.skin_select = $(".skin_select");
        that.slideUp = $(".slideUp");
        that.skin_class_panel_a = $(".skin_class_panel a");
        that.skin_select_img = $(".skin_select img");
    },
    bind: function() {
        var that = this;
        that.skin.click(function() { //点击换肤则出现换肤面板
            that.skin_select.slideDown();
        });
        that.skin_select.mouseleave(function() { //鼠标离开则消失
            $(this).slideUp();
        });
        that.slideUp.click(function() { //点击收起则消失
            that.skin_select.slideUp();
        });
        that.skin_class_panel_a.each(function(index) { //点击出现不同分类下的皮肤
            $(this).click(function() {
                $(".skin_class_panel a").removeClass("skin_class_sel");
                $(this).addClass("skin_class_sel");
            });
        });
        that.skin_select_img.each(function(index) { //点击图片，背景变化
            var thisSkin = $(".skin_select img").eq(index);
            thisSkin.click(function() {
                var skin = thisSkin.attr("src");
                document.cookie = "skin=" + skin;
                $("body").css({
                    "background": "url(" + skin + ") 0 0 no-repeat",
                    "background-position": "0 10px",
                    "background-size": that.windowWidth + "px " + that.windowHeight + "px"
                });
            });
            thisSkin.mouseover(function() { //预览
                var skin = thisSkin.attr("src");
                $(".skin_preview_bg").css({
                    "background": "url(" + skin + ") 0 0 no-repeat",
                    "background-size": "197px 124px"
                });
            });
        });
    }
}

//回到顶部模块，使用了单例模式，可以将所有相关的元素/事件都放在一个对象中，具有了封装性。
var toTop = {
    init: function() {
        this.render(); //获取元素
        this.bind(); //绑定事件
    },
    render: function() {
        var that = this;
        that.to_top = $("#to-top");
    },
    bind: function() {
        var that = this;
        that.to_top.mouseover(function() {
            $("#to-top-des").show();
        }).mouseout(function() {
            $("#to-top-des").hide();
        });
        that.to_top.click(function() {
            window.scrollTo(0, 0);
        });
        $(document).scroll(function() { //决定何时出现 回到顶部 按钮
            if ($(document).scrollTop() > 0) {
                that.to_top.show();
            } else {
                that.to_top.hide();
            }
        });
    }
}

//侧边栏模块，使用了单例模式，可以将所有相关的元素/事件都放在一个对象中，具有了封装性，内部的属性可以由外部传递进来。
var side = {
    "windowHeight": null,
    init: function() {
        this.render(); //获取元素
        this.bind(); //绑定事件
    },
    render: function() {
        var that = this;
        that.more_div = $("#more_div");
        that.sidebar = $("#sidebar");
        that._sidebar = $(".sidebar");
    },
    bind: function() {
        var that = this;
        that.more_div.mouseover(function() {
            that.sidebar.show();
        }).mouseout(function() {
            that.sidebar.hide();
        });
        that.sidebar.css({
            "height": that.windowHeight
        });
    }
}

$(document).ready(function() {
    //从cookie中读取皮肤
    var skin = document.cookie.split("=")[1];
    if (skin) {
        skin = skin.split(";")[0];
    }
    var windowWidth = $(document).width();
    var windowHeight = $(document).height();

    //向skinChange中传递document的宽和高
    skinChange.windowWidth = windowWidth;
    skinChange.windowHeight = windowHeight;
    side.windowHeight = windowHeight;

    if (skin) {
        $("body").css({
            "background": "url(" + skin + ") 0 0 no-repeat",
            "background-position": "0 10px",
            "background-size": windowWidth + "px " + windowHeight + "px"
        });
    }

    //点击换肤
    skinChange.init();
    //回到顶部
    toTop.init();
    //侧边栏
    side.init();

    $('#real-content').load('myFocus.html');
    $('#select-head li').each(function(index) {
        $(this).click(function() {
            /*点击切换，加载不同页面*/
            $('#select-head li.tabIn').removeClass('tabIn');
            $(this).addClass('tabIn');

            if (index == 0) {
                $('#real-content').load('myFocus.html');
            } else if (index == 1) {
                $('#real-content').load('tui.html');
            } else if (index == 2) {
                $('#real-content').load('nav.html');
            } else if (index == 3) {
                $('#real-content').load('video.html');
            }
        });
    });
    /*点击更换切换头样式*/
    $('#my-focus-html p').click(function() {
        $('#my-nav').toggleClass('my-nav');
    })

    /*侧边栏*/
    $(".more_div").mouseover(function() {
        $("#sidebar").show();
    }).mouseout(function() {
        $("#sidebar").hide();
    });

    /*侧边栏高度*/
    var windowHeight = $(document).height();
    $(".sidebar").css({
        "height": windowHeight
    });


    /*天气部分*/
    function findWeather() {
        var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
        $.getScript(cityUrl, function(script, textStatus, jqXHR) {
            var citytq = remote_ip_info.city; // 获取城市

            var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
            $.ajax({
                url: url,
                dataType: "script",
                scriptCharset: "gbk",
                success: function(data) {
                    var _w = window.SWther.w[citytq][0];
                    var _f = _w.f1 + "_0.png";
                    if (new Date().getHours() > 17) {
                        _f = _w.f2 + "_1.png";
                    }
                    var img = "<img width='16px' height='16px' src='http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/" + _f + "' />";
                    var tq = citytq + ": " + img + " " + _w.s1 + " " + _w.t1 + "℃～" + _w.t2 + "℃ ";
                    $('#weather').html(tq);
                }
            });
        });
    }
    findWeather();
})
