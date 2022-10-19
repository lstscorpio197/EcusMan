using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace QAPage.Common
{
    public class WConfigKey
    {
        public static string MailHost = WebConfigurationManager.AppSettings["MailHost"].ToString();
        public static int MailPort = Convert.ToInt32(WebConfigurationManager.AppSettings["MailPort"] ?? "0");
        public static string MailUser = WebConfigurationManager.AppSettings["MailUser"].ToString();
        public static string MailPass = WebConfigurationManager.AppSettings["MailPass"].ToString();

        public static bool IsWriteLog = Convert.ToInt32(WebConfigurationManager.AppSettings["IsWriteLog"].ToString()) == 1 ? true : false;
        public static bool IsDisplayMenu = Convert.ToInt32(WebConfigurationManager.AppSettings["IsDisplayMenu"].ToString()) == 1 ? true : false;
        /// <summary>
        /// Dung lượng tối đa cho các file
        /// </summary>
        public static int FileSizeMax = WebConfigurationManager.AppSettings["FileSizeMax"] == null ? 4 : int.Parse(WebConfigurationManager.AppSettings["FileSizeMax"].ToString());

        /// <summary>
        /// Dung lượng tối đa cho file .CSV
        /// </summary>
        public static int FileCSVSizeMax = WebConfigurationManager.AppSettings["FileCSVSizeMax"] == null ? 10 : int.Parse(WebConfigurationManager.AppSettings["FileCSVSizeMax"].ToString());

        /// <summary>
        /// Dung lượng tối đa cho file .Zip, .rar
        /// </summary>
        public static int FileZipSizeMax = WebConfigurationManager.AppSettings["FileZipSizeMax"] == null ? 50 : int.Parse(WebConfigurationManager.AppSettings["FileZipSizeMax"].ToString());

        /// <summary>
        /// Link url server file
        /// </summary>
        public static string URLFileUpdate = WebConfigurationManager.AppSettings["URLFileUpdate"] == null ? string.Empty : WebConfigurationManager.AppSettings["URLFileUpdate"].ToString();

        /// <summary>
        /// Thư mục gốc server file
        /// </summary>
        public static string FolderFileUpdate = WebConfigurationManager.AppSettings["FolderFileUpdate"] == null ? string.Empty : WebConfigurationManager.AppSettings["FolderFileUpdate"].ToString();
        /// <summary>
        /// Mật khẩu mặc định khi reset tài khoản
        /// </summary>
        public static string DefaultPassword = WebConfigurationManager.AppSettings["DefaultPassword"] ?? "123";
        /// <summary>
        /// Mật khẩu mặc định khi reset tài khoản
        /// </summary>
        public static string DefaultPasswordCangTraCuu = WebConfigurationManager.AppSettings["DefaultPasswordCang"] ?? "123";
        /// <summary>
        /// Mật khẩu mặc định khi reset tài khoản
        /// </summary>
        public static string DefaultPasswordDN = WebConfigurationManager.AppSettings["DefaultPasswordDN"] ?? "123";
    }
}