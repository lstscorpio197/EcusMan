var $pageSize = {
    outerHeight: function () { return window.outerHeight; },
    innerHeight: function () { return window.innerHeight; },
    Selector: {
        'cardbody': $('.ecusw-site .card-body'),
        'tabs': $('.ecusw-site .card-body .nav.nav-tabs'),
        'cardbodyFrameHeader': $('.ecusw-site .card-body .frame-header'),
        'cardbodyFrameBody': $('.ecusw-site .card-body .frame-body'),
        'modalbody': $('.ecusw-site .modal .modal-body'),
        'modalbodyFull': $('.ecusw-site .modal.full .modal-body'),
        'modalbody_body': $('.ecusw-site .modal .modal-body .modal-body-body'),
        'menuHorizontal': $('.mx-horizontal'),
        'menuVertical': $('body.mx-vertical')
    },
    LoadDefaultSize: function () {
        let heightHorizontal = 0;
        if (this.Selector.menuHorizontal.length > 0) {
            heightHorizontal = this.Selector.menuHorizontal.find('.menubar-main').height();
            this.Selector.menuHorizontal.find('.ecusw-site').css("margin-top", heightHorizontal + 8);
        }
        this.Selector.cardbody.css("max-height", $pageSize.innerHeight() - 40 - heightHorizontal);
        this.Selector.modalbody.css("max-height", $pageSize.innerHeight() - 200 - heightHorizontal);
        this.Selector.modalbodyFull.css("max-height", $pageSize.innerHeight() - 100 - heightHorizontal);

        this.LoadHeightFrameBody();
        this.LoadHeightFrameBody_IntoTabs();
        this.LoadWidthFastSearch();
        this.LoadpaddingTopModal();
        this.LoadHeightModalBody_Body();
        this.ScrollTable();
    },
    LoadHeightFrameBody: function () {
        let navbarHeaderHeight = $('.main-header.navbar').height();
        let cardHeaderHeight = (this.Selector.menuVertical.length > 0 ? 15 : $('.card-header').height());
        let frameHeaderHeight = $('.card-body .frame-header').height();
        let mainFooterHeight = ($('.main-footer').height() || 0) + $('.card-body .frame-footer').height();
        if (mainFooterHeight == 0) { mainFooterHeight = 10; }
        let heightHorizontal = (this.Selector.menuHorizontal.length > 0 ? this.Selector.menuHorizontal.find('.menubar-main').height() + 20 : 0);      
        let height_nav_tabs = 0;
        if (this.Selector.cardbodyFrameBody.parents('.tab-pane').length >= 1) {
            height_nav_tabs = this.Selector.cardbody.find('.nav.nav-tabs').height() + 20;
            if (heightHorizontal > 0) { heightHorizontal += 35;}
        }       
        if (this.Selector.cardbodyFrameBody.length == 1) {            
            this.Selector.cardbodyFrameBody.css("max-height", $pageSize.innerHeight() - navbarHeaderHeight - cardHeaderHeight - frameHeaderHeight - mainFooterHeight - heightHorizontal - height_nav_tabs);
        } else if (this.Selector.cardbodyFrameBody.length > 1) {
            this.Selector.cardbodyFrameBody.each((index, itemBody) => {
                frameHeaderHeight = $(itemBody).parent().find('.frame-header').height();
                mainFooterHeight = $(itemBody).parent().find('.frame-footer').height();
                $(itemBody).css("max-height", $pageSize.innerHeight() - navbarHeaderHeight - cardHeaderHeight - frameHeaderHeight - mainFooterHeight - heightHorizontal - height_nav_tabs);
            });
        }
    },
    LoadHeightFrameBody_IntoTabs: function () {
        $pageSize.Selector.tabs.find('li').click(function () {
            setTimeout(function () { $pageSize.LoadHeightFrameBody(); $pageSize.LoadWidthFastSearch(); }, 500);
        });
    },
    LoadpaddingTopModal: function () {
        let heightHorizontal = ($pageSize.Selector.menuHorizontal.find('.menubar-main').height() || 40) + 10;
        $('.modal').css('padding-top', heightHorizontal - 5);
    },
    LoadHeightModalBody_Body: function () {
        this.Selector.modalbody_body.each(function (index, item_modaBody) {
            let $item_modaBody = $(item_modaBody);
            let modalBodyHeader = $item_modaBody.parent().find('.modal-body-header'), heightModalBodyHeader = 0;
            if (modalBodyHeader.length > 0) {
                heightModalBodyHeader = modalBodyHeader.height() || 70;
            }
            if ($item_modaBody.parents('td').length > 0 || $item_modaBody.parents('.tab-content').length > 0) {
                heightModalBodyHeader = heightModalBodyHeader + 80;
            }
            if ($item_modaBody.parents('.modal.full').length > 0) {
                heightModalBodyHeader = modalBodyHeader.height() || ($item_modaBody.parent().find('.modal-body-footer ul.pagination').length > 0 ? 45 : 0);
            }
            let modalBodyFotter = $item_modaBody.parent().find('.modal-body-fotter'), heightmodalBodyFotter = 0;
            if (modalBodyFotter.length > 0) { heightmodalBodyFotter = modalBodyFotter.height(); }
            $item_modaBody.css("max-height", $pageSize.innerHeight() - 200 - heightModalBodyHeader - heightmodalBodyFotter + ($item_modaBody.parents('.modal.slide').length > 0 ? 100 : 0));
        });
        //let modalBodyHeader = this.Selector.modalbody_body.parent().find('.modal-body-header'), heightModalBodyHeader = 0;
        //if (modalBodyHeader.length > 0) {
        //    heightModalBodyHeader = modalBodyHeader.height() || 70;
        //}
        //if (this.Selector.modalbody_body.parents('td').length > 0 || this.Selector.modalbody_body.parents('.tab-content').length > 0) {
        //    heightModalBodyHeader = heightModalBodyHeader + 80;
        //}
        //let modalBodyFotter = this.Selector.modalbody_body.parent().find('.modal-body-fotter'), heightmodalBodyFotter = 0;
        //if (modalBodyFotter.length > 0) { heightmodalBodyFotter = modalBodyFotter.height(); }
        //this.Selector.modalbody_body.css("max-height", $pageSize.innerHeight() - 200 - heightModalBodyHeader - heightmodalBodyFotter + (this.Selector.modalbody_body.parents('.modal.slide').length > 0 ? 100 : 0));
        this.Selector.modalbody_body.css("overflow-y", "auto");
    },
    LoadWidthFastSearch: function () {
        let $searchFast = $('.card-body .frame-header .search-fast');
        if ($searchFast.length <= 0) return;
        $searchFast.each(function (index, item) {
            let $frameHeader = $(item).parents('.frame-header');
            let frameHeaderLeftWidth = $frameHeader.find('.pull-left').width();
            let minLeftWidth = 200;
            $(item).width(frameHeaderLeftWidth < minLeftWidth ? minLeftWidth : frameHeaderLeftWidth);
        });
        //Minhmx Update 230720
        //$searchFast.find("input[name=HighLightText]").bind('keyup', function (e) {
        //    var text = $.trim($(this).val().trim());
        //    if (text !== '' && text !== ' ') { var pattern = new RegExp(text, "gi"); } 
        //    $('table tbody tr td:not(.event-handle)').each(function (i) {
        //        var $td = $(this);
        //        var orgText = $td.text();
        //        orgText = orgText.replace(pattern, function ($Content) {
        //            return "<span class='highlight'>" + $Content + "</span>";
        //        });                  
        //        $td.html(orgText);
        //    });
        //});
        $('.card-body .frame-header').find("input[name=HighLightText]").bind('keyup', function (e) {
            var text = $.trim($(this).val().trim());
            if (text == '' || text.replace(/ /g, '') == '') {
                $('table tbody tr').removeClass('hidden');
            }
            else {
                var pattern = new RegExp(text, "gi");
            }
            $('table tbody tr td:not(.event-handle)').each(function (i) {
                var $td = $(this);
                var orgText = $td.text();
                orgText = orgText.replace(pattern, function ($Content) {
                    return "<span class='highlight'>" + $Content + "</span>";
                });
                $td.html(orgText);
            });
            if (text != '') { $('table tbody tr').addClass('hidden'); $('span.highlight').parents('tr').removeClass('hidden'); }
        });
        //Minhmx Update 230720 End
    },
    ScrollTable: function () {
        $('table').parent().on('scroll', function () {
            let Self = $(this);
            let vertical = Self.scrollTop();
            let horizontal = Self.scrollLeft();
            Self.find('table .sticky-col').removeClass('active');
            if (horizontal > 0) {
                Self.find('table .sticky-col').addClass('active');
            }
            //console.log('horizontal:' + horizontal + ', vertical:' + vertical);
        });
    }
};

