using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcWithNG.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string Url = "http://" + Request.Url.Authority.ToString() + "/Apps/BookmarkMe/index.html";                  //http://localhost:59016/Apps/BookmarkMe/index.html
            Response.Redirect(Url);
            return View();
        }
    }
}
