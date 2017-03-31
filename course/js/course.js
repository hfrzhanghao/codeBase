$(document).ready(function(){

	//读取cookie中的mode,决定用哪一种布局方式
	var mode = document.cookie.split('=')[1];
	if(!mode){
		mode = 0;
	}

	if(mode == 0){
		table();
	}else{
		list();
	}

	//滚动至顶部
	$(".up").click(function(){
		$(window).scrollTop(0);
	});

	window.onscroll = function () {
    	if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
        	$(".up")[0].style.display = "block";
    	}
    	else {
        	$(".up")[0].style.display = "none";
    	}
	}

	//职业学院淡入淡出
	$("#head_college").mouseenter(function(){
		$("#head_college_sel").fadeIn();
	}).mouseleave(function(){
		$("#head_college_sel").fadeOut();
	});

	//会员课程淡入淡出
	$("#head_vip").mouseenter(function(){
		$("#head_vip_sel").fadeIn();
	}).mouseleave(function(){
		$("#head_vip_sel").fadeOut();
	});

	//极客社区淡入淡出
	$("#head_geek").mouseenter(function(){
		$("#head_geek_sel").fadeIn();
	}).mouseleave(function(){
		$("#head_geek_sel").fadeOut();
	});
	
	//左边抽屉鼠标悬停后产生的效果
	$(".first-li").each(function(index){
		$(this).mouseover(function(){
			$(this).toggleClass("bigger");
			$(".left-disappear").eq(index).show();
		}).mouseout(function(){
			$(this).toggleClass("bigger");
			$(".left-disappear").eq(index).hide();
		});
	})

	//鼠标悬停于课程块上产生的效果：下拉
	$(".fixPosition").each(function(index){
		$(this).mouseenter(function(){
			$(".course_cover").eq(index).show();
			if(mode == 0){
				$(".course_des_div").eq(index).slideDown();
				$(".course_level_div").eq(index).slideDown();
			}
		}).mouseleave(function(){
			$(".course_cover").eq(index).hide();
			if(mode == 0){
				$(".course_des_div").eq(index).slideUp();
				$(".course_level_div").eq(index).slideUp();
			}
		})
	});

	//子导航栏
	$(".sub_nav_sub").each(function(index){
		$(this).mouseenter(function(){
			$(".sub_nav_draw").eq(index).slideDown();
			$(this).css({
				"box-shadow":"0 0 5px #ccc"
			});
		}).mouseleave(function(){
			$(".sub_nav_draw").eq(index).slideUp();
			$(this).css({
				"box-shadow":"0 0 0px #ccc"
			});
		})
	});

	//点击放大镜图标
	$("#open_search").click(function(){
		var searchDiv = $("#header_search");
		searchDiv.css({
			"display":"block"
		});
		searchDiv.animate({width:'831px'},"slow");
	});

	//点击取消搜索图标
	$("#close_search").click(function(){
		$("#header_search")[0].style.display = "none";
		$("#header_search")[0].style.width = 0;
	});

	//选择list模式
	$(".list").click(function(){
		mode = 1;
		list();
	});

	//选择table模式
	$(".table").click(function(){
		mode = 0;
		table();
	});
})

//list模式
function list(){
	
	$(".fixPosition").css({
		"width":"780px",
		"height":"109px",
		"background-color":"#fff"
	});
	$(".course").css({
		"margin-bottom": "10px",
		"width":"780px",
		"height":"109px",
		"background-color": "#fff"
	});
	$(".course .course_img").css({
		"width":"200px",
		"height":"109px",
		"float":"left"
	});
	$(".course .course_img img").css({
		"width":"200px",
		"float":"left"
	});
	$(".course_p p").css({
		"display":"block",
		"width":"580px",
		"margin-left":"200px",
		"font-size": "14px",
		"padding-left": "10px",
		"font-family": "Microsoft Yahei"
	});
	$(".course_main_title_div").css({
		"height":"34px",
		"line-height":"34px"
	});
	$(".course_des_div,.duration_div,.course_level_div").css({
		"height":"25px",
		"line-height":"25px",
		"font-size": "12px"
	});
	$(".course_des_div,.duration_div").css({
		"color": "#555"
	});
	var height = $("#single_course").height();
	$("#mainPanel").css({
		"height":height
	});
	//写入cookie
	document.cookie="mode=1";
}

//table模式
function table(){
	
	$(".fixPosition").css({
		"position": "relative",
		"margin-bottom": "10px",
		"float": "left",
		"width": "250px",
		"height": "210px"
	});
	$(".fixPosition").each(function(index){
		if((index + 1) % 3 != 0){
			$(".fixPosition").eq(index).css({
				"margin-right":"15px"
			});
		}
	});
	$(".course").css({
		"width":"250px",
		"height":"135px",
		"position": "absolute",
		"cursor": "pointer"
	});
	$(".course .course_img").css({
		"position": "relative",
		"width":"250px",
		"height":"135px",
		"display":"block",
		"float":"none"
	});
	$(".course .course_img img").css({
		"width": "250px",
		"margin-bottom": "-4px",
		"display":"block"
	});
	$(".course_p").css({
		"position":"relative",
		"z-index":"1000"
	})
	$(".course_p p").css({
		"width": "250px",
		"height": "30px",
		"background-color": "#fff",
		"position": "relative",
		"z-index": "100",
		"font-size": "14px",
		"color":" #000",
		"font-family": "Microsoft Yahei",
		"line-height": "30px",
		"padding-left": "10px",
		"box-sizing": "border-box",
		"margin-left":"0",
		"display":"block"
	});
	$(".course_main_title_div").css({
		"width": "250px",
		"height": "40px",
		"background-color": "#fff",
		"line-height": "40px",
		"padding-left": "10px",
		"box-sizing": "border-box"
	});
	$(".course_des_div").css({
		"font-size": "12px",
		"color": "#555"
	});
	$(".duration_div").css({
		"font-size": "12px",
		"color": "#555"
	});
	$(".course_level_div").css({
		"font-size": "14px",
		"color": "#000"
	});
	$(".course_des_div,.course_level_div").css({
		"display":"none"
	});
	var height = $("#single_course").height();
	$("#mainPanel").css({
		"height":height
	});
	//写入cookie
	document.cookie="mode=0";
}