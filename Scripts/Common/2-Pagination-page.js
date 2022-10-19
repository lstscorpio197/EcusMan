function PHAN_TRANG_CLICK($thisPage, f_CallBack_Load_Data) {
    $thisPage.find('div.PHAN_TRANG ul li span').off('click').on('click', function () {
        if (!$(this).hasClass('more')) {
            $('html,body').scrollTop(0);
            if (!$(this).parent().hasClass('active')) {
                if ($(this).find('.fa-angle-double-right').length > 0) {
                    f_CallBack_Load_Data(parseInt($thisPage.find('div.PHAN_TRANG ul li.active span').text()) + 1);

                } else if ($(this).find('.fa-angle-double-left').length > 0) {
                    f_CallBack_Load_Data(parseInt($thisPage.find('div.PHAN_TRANG ul li.active span').text()) - 1);
                } else if ($(this).hasClass('first-page')) {
                    f_CallBack_Load_Data(1);
                } else if ($(this).hasClass('last-page')) {
                    f_CallBack_Load_Data($(this).attr('id').replace('id_', ''));
                } else {
                    var thisPage = $(this).text();
                    f_CallBack_Load_Data(thisPage);
                }
            }
        }
    });
}
function f_All_CUSTOM_PAGE_NUMBER($thisPage, f_CallBack_Load_Data, COUNT, lengthCURR, pageCurr, NumberOnePage) {
    pageCurr = parseInt(pageCurr);
    var checkNumberPage = COUNT % NumberOnePage;
    var numberPage = Math.floor(COUNT / NumberOnePage);
    if (checkNumberPage > 0)
        numberPage = numberPage + 1;
    $thisPage.find('.indexPage').html('- Trang <span class="color-blue">' + pageCurr + '/ ' + numberPage + '</span>');
    //Nếu hơn 10 trang thì chỉ lấy đến trang thứ 10, sau đấy mỗi sự kiện click thì tính tiếp
    $thisPage.find('input[name=TOTAL_PAGE]').val(numberPage);
    if (numberPage > 10) {
        $thisPage.find('input[name=TOTAL_PAGE]').val(numberPage);
        numberPage = 10;
    }
    $thisPage.find('.countItem').text(lengthCURR + '/' + COUNT);
    var maxPage = parseInt($thisPage.find('input[name=TOTAL_PAGE]').val());
    if (maxPage > 10 && pageCurr > 5) {
        var htmlPage = ' <ul class="pagination">';
        htmlPage += '<li class="cursor"><span class="first-page">Trang đầu</span></li><li class="cursor"><span><i class="fa fa-angle-double-left"></i></span></li>';
        for (var i = pageCurr - 5; i < pageCurr + 5; i++) {
            if (i <= maxPage) {
                if (pageCurr == i)
                    htmlPage += '<li class="active"><span>' + i + '</span></li>';
                else
                    htmlPage += '<li class="cursor"><span>' + i + '</span></li>';
            }
        }
        if (pageCurr < maxPage) {
            htmlPage += '<li class="cursor"><span class="more">...</span></li>';
            htmlPage += '<li class="cursor"><span><i class="fa fa-angle-double-right"></i></span></li>';
            htmlPage += '<li class="cursor"><span class="last-page" id="id_' + maxPage + '">Trang cuối</span></li>';
        }
        htmlPage += '</ul>';
        console.log(htmlPage);
        $thisPage.find('div.PHAN_TRANG').html(htmlPage);
    } else {
        if (COUNT > lengthCURR) {
            if (numberPage > 1) {
                var htmlPage = ' <ul class="pagination">';
                if (pageCurr > 1)
                    htmlPage += '<li class="cursor"><span class="first-page">Trang đầu</span></li><li class="cursor"><span><i class="fa fa-angle-double-left"></i></span></li>';
                for (var i = 1; i <= numberPage; i++) {
                    if (pageCurr == i)
                        htmlPage += '<li class="active"><span>' + i + '</span></li>';
                    else
                        htmlPage += '<li class="cursor"><span>' + i + '</span></li>';
                }
                if (pageCurr < numberPage)
                    htmlPage += '<li class="cursor"><span><i class="fa fa-angle-double-right"></i></span></li><li class="cursor"><span class="last-page" id="id_' + maxPage + '">Trang cuối</span></li>';

                htmlPage += '</ul>';
            }
            $thisPage.find('div.PHAN_TRANG').html(htmlPage);
            //OBJ_DM_DV.ListenEvent();
            //$('html,body').scrollTop(0);
        }
    }
    PHAN_TRANG_CLICK($thisPage, f_CallBack_Load_Data);
    if ($('.ecusw-site .frame-data').length > 0) {
        $('html,body .ecusw-site .frame-data').scrollTop(0);
    } else
        $('html,body').scrollTop(0);
}
function f_All_CUSTOM_PAGE_NUMBER_THEONGAY($thisPage, f_CallBack_Load_Data, COUNT, lengthCURR, pageCurr, COUNT_ROW) {
    pageCurr = parseInt(pageCurr);
    var numberPage = COUNT;
    $thisPage.find('.indexPage').html('- Trang <span class="color-blue">' + pageCurr + '/ ' + numberPage + '</span>');
    //Nếu hơn 10 trang thì chỉ lấy đến trang thứ 10, sau đấy mỗi sự kiện click thì tính tiếp
    $thisPage.find('input[name=TOTAL_PAGE]').val(numberPage);
    if (numberPage > 10) {
        $thisPage.find('input[name=TOTAL_PAGE]').val(numberPage);
        numberPage = 10;
    }
    $thisPage.find('.countItem').text(lengthCURR + '/' + COUNT_ROW);
    var maxPage = parseInt($thisPage.find('input[name=TOTAL_PAGE]').val());
    if (maxPage > 10 && pageCurr > 5) {
        var htmlPage = ' <ul class="pagination">';
        htmlPage += '<li class="cursor"><span class="first-page">Trang đầu</span></li><li class="cursor"><span><i class="fa fa-angle-double-left"></i></span></li>';
        for (var i = pageCurr - 5; i < pageCurr + 5; i++) {
            if (i <= maxPage) {
                if (pageCurr == i)
                    htmlPage += '<li class="active"><span>' + i + '</span></li>';
                else
                    htmlPage += '<li class="cursor"><span>' + i + '</span></li>';
            }
        }
        if (pageCurr < maxPage) {
            htmlPage += '<li class="cursor"><span class="more">...</span></li>';
            htmlPage += '<li class="cursor"><span><i class="fa fa-angle-double-right"></i></span></li>';
            htmlPage += '<li class="cursor"><span class="last-page" id="id_' + maxPage + '">Trang cuối</span></li>';
        }
        htmlPage += '</ul>';
        console.log(htmlPage);
        $thisPage.find('div.PHAN_TRANG').html(htmlPage);
    } else {
        if (numberPage > 1) {
            var htmlPage = ' <ul class="pagination">';
            if (pageCurr > 1)
                htmlPage += '<li class="cursor"><span class="first-page">Trang đầu</span></li><li class="cursor"><span><i class="fa fa-angle-double-left"></i></span></li>';
            for (var i = 1; i <= numberPage; i++) {
                if (pageCurr == i)
                    htmlPage += '<li class="active"><span>' + i + '</span></li>';
                else
                    htmlPage += '<li class="cursor"><span>' + i + '</span></li>';
            }
            if (pageCurr < numberPage)
                htmlPage += '<li class="cursor"><span><i class="fa fa-angle-double-right"></i></span></li><li class="cursor"><span class="last-page" id="id_' + maxPage + '">Trang cuối</span></li>';

            htmlPage += '</ul>';
        }
        $thisPage.find('div.PHAN_TRANG').html(htmlPage);
        //OBJ_DM_DV.ListenEvent();
        //$('html,body').scrollTop(0);        
    }
    PHAN_TRANG_CLICK($thisPage, f_CallBack_Load_Data);
    $('html,body .ecusw-site .frame-data').scrollTop(0);
}


