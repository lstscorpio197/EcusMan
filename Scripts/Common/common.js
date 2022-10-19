function $CKConfig(elementId) {
    CKEDITOR.replace(elementId, {
        toolbarGroups: [
            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
            { name: 'clipboard', groups: ['clipboard', 'undo'] },
            { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
            { name: 'insert', groups: ['insert'] },
            { name: 'styles', groups: ['styles'] },
            { name: 'colors', groups: ['colors'] },
            { name: 'tools', groups: ['tools'] },
            { name: 'about', groups: ['about'] },
            { name: 'document', groups: ['mode', 'document', 'doctools'] },
            { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
            { name: 'forms', groups: ['forms'] },
            '/',
            { name: 'links', groups: ['links'] },
            '/',
            { name: 'others', groups: ['others'] }
        ],
        removeButtons: 'Source,Save,NewPage,ExportPdf,Preview,Print,Templates,Form,Select,Button,ImageButton,HiddenField,RemoveFormat,CopyFormatting,CreateDiv,Language,Link,Unlink,Anchor,Image,Table,HorizontalRule,Iframe,PasteText,PasteFromWord,Replace,Find,SelectAll,Scayt,Checkbox,Radio,TextField,Textarea'
    });
}

function $convertTimeStartNowToString() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let day = today.getDay();
    let ddMMyyyy = ((today.getDate() > 9) ? today.getDate() : ('0' + today.getDate())) + '/' + ((today.getMonth() > 8) ? (today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) + '/' + today.getFullYear();
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    let txt = h + ":" + m + ":" + s + "  " + $convertDayOfWeek(day) + ", " + ddMMyyyy
    $('#txtTime').html(txt);
    setTimeout($convertTimeStartNowToString, 1000);
}
function $convertDayOfWeek(day) {
    switch (day) {
        case 0:
            return "Chủ Nhật";
        case 1:
            return "Thứ Hai";
        case 2:
            return "Thứ Ba";
        case 3:
            return "Thứ Tư";
        case 4:
            return "Thứ Năm";
        case 5:
            return "Thứ Sáu";
        case 6:
            return "Thứ Bảy";

    }
}

function $convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

function $convertUserType(userType) {
    switch (userType) {
        case -1:
            return "Khác";
        case 0:
            return "Thành viên mới";
        case 1:
            return "Doanh nghiệp XNK";
        case 2:
            return "Doanh nghiệp kho bãi cảng";
        case 3:
            return "Cảng vụ";
        default:
            return "Doanh nghiệp";
    }
}

function $countFile() {
    let rowFile = $('.lst-file').find('.file-row').length;
    if (rowFile >= 5) {
        $MessageBox.confirm(BoxType.ClientError, null, "Không thể đính kèm quá 5 file", null, null, null);
        return false;
    }
    else
        return true;
}

function $removeVietnameseTones(str) {
    str = str.toLowerCase();
    str = str.trim();
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.replace(/ /g, "-");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    return str;
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}