var $pageSearch = {
    Self: $('.frame-header'),
    init: function () {
        if ($pageSearch.Self.length == 0) return;
        if ($pageSearch.Self.find('[name=MaHq]').lenght == 0 || $pageSearch.Self.find('[name=MaDoi]').length == 0 || $pageSearch.Self.find('[name=NguoiTao]').lenght == 0) return;
        let maPb = $pageSearch.Self.find('[name=MaHq]').val();
        this.PhongBanOnChange();
        this.DoiOnChange(maPb, '');
        this.PhongBanChange(maPb);
    },
    PhongBanOnChange: function () {
        $pageSearch.Self.find('[name=MaHq]').on('change', function () {
            let maPb = $(this).val();
            $pageSearch.PhongBanChange(maPb);
            $pageSearch.DoiChange(maPb);
            if (maPb == '') { $pageSearch.Self.find('[name=NguoiTao] option').removeClass('hidden'); }
        });
    },
    PhongBanChange: function (maPb) {
        let $SelectDoi = $pageSearch.Self.find('[name=MaDoi]');
        $SelectDoi.find('option:not(:first-child)').addClass('hidden');
        $SelectDoi.find('option:first-child').prop('selected', true);
        $SelectDoi.find('option[ma-phongban="' + maPb + '"]').removeClass('hidden');
    },
    DoiOnChange: function () {
        $pageSearch.Self.find('[name=MaDoi]').on('change', function () {
            let value = $(this).val() || '';
            let maPb = $pageSearch.Self.find('[name=MaHq]').val();
            if (value == '') {
                $pageSearch.Self.find('[name=NguoiTao] option:not(:first-child)').addClass('hidden');
                $pageSearch.Self.find('[name=NguoiTao] option[ma-phongban="' + maPb + '"]').removeClass('hidden');
                return false;
            }
            let doiId = $(this).find('option[value="' + value + '"]').data('doiid');
            maPb = $(this).find('option[value="' + value + '"]').attr('ma-phongban');
            $pageSearch.DoiChange(maPb, doiId);
        });
    },
    DoiChange: function (maPb, doiId) {
        let $SelectNguoiTao = $pageSearch.Self.find('[name=NguoiTao]');
        $SelectNguoiTao.find('option:not(:first-child)').addClass('hidden');
        $SelectNguoiTao.find('option:first-child').prop('selected', true);
        $SelectNguoiTao.find('option[ma-phongban="' + maPb + '"]').removeClass('hidden');
        doiId = (doiId || '');
        if (doiId != '') {
            $SelectNguoiTao.find('option:not(:first-child)').addClass('hidden');
            $SelectNguoiTao.find('option[ma-phongban="' + maPb + '"][data-doiid="' + doiId + '"]').removeClass('hidden');
        }
    }
};