function SetPaginationClick($page, _callBackLoad) {
    $page.find('div.pagination-page ul li span').off('click').on('click', function () {
        if (!$(this).hasClass('more')) {
            $('html,body').scrollTop(0);
            if (!$(this).parent().hasClass('active')) {
                if ($(this).find('.fa-angle-double-right').length > 0) {
                    _callBackLoad(parseInt($page.find('div.pagination-page ul li.active span').text()) + 1);
                } else if ($(this).find('.fa-angle-double-left').length > 0) {
                    _callBackLoad(parseInt($page.find('div.pagination-page ul li.active span').text()) - 1);
                } else if ($(this).hasClass('first-page')) {
                    _callBackLoad(1);
                } else if ($(this).hasClass('last-page')) {
                    _callBackLoad(parseInt($(this).attr('id').replace('id_', '')));
                } else {
                    var _getPage = $(this).text();
                    _callBackLoad(parseInt(_getPage));
                }
            }
        }
    });
}

function LoadPaginationPage($page, _callBackLoad, lengthTotal, lengthCurrent, pageCurrent, lengthOfPage) {
    pageCurrent = parseInt(pageCurrent);
    var pageExtral = lengthTotal % lengthOfPage;
    var TotalPages = Math.floor(lengthTotal / lengthOfPage);
    if (pageExtral > 0) { TotalPages += 1; }
    $page.find('.pagination-des').html('- Trang <span class="color-blue">' + pageCurrent + '/ ' + TotalPages + '</span>');
    //Nếu hơn 10 trang thì chỉ lấy đến trang thứ 10, sau đấy mỗi sự kiện click thì tính tiếp
    $page.find('input[name=TOTALPAGES]').val(TotalPages);
    if (TotalPages > 10) {
        $page.find('input[name=TOTALPAGES]').val(TotalPages);
        TotalPages = 10;
    }
    $page.find('.countItem').text(lengthCurrent + '/' + lengthTotal);
    var maxPage = parseInt($page.find('input[name=TOTALPAGES]').val());
    if (maxPage > 10 && pageCurrent > 5) {
        var htmlPage = '<ul class="pagination">';
        htmlPage += '<li class="cursor"><span class="first-page">Trang đầu</span></li><li class="cursor"><span><i class="fa fa-angle-double-left"></i></span></li>';
        for (let i = pageCurrent - 5; i < pageCurrent + 5; i++) {
            if (i <= maxPage) {
                if (pageCurrent == i) { htmlPage += '<li class="active"><span>' + i + '</span></li>'; }
                else { htmlPage += '<li class="cursor"><span>' + i + '</span></li>'; }
            }
        }
        if (pageCurrent < maxPage) {
            htmlPage += '<li class="cursor" title="Tổng có ' + maxPage + ' trang"><span class="more">...</span></li>';
            htmlPage += '<li class="cursor"><span><i class="fa fa-angle-double-right"></i></span></li>';
            htmlPage += '<li class="cursor"><span class="last-page" id="id_' + maxPage + '">Trang cuối</span></li>';
        }
        htmlPage += '</ul>';
        $page.find('div.pagination-page').html(htmlPage);
    }
    else if (lengthTotal > lengthCurrent) {
        if (TotalPages > 1) {
            var htmlPage = ' <ul class="pagination">';
            if (pageCurrent > 1)
                htmlPage += '<li class="cursor"><span class="first-page">Trang đầu</span></li><li class="cursor"><span><i class="fa fa-angle-double-left"></i></span></li>';
            for (let i = 1; i <= TotalPages; i++) {
                if (pageCurrent == i) { htmlPage += '<li class="active"><span>' + i + '</span></li>'; }
                else { htmlPage += '<li class="cursor"><span>' + i + '</span></li>'; }
            }
            if (pageCurrent < TotalPages) {
                htmlPage += '<li class="cursor"><span><i class="fa fa-angle-double-right"></i></span></li><li class="cursor"><span class="last-page" id="id_' + maxPage + '">Trang cuối</span></li>';
            }
            htmlPage += '</ul>';
        }
        $page.find('div.pagination-page').html('<div style="border-top: 1px solid #ddd;">' + htmlPage + '</div>');
        //OBJ_DM_DV.ListenEvent();
        //$('html,body').scrollTop(0);
    }
    SetPaginationClick($page, _callBackLoad);
    //let $ItemFrame =  $('.ecusw-site .frame-body') || $('.ecusw-site .frame-data') ;
    let $ItemFrame = $page.find('table').parent();
    if ($ItemFrame.length > 0) {
        $ItemFrame.scrollTop(0);
    }
    else {
        $('html,body').scrollTop(0);
    }
}

