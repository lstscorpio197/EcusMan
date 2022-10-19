var AjaxConfig = {
    sendRequestToServer: function (Url, Type, dataSend) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: Type,            
                url: Url,
                data: dataSend,
                success: function (result) {
                    if (typeof (result) != 'object') { AjaxConfig.CatchRedirection(); return; }
                    resolve(result);
                },
                error: function (xhr) {
                    reject(xhr);
                }
            });
        });
    },
    sendRequestFileToServer: function (Url, Type, FormData) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: Type,
                cache: false,
                contentType: false,
                processData: false,
                url: Url,
                data: FormData,
                success: function (result) {
                    if (typeof (result) != 'object') { AjaxConfig.CatchRedirection(); return; }
                    resolve(result);
                },
                error: function (xhr) {
                    reject(xhr);
                }
            });
        });
    },
    ContainerLoader:null,
    ajaxPrefilter: function () {
        //options - là các tùy chọn yêu cầu
        //originalOptions - là các tùy chọn như được cung cấp cho phương thức $ .ajax (), không được sửa đổi và do đó, không có mặc định từ ajaxSinstall
        //jqXHR - là đối tượng jqXHR của yêu cầu
        //Nếu bạn đã phát triển web phía máy chủ thì bạn sẽ thừa nhận rằng các bộ lọc là một cách tuyệt vời để đạt được các mục tiêu nhất định như vệ sinh giá trị đầu vào, v.v. Bây giờ jQuery cung cấp chức năng này trong phía máy khách cũng như sử dụng ajaxPrefiltersự kiện. Sử dụng chức năng này, bạn có thể lọc tất cả các cuộc gọi AJAX trước khi chúng được gửi đến máy chủ.
        //$.ajax()Có thể thay đổi tất cả các tùy chọn / tham số Ajax được truyền cho hàm ( $.ajaxPrefilter()trước khi lọc được bộ lọc) trước khi yêu cầu được gửi. ví dụ: nếu bạn muốn rằng tất cả các yêu cầu HTTP được gửi tới các URL kết thúc bằng cách sử dụng / thêm vào phải là các cuộc gọi HTTP POST thì bạn có thể áp dụng logic ở đây.
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            if (options.url.indexOf("/add") != -1) {
                options.type = "POST";
            }
        });
    },
    ajaxSetup: function () {
        //Link cách sử dụng ajax full
        //https://howtodoinjava.com/jquery/jquery-ajax-tutorial/
        // Để khai báo các biến toàn cục cho 
        $.ajaxSetup({
            headers: { '__RequestVerificationToken': $('input[name=__RequestVerificationToken]').val() },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 403) {
                    $MessageBox.confirm2("<i class='fa fa-bell-o'></i> THÔNG BÁO", "Sorry, your session has expired. Please login again to continue", 'orange', '', '/dang-xuat', '');
                }
                if (jqXHR.status == 404) {
                    $MessageBox.confirm2("<i class='fa fa-bell-o'></i> THÔNG BÁO", "Sorry, Element not found.", 'orange', '', '', '');
                } if (jqXHR.status == 500) {
                    $MessageBox.confirm2("<i class='fa fa-bell-o'></i> THÔNG BÁO", "Sorry, An error occurred on server.", 'orange', '', '', '');
                }
                else {
                    $MessageBox.confirm2("<i class='fa fa-bell-o'></i> THÔNG BÁO", jqXHR.status + " - Sorry, An error occurred: " + textStatus + "<br/> " + errorThrown, 'orange', '', '', '');
                }
            }
        });

        //$.ajaxSetup({
        //    beforeSend: function (xhr) {
        //        xhr.setRequestHeader('__RequestVerificationToken', $('input[name=__RequestVerificationToken]').val());
        //    }
        //});

        //$(document).ajaxError(function (event, jqXHR, options, thrownError) {
        //    if (jqXHR.status == "417") {
        //        myApp.alert(jqXHR.responseText);
        //        myApp.loginScreen();
        //    }
        //})
    },
    ajaxSend: function () {
        //$.ajaxSend ()
        //luôn được gọi ngay trước khi yêu cầu AJAX được gửi qua jQuery.
        $(document).ajaxSend(function () {
            console.log("called before each send");
        });
    },
    ajaxStart: function () {
        //$.ajaxStart ()
        //Whenever an Ajax request is about to be sent, jQuery checks whether there are any other outstanding Ajax requests. If none are in progress, jQuery triggers the ajaxStart event.
        //If $.ajax() or $.ajaxSetup() is called with the global option set to false, the ajaxStart() method will not fire.
        $(document).ajaxStart(function () { //$("#loading").show();                  
            AjaxConfig.ContainerLoader = AjaxConfig.ContainerLoader || $('.content-body-body');         
            AjaxConfig.ContainerLoader.preloader({ text: 'Đang xử lý...' });                      
        });
    },
    ajaxStop: function () {
        //$.ajaxStop ()
        //Whenever an Ajax request completes, jQuery checks whether there are any other outstanding Ajax requests. If none remain, jQuery triggers the ajaxStop event.
        //If $.ajax() or $.ajaxSetup() is called with the global option set to false, the .ajaxStop() method will not fire.
        $(document).ajaxStop(function () {
            //$("#loading").hide();    
            AjaxConfig.ContainerLoader = AjaxConfig.ContainerLoader || $('.content-body-body');         
            AjaxConfig.ContainerLoader.preloader("remove");
            AjaxConfig.ContainerLoader = $('.content-body-body');
            $('.btn.spinner').find('i').attr('class', 'fa fa-search')            
            if (typeof ($pageSize) == 'object') { setTimeout(function () { $pageSize.LoadDefaultSize(); }, 1000) }
        });
    },
    ajaxSuccess: function () {
        //$.ajaxSuccess()
        //Whenever an Ajax request completes successfully, jQuery triggers the ajaxSuccess event.
        $(document).ajaxSuccess(function (event, xhr, settings) {
            // $("#msg").append("<li>Successful Request!</li>");           
            AjaxConfig.ContainerLoader = AjaxConfig.ContainerLoader || $('.content-body-body');
            AjaxConfig.ContainerLoader.preloader("remove");
            AjaxConfig.ContainerLoader = $('.content-body-body');             
        });
    },
    ajaxError: function () {
        //$.ajaxError()
        //Whenever an Ajax request completes with an error, jQuery triggers the ajaxError event.
        $(document).ajaxError(function (event, xhr, settings) {
            $("#msg").append("<li>Failed Request!</li>");
        });
    },
    ajaxComplete: function () {
        //$.ajaxComplete()
        //Whenever an Ajax request completes, jQuery triggers the ajaxComplete event.
        $(document).ajaxComplete(function (event, xhr, settings) {
            // $("#msg").append("<li>Request Completed !!</li>");
            
        });
    },
    ajaxLoad: function () {
        $("#loadTarget").load("html-response.html");
        $("#loadTarget").load("html-response.html #someDiv");
    },
    ajaxGetScript: function (urlScript) {
        //$.getScript() 
        return $.getScript(urlScript);
    },
    ajaxGet: function () {
        //$.get()
        var parameters = { p1: "val1", p2: "val2" };
        $.get("/app/url", parameters)
        .done(function (data) {
            $("#label").html(data);
        })
        .fail(function () {
            alert("error");
        })
        .always(function () {
            alert("finished");
        });
    },
    ajaxPost: function () {
        var parameters = { p1: "val1", p2: "val2" };
        $.post("/app/url", parameters)
        .done(function (data) {
            $("#label").html(data);
        })
        .fail(function () {
            alert("error");
        })
        .always(function () {
            alert("finished");
        });
    },
    ajaxCallNewStyle: function () {
        //Sau jQuery 1.8, bạn có thể viết lệnh gọi ajax như bên dưới:
        $.ajax({
            url: "/app-url/relative-url",
            data: {
                name: "The name",
                desc: "The description"
            }
        })
        .done(function (data, textStatus, jqXHR) {
            alert("Success: " + response);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .always(function (jqXHROrData, textStatus, jqXHROrErrorThrown) {
            alert("complete");
        });
    },
    detectCopyPasteCut: function () {
        $("#textA").bind({
            copy: function () {
                $('#message').text('copy behaviour detected!');
            },
            paste: function () {
                $('#message').text('paste behaviour detected!');
            },
            cut: function () {
                $('#message').text('cut behaviour detected!');
            }
        });
    },
    propErrorCode: {
        "0xx": { name: "Syntax Error", Description: "Lỗi cú pháp khi thực call Ajax. Kiểm tra lại các giá trị đầu vào." },
        "1xx": { name: "Informational", Description: "It means the request has been received and the process is continuing." },
        "2xx": { name: "Success", Description: "It means the action was successfully received, understood, and accepted." },
        "3xx": { name: "Redirection", Description: "It means further action must be taken in order to complete the request." },
        "4xx": { name: "Client Error", Description: "It means the request contains incorrect syntax or cannot be fulfilled." },
        "5xx": { name: "Server Error", Description: "It means the server failed to fulfill an apparently valid request." },
    },
    propClientError: {
        "400": { name: "Bad Request", Description: "The server did not understand the request." },
        "401": { name: "Unauthorized", Description: "The requested page needs a username and a password or token." },
        "402": { name: "Payment Required", Description: "You can not use this code yet." },
        "403": { name: "Forbidden", Description: "Access is forbidden to the requested page." },
        "404": { name: "Not Found", Description: "he server can not find the requested page." },
        "405": { name: "Method Not Allowed", Description: "The method specified in the request is not allowed." },
        "406": { name: "Not Acceptable", Description: "The server can only generate a response that is not accepted by the client." },
        "407": { name: "Proxy Authentication Required", Description: "You must authenticate with a proxy server before this request can be served." },
        "408": { name: "Request Timeout", Description: "The request took longer than the server was prepared to wait." },
        "409": { name: "Conflict", Description: "The request could not be completed because of a conflict." },
        "410": { name: "Gone", Description: "The requested page is no longer available ." },
        "411": { name: "Length Required", Description: 'The "Content-Length" is not defined. The server will not accept the request without it .' },
        "412": { name: "Precondition Failed", Description: "The pre condition given in the request evaluated to false by the server." },
        "413": { name: "Request Entity Too Large", Description: "The server will not accept the request, because the request entity is too large." },
        "414": { name: "Request-url Too Long", Description: 'The server will not accept the request, because the url is too long. Occurs when you convert a "post" request to a "get" request with a long query information .' },
        "415": { name: "Unsupported Media Type", Description: "The server will not accept the request, because the mediatype is not supported ." },
        "416": { name: "Requested Range Not Satisfiable", Description: "The requested byte range is not available and is out of bounds." },
        "417": { name: "Expectation Failed", Description: "The expectation given in an Expect request-header field could not be met by this server." }
    },
    propServerError: {
        "500": { name: "Internal Server Error", Description: "The request was not completed. The server met an unexpected condition." },
        "501": { name: "Not Implemented", Description: "The request was not completed. The server did not support the functionality required." },
        "502": { name: "Bad Gateway", Description: "The request was not completed. The server received an invalid response from the upstream server." },
        "503": { name: "Service Unavailable", Description: "The request was not completed. The server is temporarily overloading or down." },
        "504": { name: "Gateway Timeout", Description: "The gateway has timed out." },
        "505": { name: 'HTTP Version Not Supported", Description: "The server does not support the "http protocol" version.' },
    },
    CatchError: function (xhr) {     
        //console.log(xhr);
        console.log(JSON.stringify(xhr));
        xhr = xhr || 'Lỗi không xác định :( !';
        let statusCode = xhr.status;
        if (statusCode + '' == 'undefined') {
            $MessageBox.confirm(400, null, xhr, null, null, null);
            return false;
        }
        let getCodeType = (statusCode + $String.Empty).substring(0, 1) + "xx";
        let Description = '';// '<div style="position: relative;border-top: 1px solid #ccc;margin-top: 12px;"><div style="position: absolute;top: -12px;padding-right: 10px;background-color: #fff;font-weight: bold;">Bạn gặp lỗi bởi vì:</div></div><br/>';
        Description += statusCode + ": " + this.propErrorCode[getCodeType].name + ", " + this.propErrorCode[getCodeType].Description + ', ' + xhr.statusText;     
        $MessageBox.confirm2(null, Description, "red", null, null, null);
    },
    CatchRedirection: function (container) {
        container = container || null;
        $MessageBox.confirm(BoxType.Redirection, '<i class="fa fa-ban"></i> THÔNG BÁO', "Truy cập chức năng không hợp lệ, nguyên nhân sau đây:<br/>- Bạn không có quyền thực hiện. Liên hệ quản trị để được cấp quyền.<br/>- Hết phiên làm việc, vui lòng kiểm tra lại. Xin cảm ơn!", container, null, null);
    }
};