using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QAPage.Common
{
    public class SessionHelper
    {
        public static void setSession(USER us)
        {
            HttpContext.Current.Session["GET_USER"] = us;
        }
        public static USER getSession()
        {
            if (HttpContext.Current.Session["GET_USER"] == null) return null;
            return HttpContext.Current.Session["GET_USER"] as USER;
        }
    }
}