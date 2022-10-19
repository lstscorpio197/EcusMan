using DevOne.Security.Cryptography.BCrypt;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Configuration;

namespace QAPage.Common
{
    public class StringExtention
    {
        public static string ReplateTitle(string text)
        {
            text = text.Trim();
            text = Regex.Replace(text, "(ä|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)", "a");
            text = Regex.Replace(text, "ç", "c");
            text = Regex.Replace(text, "(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)", "e");
            string result;
            do
            {
                text = Regex.Replace(text, "(ì|í|î|ị|ỉ|ĩ)", "i");
                text = Regex.Replace(text, "(ö|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)", "o");
                text = Regex.Replace(text, "(ü|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)", "u");
                text = Regex.Replace(text, "(ỳ|ý|ỵ|ỷ|ỹ)", "y");
                text = Regex.Replace(text, "(đ)", "d");
                text = Regex.Replace(text, "(Ä|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)", "A");
                do
                {
                    text = Regex.Replace(text, "Ç", "C");
                    text = Regex.Replace(text, "(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)", "E");
                    text = Regex.Replace(text, "(Ì|Í|Ị|Ỉ|Ĩ)", "I");
                    text = Regex.Replace(text, "(Ö|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)", "O");
                    text = Regex.Replace(text, "(Ü|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)", "U");
                    do
                    {
                        text = Regex.Replace(text, "(Ỳ|Ý|Ỵ|Ỷ|Ỹ)", "Y");
                    }
                    while (false);
                    text = Regex.Replace(text, "(Đ)", "D");
                    text = Regex.Replace(text, "[ \t\r\n\v\f]", "-");
                    text = Regex.Replace(text, "( )+", "-");
                    text = Regex.Replace(text, "[^A-Za-z0-9_-]", "-");
                    text = Regex.Replace(text, "(_)+", "_");
                    text = Regex.Replace(text, "(-)+", "-");
                }
                while (false);
                text = text.Trim(new char[]
                    {
                    '_'
                    });
            }
            while (4 == 0);
            text = text.Trim(new char[]
                {
                '-'
                });
            result = text;
            return result;
        }

        public static string GenBcrypt(string str)
        {
            // BCrypt.Net.BCrypt.
            return BCryptHelper.HashPassword(str, BCryptHelper.GenerateSalt(12));
        }
        public static bool veryfyBcrypt(string str, string hashed)
        {
            try
            {
                return BCryptHelper.CheckPassword(str, hashed);
            }
            catch
            {
                return false;
            }
            //return BCrypt.Net.BCrypt.Verify(str, hashed);
        }
        public static string GenMd5(string str)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                return GetMd5Hash(md5Hash, str);
            }
        }
        static string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash. 
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes 
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data  
            // and format each one as a hexadecimal string. 
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string. 
            return sBuilder.ToString();
        }
        public static void SendMail(string sendTo, string sub, string content, List<Attachment> attachment)
        {
            SmtpClient smtp = new SmtpClient();
            try
            {
                smtp.Host = WebConfigurationManager.AppSettings["MailHost"];// "smtp.gmail.com";
                smtp.Port = Convert.ToInt32(WebConfigurationManager.AppSettings["MailPort"]);
                smtp.EnableSsl = true;
                //============
                //smtp.Timeout = 20000;
                //smtp.DeliveryMethod = SmtpDeliveryMethod.Network
                //smtp.UseDefaultCredentials = false;
                //==========
                smtp.Credentials = new NetworkCredential(WebConfigurationManager.AppSettings["MailUser"], WebConfigurationManager.AppSettings["MailPass"]);
                MailMessage mail = new MailMessage(WebConfigurationManager.AppSettings["MailUser"], sendTo, sub, content);

                if (attachment != null)
                {
                    foreach (Attachment item in attachment)
                    {
                        mail.Attachments.Add(item);
                    }
                }
                mail.IsBodyHtml = true;
                mail.BodyEncoding = UTF8Encoding.UTF8;
                smtp.Send(mail);
            }
            catch
            {

            }
        }
    }
}