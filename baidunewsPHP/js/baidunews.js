$(document).ready(function() {

	// 对列表的宽度处理
    var deviceWidth = $("body").width();
    $("nav li").each(function(index, item) {
        if ($(this).find("a").html().split("").length > 2) {
            $(this).width(deviceWidth / 3)
        } else {
            $(this).width(deviceWidth / 6)
        }
        // 获取type，查找新闻
        $(this).click(function(e){
        	e.preventDefault();
        	var type = $(this).find("a").html();
    		findNews(type);
        });
    });
    findNews("精选");
})

//根据type查找新闻
function findNews(type) {
    var newsLists = $("article ul");
    newsLists.empty();

    $.ajax({
        url: 'server/getNews.php',
        type: 'get',
        datatype: 'json',
        data: {newstype: type},
        success: function(data) {
            data.forEach(function(item, index, array) {
                var list = $('<li></li>').addClass('new').prependTo(newsLists);
                var newImg = $('<div></div>').addClass('newImg').appendTo(list);
                var img = $('<img>').attr('src', item.newsimg).appendTo(newImg);
                var content = $('<div></div>').addClass('newContent').appendTo(list);
                var h1 = $('<h1></h1>').html(item.newstitle).appendTo(content);
                var p = $('<p></p>').appendTo(content);
                var time = $('<span></span>').addClass('newTime').html(item.newstime).appendTo(p);
                var src = $('<span></span>').addClass('newSrc').html(item.newssrc).appendTo(p);

            });
        }
    });

}
