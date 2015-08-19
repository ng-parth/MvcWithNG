using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcWithNG.Models;

namespace MvcWithNG.Controllers
{
    public class SampleGridController : Controller
    {
        //
        // GET: /SampleGrid/

        public ActionResult Index()
        {
            List<MyLIst> lstA = new List<MyLIst>();
            MyLIst objA;
            for (int i = 0; i <= 9; i++)
            {
                objA = new MyLIst();
                objA.id = i + 1;
                objA.Name = "Parth _ "+(i + 1).ToString();
                lstA.Add(objA);
            }
            SampleGridModels objModal = new SampleGridModels();
            objModal.lstMyList = lstA;
            return View("Index",objModal);
        }

    }
}
