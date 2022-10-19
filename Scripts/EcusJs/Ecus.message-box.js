//Message box
var BoxType = { Informational: 100, Info:100, Success: 200, Redirection: 300, ClientError: 400,Warning:400, ServerError: 500, Danger:500 };
var $MessageBox = {
    fade: function (setType, setPosition, setText, timeClose) {
        setType = setType || 'success';
        setPosition = setPosition || 'center';
        setText = setText || 'Chưa có nội dung thông báo.';
        timeClose = timeClose || 1000;
        $.message(setText, {
            // Enable auto close
            autoClose: true,

            // Auto close delay time in ms (>1000)
            closeTime: timeClose,

            // Display a countdown timer
            withTime: false,

            // danger, success, warning or info
            type: setType,

            // position+offeset
            // top-left,top-right,bottom-left,bottom-right,center
            position: [setPosition, [-0.42, 0]],

            // Message title
            title: false,

            // For close button
            close: '',

            // <a href="https://www.jqueryscript.net/animation/">Animation</a> speed
            speed: 'normal',

            // Set to false to display multiple messages at a time
            isOnly: true,

            // Minimal space in PX from top
            minTop: 300,

            // onShow callback
            onShow: function () {
            },

            // onClose callback
            onClose: function () {
            }
        });
    },
    confirm: function (type, title, description, containerAround, href, objFocus) {
        title = ($String.IsNullOrEmpty(title) ? '<i class="fa fa-bell-o"></i>&nbsp;THÔNG BÁO' : title);
        containerAround = containerAround || $('.content-body-body');
        href = href || null;
        objFocus = objFocus || null;
        let resultType = this.getTypeConfirmBox(type);
        $.confirm({
            title: title,
            content: resultType == 'green' ? '<i class="fa fa-check" style="color:green"></i>&nbsp;' + description : description,
            type: resultType,
            //autoClose: 'close|5000',
            typeAnimated: true,
            columnClass: 'col-md-offset-0',
            container: containerAround,
            buttons: {
                close: {
                    text: '<i class="fa fa-close"></i>&nbsp;Đóng',
                    action: function () {
                        if (href != null) { location.href = href; }
                        if (objFocus != null) {
                            setTimeout(function () { objFocus.focus(); }, 500);
                            setTimeout(function () {
                                let $modal = objFocus.parents('.modal');
                                if ($modal.length > 0) {
                                    objFocus.parents('.modal').scrollTop(0); objFocus.focus();
                                }                             
                            }, 1000);
                        }                     
                    }
                }
            },
            onOpen: function () {
              
            },
            onClose: function () {

            }
        });
        return false;
    },
    confirm2: function (title, description, type, containerAround, href, objFocus) {
        title = title || '<i class="fa fa-bell-o"></i> THÔNG BÁO';
        containerAround = containerAround || $('.content-body-body');
        href = href || '';
        objFocus = objFocus || '';
        let resultType = this.getTypeConfirmBox(type);
        $.confirm({
            title: title,
            content: resultType == 'green' ? '<i class="fa fa-check" style="color:green"></i>&nbsp;' + description : description,
            type: resultType,
            typeAnimated: true,
            columnClass: 'col-md-offset-0',
            container: containerAround,
            buttons: {
                close: {
                    text: '<i class="fa fa-close"></i>&nbsp;Đóng',
                    action: function () {
                        if (href != '') { location.href = href; }
                        if (objFocus != '') { setTimeout(function () { objFocus.focus(); }, 300) }
                    }
                }
            }
        });
    },
    getTypeConfirmBox: function (type) {        
        let resultType = type;
        if (type == BoxType.Informational) { resultType = 'blue'; }
        if (type == BoxType.Success) { resultType = 'green'; }
        if (type == BoxType.Redirection) { resultType = 'dark'; }
        if (type == BoxType.ClientError) { resultType = 'orange'; }
        if (type == BoxType.ServerError) { resultType = 'red'; }
        return resultType;
    },
    confirmListError: function () {
        let Description = "<div style='text-align: left;'>Bạn gặp lỗi bởi vì một trong các nguyên nhân sau: <br/>";
        Description += "<p><b>- Hết phiên làm việc. </b><i>(Khắc phục: Nhấn Ctrl-F5 và thử lại.)</i></p>";
        Description += "<p><b>- Không có quyền truy cập chức năng này.</b> <i>(Khắc phục: Liên hệ với quản trị hệ thống.)</i></p>";
        Description += "<p><b>- Server xử lý bị lỗi!.</b></p></div>";
        this.confirm('red', null, Description, null, null, null)
        //this.confirmDialog(null, Description, "red", null, null, null);
    }  
};
var $msgDialog = $MessageBox;