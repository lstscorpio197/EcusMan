using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QAPage.Common
{
    public class USER
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public int Type { get; set; }
        public bool Enable { get; set; }
        public USER() { }
        
    }
}