using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ECUS_MAN.Controllers.WSYSTEM
{
    public class ConnectionConfigController : BaseController
    {
        // GET: ConnectionConfig
        public ActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> GetDataTable(string keyword = "")
        {
            int start = Convert.ToInt32(Request["start"]);
            int length = Convert.ToInt32(Request["length"]);
            
            var data = new List<string>();
            for(int i=0; i<100; i++)
            {
                data.Add((i + 1).ToString());
            }
            data = data.OrderBy(x => x).Skip(start).Take(length).ToList();
            return Json(new
            {
                data = data,
                startIndex = start + 1
            });
        }
    }
}