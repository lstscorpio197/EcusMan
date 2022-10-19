var $Format = {
    init: function () {
        $Format.formatInputDate();
        $Format.formatInputNumber();
        $Format.formatDateTime();
    },
    formatInputNumber: function () {
        $('.input-number').each(function () {
            var cleave = new Cleave($(this), {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                numeralDecimalScale: 4
            });
        });
        $('input.only-number').each(function () {
            $(this).ForceNumericOnly();
        });
    },
    formatInputDate: function () {
        $('.input-date').each(function () {
            var cleave = new Cleave($(this), {
                date: true,
                datePattern: ['d', 'm', 'Y']
            });
        });
        $('.input-date-hour').each(function () {
            new Cleave($(this), {
                blocks: [2, 2, 4, 2, 2],
                delimiters: ['/', '/', ' ', ':']
            });
        });
        $('.input-date-hms').each(function () {
            new Cleave($(this), {
                blocks: [2, 2, 4, 2, 2, 2],
                delimiters: ['/', '/', ' ', ':', ':']
            });
        });
    },
    formatDateTime: function () {
        $.fn.datetimepicker.dates['vi'] = {
            days: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
            daysShort: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "CN"],
            daysMin: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "CN"],
            months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            monthsShort: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
            today: "Hôm nay"
        };

        $('.is_Datetimepicker').each(function () {
            $($(this)).datetimepicker({
                format: "dd/MM/yyyy",
                showToday: true,
                language: 'vi'
            }).on('changeDate', function (ev) {
                $(this).datetimepicker('hide');
            });
        });

        $('.is_Datetimepicker_hours ').each(function () {
            $($(this)).datetimepicker({
                format: "dd/MM/yyyy hh:mm",
                showToday: true,
                language: 'vi'
            }).on('changeDate', function (ev) {
                $(this).datetimepicker('hide');

            });
        });
        $('form input.input-date').focusout(function () {           
            $('form').bootstrapValidator('revalidateField', $(this).attr('name'));
        });
        $('form input.input-date-hour').focusout(function () {
            $('form').bootstrapValidator('revalidateField', $(this).attr('name'));
        });
    },
    GET_DATE_FORMAT: function (valDate) {
        var res = "";
        var arrNgayPC = valDate.split("/");
        if (arrNgayPC.length > 2)
            res = arrNgayPC[1] + "/" + arrNgayPC[0] + "/" + arrNgayPC[2];
        return res;
    }
};

var $dropdown = {
    init: function () {
        $dropdown.f_event();
    },
    f_event: function () {
        $dropdown.f_startdropdown();
        $dropdown.f_selectitem();
        $dropdown.f_scroll();
        $('body form div').on('click', function () {
            if (!$(this).hasClass('dropdown-parent') && $(this).parents('.dropdown-parent').length == 0 && !$(this).hasClass('dropdown-menu-down'))
                $.each($('.dropdown-menu-down'), function (index, item) {
                    if (!$(item).hasClass('hidden'))
                        $(item).addClass('hidden');
                });
            //return false;
        });
    },
    f_InputChange: function () {
        $('input.form-control').on('input', function () {
            if ($(this).parent().find('.dropdown-menu-down').length > 0) {
                var $dropmenu = $(this).parent().find('.dropdown-menu-down');
                var Val = $(this).val().trim();
                if (Val.length > 1) {
                    var Code = $dropmenu.find('table tbody tr td.code')
                }
            }
        });
    },
    f_startdropdown: function () {
        $('.start-dropdown').on('click', function (e) {
            var $dropdown = $(this).parents('.dropdown-parent').find('.dropdown-menu-down');
            //Đóng tất cả các drop down danh mục trươc khi mở cái mới
            $.each($('.dropdown-menu-down'), function (index, item) {
                if (!$(item).hasClass('hidden'))
                    $(item).addClass('hidden');
            })
            //Đóng tất cả các drop down danh mục trươc khi mở cái mới              
            $dropdown.toggleClass('hidden');
            return false;
        });
    },
    f_selectitem: function () {
        $('.dropdown-parent').find('.dropdown-menu-down table tbody tr.item').off('click').on('click', function () {
            var codevalue = $(this).find('.code').html();
            $($(this).parents('.dropdown-parent').find('input')[0]).val(codevalue);
            var namevalue = $(this).find('td.name').html();
            var controlName = $(this).parents('.dropdown-menu-down').data('controldisplayname');
            if ($("[name=" + controlName + "]").length == 1) {
                $("[name=" + controlName + "]").val(namevalue);
                //$('form').bootstrapValidator('revalidateField', controlName);
            }

            $(this).parents('.dropdown-menu-down').toggleClass('hidden');
            $('form').bootstrapValidator('revalidateField', $(this).parents('.dropdown-parent').find('input').attr('name'));
        });
    },
    f_loaddata: function (pageNum) {

    },
    f_scroll: function () {
        $('.dropdown-menu-down').scroll(function () {
            var $this = $(this);
            var html = '<tr class="item"><td class="text-center">1</td><td class="color-blue code"></td><td></td></tr>';

            var position = $this.scrollTop();
            var result = this.scrollHeight - $this.height();
            var x = [position, this.scrollHeight, $this.height(), this.scrollHeight - $this.height()];

            if (!$this.hasClass('stop-scroll'))
                if (position == result) {
                    $this.find('table tbody').append(html);
                    console.log("====================================");
                }

        });
    }
};