function LoadPaginationPage_followDay($page, _callBackLoad, lengthTotal, lengthCurrent, pageCurrent, COUNT_ROW) {
    pageCurrent = parseInt(pageCurrent);
    var TotalPages = lengthTotal;
    $page.find('.pagination-des').html('- Trang <span class="color-blue">' + pageCurrent + '/ ' + TotalPages + '</span>');
    //Nếu hơn 10 trang thì chỉ lấy đến trang thứ 10, sau đấy mỗi sự kiện click thì tính tiếp
    $page.find('input[name=TOTALPAGES]').val(TotalPages);
    if (TotalPages > 10) {
        $page.find('input[name=TOTALPAGES]').val(TotalPages);
        TotalPages = 10;
    }
    $page.find('.countItem').text(lengthCurrent + '/' + COUNT_ROW);
    var maxPage = parseInt($page.find('input[name=TOTALPAGES]').val());
    if (maxPage > 10 && pageCurrent > 5) {
        var htmlPage = ' <ul class="pagination">';
        htmlPage += '<li class="cursor"><span class="first-page">Trang đầu</span></li><li class="cursor"><span><i class="fa fa-angle-double-left"></i></span></li>';
        for (var i = pageCurrent - 5; i < pageCurrent + 5; i++) {
            if (i <= maxPage) {
                if (pageCurrent == i)
                    htmlPage += '<li class="active"><span>' + i + '</span></li>';
                else
                    htmlPage += '<li class="cursor"><span>' + i + '</span></li>';
            }
        }
        if (pageCurrent < maxPage) {
            htmlPage += '<li class="cursor" title="Tổng có ' + maxPage + ' trang"><span class="more">...</span></li>';
            htmlPage += '<li class="cursor"><span><i class="fa fa-angle-double-right"></i></span></li>';
            htmlPage += '<li class="cursor"><span class="last-page" id="id_' + maxPage + '">Trang cuối</span></li>';
        }
        htmlPage += '</ul>';
        console.log(htmlPage);
        $page.find('div.pagination-page').html(htmlPage);
    } else {
        if (TotalPages > 1) {
            var htmlPage = ' <ul class="pagination">';
            if (pageCurrent > 1)
                htmlPage += '<li class="cursor"><span class="first-page">Trang đầu</span></li><li class="cursor"><span><i class="fa fa-angle-double-left"></i></span></li>';
            for (var i = 1; i <= TotalPages; i++) {
                if (pageCurrent == i)
                    htmlPage += '<li class="active"><span>' + i + '</span></li>';
                else
                    htmlPage += '<li class="cursor"><span>' + i + '</span></li>';
            }
            if (pageCurrent < TotalPages)
                htmlPage += '<li class="cursor"><span><i class="fa fa-angle-double-right"></i></span></li><li class="cursor"><span class="last-page" id="id_' + maxPage + '">Trang cuối</span></li>';

            htmlPage += '</ul>';
        }
        $page.find('div.pagination-page').html('<div style="border-top: 1px solid #ddd;">' + htmlPage + '</div>');
        //OBJ_DM_DV.ListenEvent();
        //$('html,body').scrollTop(0);        
    }
    SetPaginationClick($page, _callBackLoad);
    $('html,body .ecusw-site .frame-data').scrollTop(0);
}
