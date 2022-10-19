var $ClientMessageDtoEdit= {
    Header :{
        AppName: "THU PHÍ HCM",
        AppVersion: "Version 1.0",
        MsgType: 0,//[0 - Lấy danh sách, 1 - Lấy thông tin Item, 2 - Thêm mới, 3 - Chỉnh sửa , 4 - Xóa, 5 - Import, 6 - Export] 
        RequestID: Math.floor(Math.random() * 100) + 1,// Lấy random từ 0-100
        ResponseID: "..."
    },
    Body: {
        Data: null,
        SubData: null,
        SubData2: null
    },
    Authorize: {
        Token: $('[name=__RequestVerificationToken]').val(),
        Language: "VI",
        ClientIP: "LOCAL"
    }
}

function ClientMessageDto(Data, SubData, SubData2) {
    this.Header = new ClientHeaderDto();
    this.Body = new ClientBodyDto(Data, SubData, SubData2);
    this.Authorize = new ClientAuthorizeDto();
}
function ClientHeaderDto() {
    this.AppName = "THU PHÍ HCM";
    this.AppVersion = "Version 1.0";
    //[0 - Lấy danh sách, 1 - Lấy thông tin Item, 2 - Thêm mới, 3 - Chỉnh sửa , 4 - Xóa, 5 - Import, 6 - Export] 
    this.MsgType = 0;
    this.RequestID = Math.floor(Math.random() * 100) + 1;// Lấy random từ 0-100
    this.ResponseID = "...";
}
function ClientBodyDto(_Data, _SubData, _SubData2) {
    _Data = (_Data || null); _SubData = (_SubData || null); _SubData2 = (_SubData2 || null);
    this.Data = _Data;
    this.SubData = _SubData
    this.SubData2 = _SubData2;
}
function ClientAuthorizeDto() {
    this.Token = $('[name=__RequestVerificationToken]').val();
    this.Language = "VI";
    this.ClientIP = "LOCAL";
}