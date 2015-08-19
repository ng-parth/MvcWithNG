using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MvcWithNG.Models;
using MvcWithNG.Models.Models;
using RxLabs.Repository;
using System.Net.Mail;
using System.Globalization;

namespace MvcWithNG.Controllers
{
    public class BookMeController : ApiController
    {
        [ActionName("bookmark")]
        public dynamic PostBookmark(JObject Json)
        {
            JsonModels.BookMarkObj AddBookM = Json.ToObject<JsonModels.BookMarkObj>();

            Bookmark bk = new Bookmark()
            {
                Url = AddBookM.Url,
                Title = AddBookM.Title,
                Tags = AddBookM.Tags,
                Date = DateTime.Now,
                Active = true
                //Users = new List<User>(){
                //     new User(){
                //         Name=AddBookM.tags
                //     }
                // }
            };

            //Log Lg = new Log()
            //{
            //    Date = DateTime.Now
            //};
            try
            {
                MvcWithNGContext NgContext = new MvcWithNGContext();
                NgContext.Bookmarks.Add(bk);
                NgContext.SaveChanges();
                return "Link Bookmarked :) ";
            }
            catch (Exception e)
            {
                return e;
            }
        }
        [ActionName("bookmark")]
        public dynamic GetBookmarks()
        {
            MvcWithNGContext NgContext = new MvcWithNGContext();
            var Bookmarks = NgContext.vBookmarks.Where(t => t.Active == true).ToList();
            string tag = "theme";
            var tags = NgContext.vBookmarks.Where(u => u.Tags.Contains("theme")).ToList();
            //MailMessage M = new MailMessage();
            //M.To = "";
            //M.From = "";
            //M.Subject = "";
            //M.Body = "";
            //M.BodyEncoding = MailFormat.Text;

            //using System.Net.Mail;
            //MailAddress From = new MailAddress("ppmistry204@yahoo.co.in");
            //MailAddress To = new MailAddress("ppmistry204@gmail");

            //MailMessage Mail = new MailMessage(From, To);
            //Mail.Body = "Body Text";
            //Mail.Subject = "[parth.parimal.me] "+ "String" ;
            //SmtpClient Client = new SmtpClient("smtp.gmail.com");
            //Client.Credentials = new NetworkCredential("username", "password");
            //try
            //{
            //    Client.Send(Mail);
            //}
            //catch (Exception E) {
            //    string error = E.StackTrace;
            //}
            return Bookmarks;
        }
        [ActionName("bookmark")]
        public dynamic DeleteBookmark(JObject Id)
        {
            JsonModels.DelBookMarkObj DelObj = Id.ToObject<JsonModels.DelBookMarkObj>();
            MvcWithNGContext NgContext = new MvcWithNGContext();
            int Did = Convert.ToInt32(DelObj.Id);
            Bookmark DelBM = NgContext.Bookmarks.Where(t => t.Id == Did).Single();
            DelBM.Active = false;
            NgContext.SaveChanges();

            JsonModels.ObjWithMsg ObjWMsg = new JsonModels.ObjWithMsg()
            {
                DataObj = NgContext.vBookmarks.Where(t => t.Active == true).ToList(),
                Msg = "Success"
            };

            return ObjWMsg;
        }

        [ActionName("bookmark")]
        public dynamic PutBookmark(JObject Json)
        {
            MvcWithNGContext NgContext = new MvcWithNGContext();
            JsonModels.BookMarkObj BookObj = Json.ToObject<JsonModels.BookMarkObj>();
            int BmId = Convert.ToInt32(BookObj.Id);
            Bookmark UpdBM = NgContext.Bookmarks.Where(u => u.Id == BmId).SingleOrDefault();
            UpdBM.Title = BookObj.Title;
            UpdBM.Tags = BookObj.Tags;
            UpdBM.Url = BookObj.Url;
            NgContext.SaveChanges();
            string StatusMsg = "Success";
            JsonModels.ObjWithMsg Obj = new JsonModels.ObjWithMsg()
            {
                DataObj = GetBookmarks(),
                Msg = StatusMsg
            };
            return Obj;
        }

        [ActionName("bookme")]
        public void GetMe()
        {

        }

        [ActionName("date")]
        public dynamic PostDate(string strDate)
        {
            DateTime Date = Convert.ToDateTime(strDate);
            CultureInfo cul = CultureInfo.CurrentCulture;
            var firstDayWeek = cul.Calendar.GetWeekOfYear(Date, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
            return firstDayWeek;
        }
    }
}
