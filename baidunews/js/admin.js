$(document).ready(function() {

    var newsTable = $('#newsTable tbody');

    $('.time-picker').datetimepicker({
        format: "yyyy-mm-dd hh:ii:ss",
        language : 'zh-CN',
        minuteStep : 2
    });

    refreshNews();



    $('#btnSubmit').click(function(e) {
        e.preventDefault();

        //输入判断
        if ($('#newstitle').val() === '' ||
            $('#newstype').val() === '' ||
            $('#newsimg').val() === '' ||
            $('#newstime').val() === '' ||
            $('#newssrc').val() === '') {

            if ($('#newstitle').val() === '') {
                $('#newstitle').parent().addClass('has-error');
            } else {
                $('#newstitle').parent().removeClass('has-error');
            }

            if ($('#newstype').val() === '') {
                $('#newstype').parent().addClass('has-error');
            } else {
                $('#newstype').parent().removeClass('has-error');
            }

            if ($('#newsimg').val() === '') {
                $('#newsimg').parent().addClass('has-error');
            } else {
                $('#newsimg').parent().removeClass('has-error');
            }

            if ($('#newstime').val() === '') {
                $('#newstime').parent().addClass('has-error');
            } else {
                $('#newstime').parent().removeClass('has-error');
            }

            if ($('#newssrc').val() === '') {
                $('#newssrc').parent().addClass('has-error');
            } else {
                $('#newssrc').parent().removeClass('has-error');
            }

        } else {
            var jsonNews = {
                newstitle: $('#newstitle').val(),
                newstype: $('#newstype').val(),
                newsimg: $('#newsimg').val(),
                newstime: $('#newstime').val(),
                newssrc: $('#newssrc').val()
            }
            $.ajax({
                url: 'server/insert.php',
                type: 'post',
                data: jsonNews,
                datatype: 'json',
                success: function(data) {
                    refreshNews();
                }
            })
        }
    });

    // 删除新闻
    var deleteId = null;
    newsTable.on('click', '.btn-danger', function(e) {
        $('#deleteModal').modal('show');
        deleteId = $(this).parent().prevAll().eq(4).html();
    });
    $('#deleteModal #confirmDelete').click(function(e) {
        if (deleteId) {
            $.ajax({
                url: 'server/delete.php',
                type: 'post',
                datatype: 'json',
                data: { newsid: deleteId },
                success: function(data) {
                    $('#deleteModal').modal('hide');
                    refreshNews();
                }
            });
        }
    });

    // 更新新闻
    var updateId = null;
    // 先展示原数据
    newsTable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(4).html();
        $.ajax({
            url: 'server/currInfo.php',
            type: 'get',
            datatype: 'json',
            data: { newsid: updateId },
            success: function(data) {
                $('#unewstitle').val(data[0].newstitle);
                $('#unewstype').val(data[0].newstype);
                $('#unewsimg').val(data[0].newsimg);
                $('#unewssrc').val(data[0].newssrc);
                $('#unewstime').val(data[0].newstime/*.split(" ")[0]*/);
            }
        });
    });
    //提交更新
    $('#updateModal #confirmUpdate').click(function(e) {
        if (updateId) {
            var jsonNews = {
                updateId: updateId,
                unewstitle: $('#unewstitle').val(),
                unewstype: $('#unewstype').val(),
                unewsimg: $('#unewsimg').val(),
                unewstime: $('#unewstime').val(),
                unewssrc: $('#unewssrc').val()
            }
            $.ajax({
                url: 'server/update.php',
                type: 'post',
                data: jsonNews,
                datatype: 'json',
                success: function(data) {
                    $('#updateModal').modal('hide');
                    refreshNews();
                }
            });
        }
    });

    //刷新页面
    function refreshNews() {
        newsTable.empty();
        var ty = "jingxuan";
        $.ajax({
            type: 'get',
            url: 'server/getNews.php',
            datatype: 'json',
            data: { newstype: null },
            success: function(data) {
                data.forEach(function(item, index) {
                    var tdid = $('<td>').html(item.id);
                    var tdtype = $('<td>').html(item.newstype);
                    var tdtitle = $('<td>').html(item.newstitle);
                    var tdimg = $('<td>').html(item.newsimg);
                    var tdtime = $('<td>').html(item.newstime);
                    var tdsrc = $('<td>').html(item.newssrc);
                    var tdctrl = $('<td>');
                    var btnupdate = $('<button>').addClass('btn btn-primary btn-xs').html("编辑");
                    var btndelete = $('<button>').addClass('btn btn-danger btn-xs').html("删除");
                    tdctrl.append(btnupdate, btndelete);
                    var tRow = $('<tr>');
                    tRow.append(tdid, tdtype, tdtitle, /*tdimg,*/ tdsrc, tdtime, tdctrl);

                    newsTable.append(tRow);
                });
            }
        });
    }
});
