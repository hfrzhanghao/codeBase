$(document).ready(function(){

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
})