var $PageEvent = {
    init: function () {
        $pageSize.LoadDefaultSize();
        setTimeout(function () { $pageSize.LoadDefaultSize(); }, 500);
        //$newWindow.aTag_TargetNewClick();
        this.DeleteEnterEvent();
        this.SlideBarClick();
        this.SetDisplayMenu();
        this.ScrollCardBody();
        this.Resize();
        this.LogOut();
        $('.btnSearch.spinner').click(function () { let self = $(this); self.find('i').attr('class', 'fa fa-spin fa-spinner') });
    },
    DeleteEnterEvent: function () {// Hủy sự kiện enter cho toàn control nhập liệu        
        $("input,textare").on('keydown', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13 && !$(this).is("textarea, :button, :submit")) {
                e.stopPropagation();
                e.preventDefault();
                $(this).nextAll(":input:not(:disabled, [readonly='readonly'])").first().focus();
            }
        });
    },
    SlideBarClick: function () {
        //toggle menu
        $('.sidebar-toggle').click(function () {
            var IsClose = $('.sidebar-mini').hasClass('sidebar-collapse') ? Yes : No;
            var getResponse = AjaxConfig.sendRequestToServer("/GeneralAjax/SetToggleMenu", "Post", { 'IsClose': IsClose });
            getResponse.then(res=> {
                if (res.Header.MsgType == BoxType.Success) { /*location.href = location.href; */ }
            }).catch(xhr=> {
                AjaxConfig.CatchError(xhr);
            });
        });
    },
    SetDisplayMenu: function () {
        $('.control-sidebar .btnSelectedMenu').on('click', function () {
            let Self = $(this);
            if (Self.hasClass('active')) return false;
            let IsVertical = (Self.hasClass('vertical') ? Yes : No);
            var getResponse = AjaxConfig.sendRequestToServer("/GeneralAjax/SetMenuTypeDisplay/", "Post", { 'IsVertical': IsVertical });
            getResponse.then(res=> {
                if (res.Header.MsgType == BoxType.Success) { location.href = location.href; return; }
            }).catch(xhr=> {
                AjaxConfig.CatchError(xhr);
            });
        });
    },
    ScrollCardBody: function () {
        $('.card-body.scroll').on('scroll', function () {
            let Self = $(this);
            let posScroll = Self.scrollTop();
            if (posScroll > 400) {
                Self.find('.is-header').addClass('scroll-active');
                Self.find('.is-header.scroll-active').css('width', Self.innerWidth());
            } else {
                Self.find('.is-header').removeClass('scroll-active');
            }
        });
    },
    Resize: function () {
        $(window).resize(function (e) {
            $pageSize.LoadDefaultSize();
        });
    },
    LogOut: function () {
        $('li.btnSignOut').click(function () {
            $.confirm({
                title: '<i class="fa fa-bell-o"></i> THÔNG BÁO',
                content: 'Bạn có chắc chắn muốn đăng xuất không?',
                type: 'blue',
                typeAnimated: true,
                columnClass: 'col-md-offset-0',
                container: $('.content-body-body'),
                buttons: {
                    tryAgain: {
                        text: '<i class="fa fa-sign-out"></i>&nbsp;Thực hiện đăng xuất',
                        btnClass: 'btn-primary',
                        action: function () {
                            location.href = '/dang-xuat';
                        }
                    },
                    close: {
                        text: '<i class="fa fa-close"></i>&nbsp;Đóng',
                        action: function () { }
                    }
                }
            });
        });
    }
};

var $KeyDown = {
    Enter: function ($Input, $Callback) {
        $Input.keydown(function (e) {
            let key = e.charCode || e.keyCode || 0;
            let keyEnter = 13;
            if (key == keyEnter) {
                $Callback();
            }
        });
    },
    Tab: function ($Input, $Callback) {
        $Input.keydown(function (e) {
            let key = e.charCode || e.keyCode || 0;
            let keyTab = 8;
            if (key == keyTab) {
                $Callback();
            }
        });
    }
}