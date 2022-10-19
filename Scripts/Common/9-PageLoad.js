$(function () {
    $PageEvent.init();
    $('.ecusw-site.UPDATE .card-body .frame-data').css("max-height", window.outerHeight - 270);
    $('.ecusw-site .modal .frame-data').css("max-height", window.outerHeight - 350);
    $('.ecusw-site .modal .frame-data').css("overflow", "scroll");
    SetPrintPage_targetNew();
    $dropdown.init();
    $AttachFile.init();
    $Format.init();
    $TableCheckBox.init();
    // Hủy sự kiện enter cho toàn control nhập liệu
    $("input,textare").on('keydown', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13 && !$(this).is("textarea, :button, :submit")) {
            e.stopPropagation();
            e.preventDefault();
            $(this)
                .nextAll(":input:not(:disabled, [readonly='readonly'])")
                .first()
                .focus();
        }
    });
});

var keydownBefore = 0;
$.fn.ForceNumericOnly =
    function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.charCode || e.keyCode || 0;
                // ký tự c để ctr + A, ctr + C, ctr + V
                if (keydownBefore == 17 && (key == 65 || key == 67 || key == 86 || key == 88)) return true;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
                keydownBefore = key;
                //console.log(key)
                ;
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            });
        });
    };