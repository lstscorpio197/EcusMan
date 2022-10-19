var $Base64File = {
    init: function () { },
    GetFileTypeWebService: function (FileName) {
        var fileType = "application/pdf";
        var arrFile = FileName.split('.');
        if (arrFile.length > 0) {
            var valueCheck = arrFile[arrFile.length - 1];
            valueCheck = valueCheck.trim().toUpperCase();
            switch (valueCheck) {
                case "PDF":
                    fileType = "application/pdf";
                    break;
                case "DOC":
                    fileType = "application/msword";
                    break;
                case "DOCX":
                    fileType = "application/msword";
                    break;
                case "XLS":
                    fileType = "application/vnd.ms-excel";
                    break;
                case "XLSX":
                    fileType = "application/vnd.ms-excel";
                    break;
                case "TXT":
                    fileType = "text/plain";
                    break;
                case "TIF":
                    fileType = "image/tiff";
                    break;
                case "GIF":
                    fileType = "image/gif";
                    break;
                case "PNG":
                    fileType = "image/png";
                    break;
                case "JPG":
                    fileType = "image/jpeg";
                    break;
                case "JPEG":
                    fileType = "image/jpeg";
                    break;
                default:
                    fileType = "image/svg+xml";// Các type ảnh khác
                    break;
            }
        }
        return fileType;
    },
    DownLoadFile: function (LOAI_DULIEU, base64string, fileType, tenFile) {
        if (LOAI_DULIEU == "WEBSERVICE") {
            // base64 string
            var base64str = base64string;
            // decode base64 string, remove space for IE compatibility
            var binary = atob(base64str.replace(/\s/g, ''));
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
            // create the blob object with content-type "application/pdf"               
            var blob = new Blob([view], { type: $Base64File.GetFileTypeWebService(tenFile) });
            var url = URL.createObjectURL(blob);
            var a = $("<a>").attr("href", url).attr("download", tenFile.split('.')[0]).appendTo("body");
            a[0].click();
            a.remove();
        } else {
            var a = $("<a>").attr("href", "data:" + fileType + ";base64," + base64string).attr("download", tenFile.split('.')[0]).appendTo("body");
            a[0].click();
            a.remove();
        }
        // Hoặc dùng cách dưới link này
        //https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
    },
    GetFileDinhKemToKhai: function (idfile, TABLE) {
        $.ajax({
            type: "POST",
            url: "/DToKhaiNopPhi/GetFile/",
            data: { "ID": idfile, "TABLE_NAME": TABLE },
            error: function () {
                $.alert('<span class="red">Tạm thời không lấy được thông tin file, vui lòng F5 thử lại!</span>');
            },
            success: function (data) {
                if (data.code == 1) {
                    $Base64File.DownLoadFile(data.LOAI_DULIEU, data.BASE64FILE, data.TYPEFILE, data.TENFILE);
                } else {
                    $.alert('<span class="color-orange">Không lấy được thông tin file, vui lòng kiểm tra thử lại!</span>');
                }
            }
        });
    }
};

