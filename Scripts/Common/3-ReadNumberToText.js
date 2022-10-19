var $docSo = {
    arr_textnumber: ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'],
    f_init: function (so) {
        var strso = so + '';
        var arr_so = strso.split('.');
        if (arr_so.length == 2) {
            if (parseInt(arr_so[1].substring(0, 1)) >= 5)
                so = parseInt(so) + 1;
        }
        so = so + '';
        so = parseInt(so);
        if (so == 0) return $docSo.arr_textnumber[0];
        var chuoi = "", hauto = "";
        do {
            ty = so % 1000000000; so = Math.floor(so / 1000000000);
            if (so > 0) { chuoi = $docSo.f_dochangtrieu(ty, true) + hauto + chuoi; }
            else { chuoi = $docSo.f_dochangtrieu(ty, false) + hauto + chuoi; } hauto = " tỷ";
        } while (so > 0);
        return $docSo.f_TextUppercase(chuoi + " đồng.");
    },
    f_dochangchuc: function (so, daydu) {
        var chuoi = "";
        chuc = Math.floor(so / 10);
        donvi = so % 10;
        if (chuc > 1) {
            chuoi = " " + $docSo.arr_textnumber[chuc] + " mươi";
            if (donvi == 1) { chuoi += " mốt"; }
        } else if (chuc == 1) {
            chuoi = " mười";
            if (donvi == 1) { chuoi += " một"; }
        } else if (daydu && donvi > 0)
        { chuoi = " lẻ"; }
        if (donvi == 5 && chuc > 1)
        { chuoi += " lăm"; }
        else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
            //console.log(donvi); donvi = parseInt(donvi); console.log(donvi);            
            //var strdonvi = donvi + '';
            //var arr_donvi = strdonvi.split('.');
            //if (arr_donvi.length == 2) {
            //    if (parseInt(arr_donvi[1].substring(0, 1)) >= 5)
            //        donvi = donvi + 1;
            //}
            chuoi += " " + $docSo.arr_textnumber[donvi];

        } return chuoi;
    },
    f_docblock: function (so, daydu) {
        var chuoi = ""; tram = Math.floor(so / 100); so = so % 100;
        if (daydu || tram > 0)
        { chuoi = " " + $docSo.arr_textnumber[tram] + " trăm"; chuoi += $docSo.f_dochangchuc(so, true); }
        else { chuoi = $docSo.f_dochangchuc(so, false); } return chuoi;
    },
    f_dochangtrieu: function (so, daydu) {
        var chuoi = ""; trieu = Math.floor(so / 1000000); so = so % 1000000;
        if (trieu > 0) { chuoi = $docSo.f_docblock(trieu, daydu) + " triệu"; daydu = true; }
        nghin = Math.floor(so / 1000); so = so % 1000;
        if (nghin > 0) { chuoi += $docSo.f_docblock(nghin, daydu) + " nghìn"; daydu = true; }
        if (so > 0) { chuoi += $docSo.f_docblock(so, daydu); } return chuoi;
    },
    f_TextUppercase: function (strSo) {
        strSo = strSo == null ? "  " : strSo.trim();
        var charFirst = "<span class='text-uppercase'>" + strSo.substring(0, 1) + "</span>";
        strSo = charFirst + strSo.substring(1);
        return strSo;
    }
};
