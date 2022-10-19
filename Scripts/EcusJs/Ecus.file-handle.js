function mxFileHandle() {
    this.init = function () { }
    this.GetTypeFileWebService = function (fileName) {
        var typeFile = "application/pdf";
        var arrFile = fileName.split('.');
        if (arrFile.length > 0) {
            var valueCheck = arrFile[arrFile.length - 1];
            valueCheck = valueCheck.trim().toUpperCase();
            switch (valueCheck) {
                case "PDF":
                    typeFile = "application/pdf";
                    break;
                case "DOC":
                    typeFile = "application/msword";
                    break;
                case "DOCX":
                    typeFile = "application/msword";
                    break;
                case "XLS":
                    typeFile = "application/vnd.ms-excel";
                    break;
                case "XLSX":
                    typeFile = "application/vnd.ms-excel";
                    break;
                case "TXT":
                    typeFile = "text/plain";
                    break;
                case "TIF":
                    typeFile = "image/tiff";
                    break;
                case "GIF":
                    typeFile = "image/gif";
                    break;
                case "PNG":
                    typeFile = "image/png";
                    break;
                case "JPG":
                    typeFile = "image/jpeg";
                    break;
                case "JPEG":
                    typeFile = "image/jpeg";
                    break;
                default:
                    typeFile = "image/svg+xml";// Các type ảnh khác
                    break;
            }
        }
        return typeFile;
    }
    this.SaveFile = function (fromData, base64string, typeFile, fileName) {
        if (fromData == "WEBSERVICE") {
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
            var blob = new Blob([view], { type: this.GetTypeFileWebService(fileName) });
            var url = URL.createObjectURL(blob);
            var a = $("<a>").attr("href", url).attr("download", fileName.split('.')[0]).appendTo("body");
            a[0].click();
            a.remove();
        } else {
            var a = $("<a>").attr("href", "data:" + typeFile + ";base64," + base64string).attr("download", fileName.split('.')[0]).appendTo("body");
            a[0].click();
            a.remove();
        }
        // Hoặc dùng cách dưới link này
        //https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
    }
    this.SaveFileFolder = function (url, fileName) {
        //window.location.host          #returns host
        //window.location.hostname      #returns hostname
        //window.location.path          #return path
        //window.location.href          #returns full current url
        //window.location.port          #returns the port
        //window.location.protocol      #returns the protocol
        //in jquery you can use

        //$(location).attr('host');        #returns host
        //$(location).attr('hostname');    #returns hostname
        //$(location).attr('path');        #returns path
        //$(location).attr('href');        #returns href
        //$(location).attr('port');        #returns port
        //$(location).attr('protocol');    #returns protocol
        url = window.location.host + url;
        //window.open(url);
        var a = $("<a>").attr("href", url).appendTo("body");
        a[0].click();
        a.remove();
    }
    this.GetFileFromServer = function (Url, Type, Id) {
        return new Promise(function (resolve, reject) {
            $.ajax({ type: Type, url: Url, data: { "Id": Id }, success: function (response) { if (typeof (response) != 'object') { AjaxConfig.CatchRedirection(); return; } resolve(response); }, error: function (xhr) { reject(xhr); } });
        });
        //$.ajax({
        //    type: Type,
        //    url: Url,
        //    data: { "Id": Id },
        //    error: function () {
        //        $MessageBox.confirm(BoxType.ClientError, null, 'Không lấy được thông tin file, vui lòng nhấn F5 thử lại!', null, null, null);
        //    },
        //    success: function (response) {
        //        if (response.Header.MsgType == BoxType.Success) {
        //            response.Data.FromSourceData = response.Data.FromSourceData || '';
        //            this.SaveFile(response.Data.FromSourceData, response.Data.FileContetnBase64, response.Data.FileType, response.Data.FileName);
        //            return;
        //        }
        //        $MessageBox.confirm(response.Header.MsgType, null, response.Description, null, null, null);
        //    }
        //});
    }
}

//var mxFileHandle = {
//    init: function () { },
//    GetTypeFileWebService: function (fileName) {
//        var typeFile = "application/pdf";
//        var arrFile = fileName.split('.');
//        if (arrFile.length > 0) {
//            var valueCheck = arrFile[arrFile.length - 1];
//            valueCheck = valueCheck.trim().toUpperCase();
//            switch (valueCheck) {
//                case "PDF":
//                    typeFile = "application/pdf";
//                    break;
//                case "DOC":
//                    typeFile = "application/msword";
//                    break;
//                case "DOCX":
//                    typeFile = "application/msword";
//                    break;
//                case "XLS":
//                    typeFile = "application/vnd.ms-excel";
//                    break;
//                case "XLSX":
//                    typeFile = "application/vnd.ms-excel";
//                    break;
//                case "TXT":
//                    typeFile = "text/plain";
//                    break;
//                case "TIF":
//                    typeFile = "image/tiff";
//                    break;
//                case "GIF":
//                    typeFile = "image/gif";
//                    break;
//                case "PNG":
//                    typeFile = "image/png";
//                    break;
//                case "JPG":
//                    typeFile = "image/jpeg";
//                    break;
//                case "JPEG":
//                    typeFile = "image/jpeg";
//                    break;
//                default:
//                    typeFile = "image/svg+xml";// Các type ảnh khác
//                    break;
//            }
//        }
//        return typeFile;
//    },
//    SaveFile: function (fromData, base64string, typeFile, fileName) {
//        if (fromData == "WEBSERVICE") {
//            // base64 string
//            var base64str = base64string;
//            // decode base64 string, remove space for IE compatibility
//            var binary = atob(base64str.replace(/\s/g, ''));
//            var len = binary.length;
//            var buffer = new ArrayBuffer(len);
//            var view = new Uint8Array(buffer);
//            for (var i = 0; i < len; i++) {
//                view[i] = binary.charCodeAt(i);
//            }
//            // create the blob object with content-type "application/pdf"               
//            var blob = new Blob([view], { type: $Base64File.GetTypeFileWebService(fileName) });
//            var url = URL.createObjectURL(blob);
//            var a = $("<a>").attr("href", url).attr("download", fileName.split('.')[0]).appendTo("body");
//            a[0].click();
//            a.remove();
//        } else {
//            var a = $("<a>").attr("href", "data:" + typeFile + ";base64," + base64string).attr("download", fileName.split('.')[0]).appendTo("body");
//            a[0].click();
//            a.remove();
//        }
//        // Hoặc dùng cách dưới link này
//        //https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
//    },
//    GetFileFromServer: function (Url, Type, Id) {
//        $.ajax({
//            type: Type,
//            url: Url,
//            data: { "Id": Id },
//            error: function () {
//                $.alert('<span class="red">Tạm thời không lấy được thông tin file, vui lòng F5 thử lại!</span>');
//            },
//            success: function (data) {
//                if (data.code == 1) {
//                    $Base64File.SaveFile(data.LOAI_DULIEU, data.BASE64FILE, data.TYPEFILE, data.TENFILE);
//                } else {
//                    $.alert('<span class="color-orange">Không lấy được thông tin file, vui lòng kiểm tra thử lại!</span>');
//                }
//            }
//        });
//    }
//};