var $ImportFile = {
    LoadEvent: function ($btn, URLCheckRoleImport, $file) {
        this.AddEventOpen($btn, URLCheckRoleImport);
        this.AddEventFileChange($file);
    },
    AddEventOpen: function ($btn, URLCheckRoleImport) {
        $btn.off('click').on('click', function () {
            var Self = $(this);
            AjaxConfig.ContainerLoader = Self.parents('.modal-body');
            var result = AjaxConfig.sendRequestToServer(URLCheckRoleImport, "GET", { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() });
            result.then(function (response) {
                if (response.Header.MsgType == BoxType.Success) {
                    Self.parent().find('input[type=file]').click();
                }
            }).catch(function (xhr) {
                AjaxConfig.CatchError(xhr);
            });
            return false;
        });
    },
    AddEventFileChange: function ($file) {
        $file.off('change').bind('change', function () {
            var Self = $(this);
            var file;
            if (this.hasAttribute("multiple")) {
                file = this.files;
                let lstName = '';
                for (var i = 0; i < file.length; i++) {
                    let item = file[i];
                    lstName += item.name + ", ";
                }
                lstName = lstName.substring(0, lstName.length - 2);
                Self.parent().find('.file-name').val(lstName);
                Self.parent().find('.file-name').prop('title', 'Danh sách file đính kèm: ' + lstName);
            } else {
                file = this.files[0];
                Self.parent().find('.file-name').val(file.name);
                Self.parent().find('.file-name').prop('title', 'File đính kèm: ' + file.name);
            }
            let sizeFile = file.size / 1024 / 1024;
            if (sizeFile > maxLengthFileAccept) {
                Self.val(null); Self.val("");
                $MessageBox.confirm2(null, 'Chỉ chấp nhận file có dung lượng nhỏ hơn hoặc bằng <b>' + maxLengthFileAccept + 'MB</b>. File bạn chọn có dung lượng: ' + sizeFile.toFixed(2) + "MB", 'orange', Self.parents('.modal-body'), null, Self);
                return false;
            }
        });
    },
    AddEventFileCsvChange: function ($file) {
        $file.off('change').bind('change', function () {
            let Self = $(this);
            let files = this.files;
            let lstFileName = '',
                maxSizeCSV = 100;//100MB
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                lstFileName += (lstFileName == '' ? file.name : ', ' + file.name);
                let sizeFile = file.size / 1024 / 1024;
                if (sizeFile > maxSizeCSV) {
                    Self.val(null); Self.val("");
                    $MessageBox.confirm2(null, 'Chỉ chấp nhận file .CSV có dung lượng nhỏ hơn hoặc bằng <b>' + maxSizeCSV + 'MB</b>. File bạn chọn có dung lượng: ' + sizeFile + "MB", 'orange', Self.parents('.modal-body'), null, Self);
                    lstFileName = '';
                    break;
                }
            }
            if (lstFileName == '') { return false; }
            Self.parent().find('.file-name').val(lstFileName);
        });
    }
};

var $AttachFile = {
    init: function () {
        $AttachFile.f_checkSizeFile();
        $AttachFile.event();
    },
    f_checkSizeFile: function () {
        $('input[type=file]').off('change').bind('change', function () {
            var sizeFile = this.files[0].size / 1024 / 1024;
            if (sizeFile > 2) {
                $(this).val("");
                $.alert('<span style="color:orange">Chỉ chấp nhận file có dung lượng nhở hơn 2MB (<2MB). File bạn chọn có dung lượng: ' + sizeFile.toFixed(2) + "MB");
            }
        });
    },
    event: function () {
        $('.btn-ChonFile').click(function () {
            $('#file').click();
        });
        $(".btn-ChonFile").mouseout(function () {
            var getForder_img = "/AttachFile/";
            var nameFile = $("#file").val();
            if (nameFile != "") {
                var pathIMG = nameFile.split("fakepath");
                var nameIMG = pathIMG[1].substring(1, pathIMG[1].length);
                $('.fileName').text(nameIMG);
            }
        });
        $('.btnXoaFile').off('click').on('click', function () {
            var id = $(this).data('id');
            var linkFile = $(this).data('linkfile');
            var Controler = $(this).data('controler');
            $.confirm({
                title: '<i class="fa fa-bell-o"></i>&nbsp;THÔNG BÁO',
                content: 'Bạn chắc chắn muốn xóa file <span class="color-blue">' + linkFile + '</span> ?',
                type: 'orange',
                typeAnimated: true,
                columnClass: 'col-md-offset-0',
                container: $('.content-body-body'),
                buttons: {
                    tryAgain: {
                        text: '<i class="fa fa-trash-o"></i>&nbsp;Xóa',
                        btnClass: 'btn-danger',
                        action: function () {
                            $.ajax({
                                type: "POST",
                                url: '/' + Controler + '/RemoveFile/',
                                data: { 'LinkFile': linkFile, 'id': id },
                                error: function () {
                                    $.alert('<span class="red">Có lỗi xảy ra trong quá trình xử lý, vui lòng kiểm tra lại.</span>');
                                },
                                success: function (data) {
                                    if (data == 1) {
                                        if (!$('.frameActionFile').hasClass('hidden'))
                                            $('.frameActionFile').addClass('hidden');
                                        $('span.fileName').html('');
                                        $.alert('<span class="color-green">Xóa file thành công!</span>');
                                    }
                                    else
                                        $.alert('<span class="color-blue">Xóa file không thành công, vui lòng kiểm tra lại!</span>');
                                }
                            });
                        }
                    },
                    close: {
                        text: '<i class="fa fa-close"></i>&nbsp;Đóng',
                        action: function () {
                        }
                    }
                }
            });

        });
    }
}