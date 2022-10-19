using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;

namespace QAPage.Common
{
    public class General
    {
        public enum UserType
        {
            Khac = -1,
            ThanhVienMoi = 0,
            DoanhNghiepXNK = 1,
            DoanhNghiepKhoBai = 2,
            CangVu = 3
        }

        public enum QuestionType
        {
            GopY = 1,
            DeXuat = 2,
            KhieuNai = 3,
            BaoCaoSuCo = 4
        }
        public enum Priority
        {
            Thap = 1,
            TrungBinh = 2,
            Cao = 3
        }
        public static string ConvertUserType(int? type = null)
        {
            switch (type)
            {
                case (int)UserType.Khac:
                    return "Khác";
                case (int)UserType.ThanhVienMoi:
                    return "Thành viên mới";
                case (int)UserType.DoanhNghiepXNK:
                    return "Doanh nghiệp XNK";
                case (int)UserType.DoanhNghiepKhoBai:
                    return "Doanh nghiệp kho bãi cảng";
                case (int)UserType.CangVu:
                    return "Cảng vụ";
                default:
                    return string.Empty;
            }
        }

        public static object GetPropValue(object src, string propName)
        {
            return src.GetType().GetProperty(propName).GetValue(src, null);
        }

        public static object SetPropValue(object src, string propName, string value)
        {
            src.GetType().GetProperty(propName).SetValue(src, value, null);
            return src;
        }

        public static bool IsEmail(string email)
        {
            var tool = new EmailAddressAttribute();
            return tool.IsValid(email);
        }

        public static void SendMail(string sendTo, string sub, string content, List<Attachment> attachment)
        {
            SmtpClient smtp = new SmtpClient();
            try
            {
                smtp.Host = WConfigKey.MailHost;// "smtp.gmail.com";
                smtp.Port = WConfigKey.MailPort;//587
                smtp.EnableSsl = true;
                //============
                //smtp.Timeout = 20000;
                //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                //smtp.UseDefaultCredentials = false;
                //==========
                smtp.Credentials = new NetworkCredential(WConfigKey.MailUser, WConfigKey.MailPass);
                MailMessage mail = new MailMessage(WConfigKey.MailUser, sendTo, sub, content);
                if (attachment != null)
                {
                    foreach (Attachment item in attachment)
                    {
                        mail.Attachments.Add(item);
                    }
                }
                mail.IsBodyHtml = true;
                mail.BodyEncoding = System.Text.UTF8Encoding.UTF8;
                smtp.Send(mail);
            }
            catch
            {
                return;
            }
        }

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}