/*$(document).ready(function () {*/
$DataTable = function (element, options = { }) {
    //if (this instanceof $DataTable) {
    //    return $(element).$DataTable(options);
    //}
    //else {
    //    // Argument switching
    //    options = element;
    //}
    options.sDom = "t<'row'<'col-sm-6 pt5px'<'float-left mr5px'l><'float-left pt5px'i>><'col-sm-6'p>>";
    options.language = {
        emptyTable: "No data available in table",
        info: "Hiển thị _START_ - _END_ của _TOTAL_ bản ghi",
        infoEmpty: "Hiển thị 0 - 0 của 0 bản ghi",
        infoFiltered: "(filtered from _MAX_ total entries)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "_MENU_",
        loadingRecords: "Đang tải...",
        processing: "",
        search: "",
        zeroRecords: "",
        paginate: {
            "first": "<<",
            "last": ">>",
            "next": ">",
            "previous": "<"
        },
    };
    options.sort = false;
    options.length = 100;
    options.destroy = true;
    options.searching = true;
    options.autoWidth = false;
    options.processing = true;
    /*options.serverSide = true;*/
    var table = $(element).DataTable(options)
    return table;
}
    //$('.dataTable').DataTable({
    //    sDom: "t<'row'<'col-sm-6 pt5px'<'float-left mr5px'l><'float-left pt5px'i>><'col-sm-6'p>>",
    //    language: {
    //        emptyTable: "No data available in table",
    //        info: "Hiển thị _START_ - _END_ của _TOTAL_ bản ghi",
    //        infoEmpty: "Hiển thị 0 - 0 của 0 bản ghi",
    //        infoFiltered: "(filtered from _MAX_ total entries)",
    //        infoPostFix: "",
    //        thousands: ",",
    //        lengthMenu: "_MENU_",
    //        loadingRecords: "Đang tải...",
    //        processing: "",
    //        search: "",
    //        zeroRecords: "",
    //        paginate: {
    //            "first": "<<",
    //            "last": ">>",
    //            "next": ">",
    //            "previous": "<"
    //        },
    //    },
    //    sort: false,
    //    length:100,
    //    destroy: true,
    //    searching: true,
    //    autoWidth: false,
    //    processing: true,
    //    serverSide: true,

    //});

/*})*/