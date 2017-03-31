$(document).ready(function(){
	$(window).on("load",function(){
		imgLocation();
	});

	var images = {"data":[{"src":"1.jpg"},{"src":"8.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"9.jpg"}]};
	/*滚动时执行*/
	window.onscroll = function(){
		if(scroll()){
			$.each(images.data,function(index,value){
				var box = $("<div>").addClass("box").appendTo("#container");
				var content = $("<div>").addClass("content").appendTo(box);
				$("<img>").attr("src","img/"+$(value).attr("src")).appendTo(content);
			});
			imgLocation();
		}
	}
})

/*滚动时判断是否需要加载图片*/
function scroll(){
	var box = $(".box");
	var lastHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
	var scrollHeight = $(window).scrollTop();
	var documentHeight = $(window).height();
	return((lastHeight < (scrollHeight + documentHeight)) ? true : false);
}

/*图片摆放位置*/
function imgLocation(){
	var screenWidth = $(window).width();
	var boxWidth = $(".box").eq(0).width();
	var boxNum = Math.floor(screenWidth/boxWidth);
	var box = $(".box");
	var heightArr = [];

	box.each(function(index,value){
		if(index < boxNum){
			heightArr[index] = box.eq(index).height();
		}else{
			var minHeight = Math.min.apply(null,heightArr);
			var minIndex = $.inArray(minHeight,heightArr);
			$(value).css({
				"position":"absolute",
				"top":minHeight,
				"left":box.eq(minIndex).position().left
			});
			heightArr[minIndex] += $(value).height();
		}
	})
}