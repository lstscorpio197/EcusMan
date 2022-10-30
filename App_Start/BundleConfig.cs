using System.Web;
using System.Web.Optimization;

namespace ECUS_MAN
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/umd/popper.js",
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/bootstrap.bundle.js", 
                      "~/Scripts/jquery-3.4.1.min.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/bundles/EcusJs").Include(
                    "~/Scripts/EcusJs/Ecus.common.js",
                    "~/Scripts/EcusJs/Ecus.file-handle.js",
                    "~/Scripts/EcusJs/Ecus.message-box.js",
                    "~/Scripts/EcusJs/Ecus.validate-xss.js",
                    "~/Scripts/EcusJs/Ecus.wmessage.js",
                    "~/Scripts/EcusJs/Ecus.ajax-config.js"
                    ));
            bundles.Add(new ScriptBundle("~/bundles/CommonJs").Include(
                    "~/Scripts/Reference/jquery.number.min.js",
                    "~/Scripts/Reference/cleave.min.js",
                    "~/Scripts/Common/common.js",
                    "~/Scripts/Common/1-common.js",
                    "~/Scripts/Common/2-Pagination-page.js",
                    "~/Scripts/Common/3-ReadNumberToText.js",
                    "~/Scripts/Common/4-file.js",
                    "~/Scripts/Common/5-Format-input.js",
                    "~/Scripts/Common/6-Table.js",
                    "~/Scripts/Common/8-PageEvent.js",
                    "~/Scripts/Common/9-PageLoad.js",
                    "~/Scripts/Common/DataTableConfig.js"
                    ));
            bundles.Add(new ScriptBundle("~/bundles/Validator").Include(
                "~/Scripts/bootstrap.validator/bootstrapValidator.min.js",
                "~/Scripts/bootstrap.validator/language/vi_VN.js"));
        }
    }
}
