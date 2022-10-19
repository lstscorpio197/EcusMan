const $LstKhoNgoaiQuanHP = ['03TGW14', '03TGW17', '03TGW04', '03TGW21', '03TGW02'];
const urlKDTServiceOffline = 'http://210.2.120.200:8091/KDTService.asmx/';
const urlKDTService = "https://phtkvcangbien.tphcm.gov.vn:8091/KDTService.asmx/", userKDTService = "Thaison2018";
const urlServiceInvoice_Lan = 'http://210.2.120.200:8093';
const urlServiceInvoice_Web = 'https://phtkvcangbien.tphcm.gov.vn:8093';
const urlEinvoiceViewer = (location.href.indexOf('210.2.120.') >= 0 ? urlServiceInvoice_Lan : urlServiceInvoice_Web) + '/Viewer/HoaDonViewer.aspx?mhd=';
const urlEinvoiceBienBanViewer = (location.href.indexOf('210.2.120.') >= 0 ? urlServiceInvoice_Lan : urlServiceInvoice_Web) + '/Viewer/BienBanViewer.aspx?bbid=';
const urlEinvoiceDownloadFile = (location.href.indexOf('210.2.120.') >= 0 ? urlServiceInvoice_Lan : urlServiceInvoice_Web) + '/Viewer/Downloadfile.aspx?mhd=';
var valuePage = 100, Yes = 1, No = 0, maxLengthFileAccept = 4 /*4MB*/;
var $ChucVu = {
    Default: -1, Administrator: 0, SubAdmin: 1, Manager: 2, SubManager: 3,
    HeadTeam: 4, SubHeadTeam: 5, Staff: 6, Fressher: 7, Intern: 8
}
function GetChucVuUser(level, mahq) {
    mahq = (mahq || '');
    if (level == $ChucVu.Administrator) return "Administrator";
    if (level == $ChucVu.SubAdmin) return "Admin phòng ban";
    if (level == $ChucVu.Manager) return "Trưởng phòng";
    if (level == $ChucVu.SubManager) return "Phó phòng";
    if (level == $ChucVu.HeadTeam) return "Đội trưởng";
    if (level == $ChucVu.SubHeadTeam) return "Đội phó";
    if (level == $ChucVu.Staff) return "Nhân viên";
    if (level == $ChucVu.Fressher) return "Thử việc";
    if (level == $ChucVu.Intern) return "Thực tập sinh";
    return "Khác";
}
function preloader_loading(frame_load, text_load) {
    $(frame_load).preloader({ text: text_load });
}
function preloader_close(frame_load) {
    $(frame_load).preloader('remove');
}
function ParseNull(_val) {
    return ((_val == null || _val == 'NULL' || _val == 'null') ? "" : _val);
}
function padLeft(Str, len, padString) {
    Str = (Str || '') + '';
    padString = padString || '0';
    len = (len || 0) < 2 ? 2 : len;
    return Str.padStart(len, padString)
}
function padRight(Str, len, padString) {
    Str = (Str || '') + '';
    padString = padString || '0';
    return Str.padEnd(len, padString)
}
function convertDateFromServer(date) {
    date = date || null;
    if (date == null) return '';
    var Result = new Date(parseInt(date.substr(6)));
    Result = Result == '' ? '' : (Result.getDate().toString().padStart(2, '0') + '/' + (Result.getMonth() + 1).toString().padStart(2, '0') + '/' + Result.getFullYear());
    if (Result == "01/01/1") return '';
    return Result;
}
function convertDateFromServerHms(date) {
    date = date || null;
    if (date == null) return '';
    var Result = new Date(parseInt(date.substr(6)));
    Result = Result == '' ? '' : (Result.getDate().toString().padStart(2, '0') + '/' + (Result.getMonth() + 1).toString().padStart(2, '0') + '/' + Result.getFullYear() + " " + Result.getHours().toString().padStart(2, '0') + ":" + Result.getMinutes().toString().padStart(2, '0') + ":" + Result.getSeconds().toString().padStart(2, '0'));
    if (Result == "01/01/1") return '';
    return Result;
}
function GetSystemDateHms() {
    var _date = new Date();
    return padLeft(_date.getDate()) + "/" + padLeft(_date.getMonth() + 1) + "/" + _date.getFullYear() + " " + padLeft(_date.getHours()) + ":" + padLeft(_date.getMinutes()) + ":" + padLeft(_date.getSeconds());
}
function GetSystemDate() {
    var _date = new Date();
    return padLeft(_date.getDate()) + "/" + padLeft(_date.getMonth() + 1) + "/" + _date.getFullYear();
}
function GetDateNowJs() {
    var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/'); //2021/01/12
    var arrDate = date.split("/");
    return arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0]; //12/01/2021
}
function ConvertDateFromClientToServer(TextDate) {
    TextDate = (TextDate || '').trim();
    var arrDate = TextDate.split("/");
    if (arrDate.length > 2) { return arrDate[1] + "/" + arrDate[0] + "/" + arrDate[2]; }
    return null;
}
function DateBeforeSubmit(Name_ControlDate) {
    var ngayInput = $('input[name=' + Name_ControlDate + 'TMP]').val().trim();
    if (ngayInput !== "" || ngayInput !== null) {
        var arrNgay = ngayInput.split("/");
        if (arrNgay.length > 2)
            $('input[name=' + Name_ControlDate + ']').val(arrNgay[1] + "/" + arrNgay[0] + "/" + arrNgay[2]);
    }
}
var CheckSignature = (id) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/ChuKySo/KiemTraKySo_ToKhai/",
            method: "POST",
            dataType: "JSON",
            data: { "ID": id },
            success: result => {
                resolve(result);
            },
            error: (xhr, status, error) => {
                reject(error);
            }
        });
    });
}

var windowCurrent = null;
function SetPrintPage_targetNew() {
    $('a[target^="_new"]').off('click').on('click', function () {
        if (windowCurrent != null)
            windowCurrent.close();
        var widthCheck = $(this).data('width');
        var width = window.innerWidth * 0.6;
        if (widthCheck == '100') { width = window.innerWidth }
        // define the height in
        var height = width * window.innerHeight / window.innerWidth + 300;
        if (widthCheck == '100') { height = window.innerHeight - 30; }
        // Ratio the hight to the width as the user screen ratio
        windowCurrent = window.open(this.href, 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
        windowCurrent.onload = function () {
            if ($('.not-popup-print').length == 0) return false;
            windowCurrent.print();
        }
        return false;
    });
};
function openHtmlToNewWindow(htmldata) {
    var widthCheck = $(this).data('width');
    var width = window.innerWidth * 0.6;
    if (widthCheck == '100') { width = window.innerWidth }
    // define the height in
    var height = width * window.innerHeight / window.innerWidth + 300;
    if (widthCheck == '100') { height = window.innerHeight - 30; }
    var printWindow = window.open('', 'My div', 'height=' + height + ',width=' + width);
    printWindow.document.write('<html><head><title>In biên lai điện tử - Hệ thống thu phí HCM</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(htmldata);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
// Cấu hình Ajax
AjaxConfig.ajaxSetup();
AjaxConfig.ajaxStart();
AjaxConfig.ajaxStop();

