var $EinvoiceView = {
    f_Print: function (iframe_src, title_window) {
        preloader_loading('.ecusw-site', 'Đang xử lý...');
        try {
            $.ajax({
                type: "GET",
                url: iframe_src,
                success: function (data) {
                    preloader_close('.ecusw-site');
                    $EinvoiceView.f_OpenHtmlContentPopup(data, title_window);
                }, error: function (message) {
                    preloader_close('.ecusw-site');
                    //$MessageBox.confirm2('THÔNG BÁO', message, 'red', '', '', '');
                    $EinvoiceView.f_OpenUrlPopup(iframe_src, title_window);
                }
            });
        } catch (ex) {
            $EinvoiceView.f_OpenUrlPopup(iframe_src, title_window);
        }
    },
    f_OpenHtmlContentPopup: function (htmldata, title_window) {
        title_window = title_window || '';
        title_window = title_window == '' ? 'Biên lai điện tử' : title_window;
        var widthCheck = $(this).data('width');
        var width = window.innerWidth * 0.6;
        if (widthCheck == '100') { width = window.innerWidth }
        // define the height in
        var height = width * window.innerHeight / window.innerWidth + 300;
        if (widthCheck == '100') { height = window.innerHeight - 30; }
        var printWindow = window.open('', '', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
        printWindow.document.write('<html><head><title>' + title_window + ' - Hệ thống thu phí TP Hồ Chí Minh</title>');
        printWindow.document.write('<style>tr {page-break-inside: unset!important;}@page {  size: A4;  margin:20px; margin-left:20px;margin-right:20px;} @media print{   body {margin: 0px;}}</style>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(htmldata);
        printWindow.document.write('</body></html>');
        //printWindow.document.write('<script>$(document).ready(function(){});</script>');
        printWindow.document.close();
        preloader_loading('.content-body-body', 'Đang xử lý...');
        setTimeout(function () { preloader_close('.content-body-body'); printWindow.print(); }, 300);
    },
    f_OpenUrlPopup: function (Url, title_window) {
        var width = window.innerWidth * 0.6;
        var widthCheck = $(this).data('width');
        var height = width * window.innerHeight / window.innerWidth + 300;
        if (widthCheck == '100') { height = window.innerHeight - 30; }
        window.open(Url, title_window, 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
    }
};
