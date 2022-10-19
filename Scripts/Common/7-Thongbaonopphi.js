var $ThongBaoNP = {
    init: function () {
        $ThongBaoNP.btnXemThongBaoNP_Click();
    },
    ViewModalThongBaoNopPhi: function (idNopPhi, sotknp, sotbnp, sotkhq, loaitk) {
        $.ajax({
            type: "POST",
            url: "/DToKhaiNopPhi/GET_THONGBAO_NOPPHI/",
            data: { "ID": idNopPhi },
            error: function () {
                $MessageBox.confirm('red', null, 'Có lỗi xảy ra, vui lòng kiểm tra lại.', null, null, null);
            },
            success: function (data) {
                if (data.Code == 1) {
                    $('.modal#THONGBAONOPPHI_MODAL span.SO_TK_NP').html("<span class='red'>STK HQ: " + data.TOKHAINP.SO_TKHQ + "</span>, STB nộp phí: " + sotbnp + loaitk);
                    $("#THONGBAONOPPHI_MODAL input[name=DTOKHAINPID_MODAL]").val(idNopPhi);
                    $('.modal#THONGBAONOPPHI_MODAL').modal('show');
                    if (data.TOKHAINP != null) {
                        $('.modal#THONGBAONOPPHI_MODAL span.SO_TK_NP').html("<span class='red'>STK HQ: " + data.TOKHAINP.SO_TKHQ + "</span>, STB nộp phí: " + sotbnp + loaitk + ", Nhóm loại hình: <b>" + data.TOKHAINP.MA_NHOM_LOAI_HINH + "</b> - Loại hình: <b>" + data.TOKHAINP.MA_LOAI_HINH + "</b>");
                        $('.MA_DV_KHAIBAO').text(ParseNull(data.TOKHAINP.MA_DV_KHAI_BAO));
                        $('.TEN_DV_KHAIBAO').text(ParseNull(data.TOKHAINP.TEN_DV_KHAI_BAO));
                        $('.DC_DV_KHAIBAO').text(ParseNull(data.TOKHAINP.DC_DV_KHAI_BAO));

                        $('.MA_DV_XNK').text(data.TOKHAINP.MA_DN);
                        $('.TEN_DV_XNK').text(data.TOKHAINP.TEN_DN);
                        $('.DC_DV_XNK').text(data.TOKHAINP.DIACHI_DN);
                        $('.title-httt').html(data.TOKHAINP.MA_LOAI_THANH_TOAN == "TM" ? "( Tiền mặt )" : "( Chuyển khoản )");
                        var soTKHQ = data.TOKHAINP.SO_TKHQ;
                        var MA_DIA_DIEM_LUU_KHO = data.TOKHAINP.MA_DIA_DIEM_LUU_KHO;
                        var MA_NHOM_LOAI_HINH = data.TOKHAINP.MA_NHOM_LOAI_HINH;
                        var text_decoration = "";
                        if (soTKHQ.substring(0, 1) == "5" && khongoaiquanHP.indexOf(MA_DIA_DIEM_LUU_KHO) >= 0) {
                            $('.thongbao_footter').html('<div class="color-blue text-right">- Tờ khai xuất, nhập khẩu có số tờ khai hải quan: <b class="red">' + soTKHQ + '</b> không mất phí do đã đóng phí đầu vào ở kho ngoại quan <b>' + MA_DIA_DIEM_LUU_KHO + '</b> thuộc địa phận TP.HCM.</div>');
                            text_decoration = "text-decoration: line-through;";
                        }

                        $('a.btnPrintThongBaoNP').attr('href', 'in-thong-bao-nop-phi/' + idNopPhi);
                        if (data.CHI_TIET_TOKHAI != null) {
                            var htmlTB = "";
                            var sumSL = 0, sumTT = 0;
                            var grSO_LUONG = 0, grTHANH_TIEN = 0, grDONGIA = 0, TONG_TIEN_BL = 0, iIndex = 0;
                            var countTKCT = data.CHI_TIET_TOKHAI.length;
                            var PreItem = null; var grMA_BIEUCOC = "";
                            $.each(data.CHI_TIET_TOKHAI, function (index, item) {
                                //Nhóm biểu cước
                                if (item.MA_BIEU_CUOC != grMA_BIEUCOC || item.DON_GIA != grDONGIA) {
                                    if (grMA_BIEUCOC != "" && grTHANH_TIEN > 0 && grSO_LUONG > 0) {
                                        htmlTB += '<tr><td class="text-center">' + iIndex + '</td> <td>' + PreItem.TEN_BIEU_CUOC + '</td><td class="text-center">' + PreItem.MA_DVT + '</td><td class="text-right">' + (data.TOKHAINP.LOAI_TK_NP == 100 ? grSO_LUONG : $.number(grSO_LUONG, 4, ",", ".")) + '</td><td class="text-right">' + $.number(PreItem.DON_GIA, 0, ",", ".") + '</td><td class="text-right">' + $.number(grTHANH_TIEN, 0, ",", ".") + '</td></tr>';
                                    }
                                    grMA_BIEUCOC = item.MA_BIEU_CUOC; grDONGIA = item.DON_GIA;
                                    grSO_LUONG = (data.TOKHAINP.LOAI_TK_NP == 100 ? item.SO_LUONG : ((item.DVT_TR_LUONG == "TAN" || item.DVT_TR_LUONG == "TNE") ? item.TRONG_LUONG : item.TRONG_LUONG / 1000)); grTHANH_TIEN = item.THANH_TIEN;
                                    PreItem = item;
                                    iIndex++;
                                }
                                else {
                                    grSO_LUONG += (data.TOKHAINP.LOAI_TK_NP == 100 ? item.SO_LUONG : ((item.DVT_TR_LUONG == "TAN" || item.DVT_TR_LUONG == "TNE") ? item.TRONG_LUONG : item.TRONG_LUONG / 1000));
                                    grTHANH_TIEN += item.THANH_TIEN;
                                }
                                if (index == countTKCT - 1) {
                                    PreItem = item;
                                    htmlTB += '<tr><td class="text-center">' + iIndex + '</td> <td>' + PreItem.TEN_BIEU_CUOC + '</td><td class="text-center">' + PreItem.MA_DVT + '</td><td class="text-right">' + (data.TOKHAINP.LOAI_TK_NP == 100 ? grSO_LUONG : $.number(grSO_LUONG, 4, ",", ".")) + '</td><td class="text-right">' + $.number(PreItem.DON_GIA, 0, ",", ".") + '</td><td class="text-right">' + $.number(grTHANH_TIEN, 0, ",", ".") + '</td></tr>';
                                }
                                sumSL += (data.TOKHAINP.LOAI_TK_NP == 101 ? (item.DVT_TR_LUONG.toUpperCase() == "KG" ? item.TRONG_LUONG / 1000 : item.TRONG_LUONG) : item.SO_LUONG);
                                sumTT += item.THANH_TIEN;
                                //console.log(item.TRONG_LUONG + "-" + (item.TRONG_LUONG / 1000));
                            });
                            if (htmlTB == "")
                                htmlTB = ' <tr><td colspan="10" class="text-center color-blue">Không có dữ liệu</td></tr>';
                            else {
                                if (data.TOKHAINP.LOAI_TK_NP == 100) {
                                    htmlTB += '<tr class="bold" style="' + text_decoration + '"><td class="text-center" colspan="3">TỔNG SỐ:</td><td class="text-right">' + $.number(sumSL, 0, ',', '.') + '</td><td></td><td class="text-right">' + $.number(sumTT, 0, ',', '.') + '</td></tr>';
                                } else {
                                    htmlTB += '<tr class="bold" style="' + text_decoration + '"><td class="text-center" colspan="3">TỔNG SỐ:</td><td class="text-right">' + $.number(sumSL, 4, ',', '.') + '</td><td></td><td class="text-right">' + $.number(sumTT, 0, ',', '.') + '</td></tr>';
                                }
                                htmlTB += '<tr  style="' + text_decoration + '"><td colspan="10" style="font-style:italic;text-align:right!important">Số tiền bằng chữ: ' + (ParseNull(data.TOKHAINP.TONG_TIEN_PHI_BANG_CHU) == "" ? $docSo.f_init(sumTT) : data.TOKHAINP.TONG_TIEN_PHI_BANG_CHU) + '</td></tr>';
                            }
                            htmlTB = $ValidateXSS.sanitizeHtmlTable([htmlTB]);
                            $('.modal#THONGBAONOPPHI_MODAL table tbody').html(htmlTB);
                        }
                    }

                } else if (data.Code == 0) {
                    $MessageBox.confirm('orange', null, data.Message, null, null, null);                   
                } else {
                    $MessageBox.confirm('red', null, data.Message, null, null, null);                    
                }
            }
        });
    },
    GetDataThongBaoNopPhi: function (idNopPhi, sotknp, sotbnp, sotkhq, loaitk) {
        let hasThongBaoNopPhi = (sotbnp != "" && sotbnp != null) ? true : false;
        if (hasThongBaoNopPhi) {
            $ThongBaoNP.ViewModalThongBaoNopPhi(idNopPhi, sotknp, sotbnp, sotkhq, loaitk);
        }
        else {
            if ($('.ecusw-site').length > 0) {
                $('.ecusw-site').preloader({ text: 'Đang tạo thông báo nộp phí...' });
            } else {
                $('.PAGE_PRINT').preloader({ text: 'Đang tạo thông báo nộp phí...' });
            }
            $.ajax({
                type: "POST",
                url: "/KDTService/kdtCreateThongBao/",
                data: { "idSend": idNopPhi },
                timeout: 10000,
                error: function () {
                    if ($('.ecusw-site').length > 0) { $('.ecusw-site').preloader('remove'); } else { $('.PAGE_PRINT').preloader('remove'); }
                    $MessageBox.confirm2(null, "Connect to KDTService get fail. Vui lòng kiểm tra lại.", 'red', null, null, null);
                },
                success: function (data) {
                    if ($('.ecusw-site').length > 0) { $('.ecusw-site').preloader('remove'); } else { $('.PAGE_PRINT').preloader('remove'); }
                    if (data.code == 1 && data.Des == "") {
                        $ThongBaoNP.ViewModalThongBaoNopPhi(idNopPhi, sotknp, sotbnp, sotkhq, loaitk);
                    } else {
                        $MessageBox.confirm2(null, data.Des, 'orange', null, null, null);
                    }
                }
            });
        }
    },
    btnXemThongBaoNP_Click: function () {
        $('.btnXemThongBaoNP').off('click').on('click', function () {
            var idNopPhi = $(this).data('id');
            var sotknp = $(this).data('sotknp');
            var sotbnp = $(this).data('sotbnp');
            sotbnp = (sotbnp == null || sotbnp == 'null') ? "" : sotbnp;
            var sotkhq = $(this).data('sotkhq');
            var loaitk = $(this).data('loaitk');
            loaitk = loaitk == "101" ? " - vận đơn" : "";
            var checkData = CheckSignature(idNopPhi);
            checkData.then(data => {
                if (data.code == 1) {
                    $ThongBaoNP.GetDataThongBaoNopPhi(idNopPhi, sotknp, sotbnp, sotkhq, loaitk);
                } else {
                    $MessageBox.confirm('orange', null, data.Des, null, null, null);                  
                }
            }).catch(err => {
                $MessageBox.confirm('red', null, 'Đã có lỗi xảy ra, vui lòng kiểm tra lại.', null, null, null);               
            });
        });
    }
}