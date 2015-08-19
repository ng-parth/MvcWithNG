using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcWithNG.Models
{
    public class JsonModels
    {
        public class BookMarkObj
        {
            public string Id { get; set; }
            public string Url { get; set; }
            public string Title { get; set; }
            public string Tags { get; set; }
        }
        public class DelBookMarkObj
        {
            public string Id { get; set; }
        }
        public class ObjWithMsg
        {
            public dynamic DataObj { get; set; }
            public string Msg { get; set; }
        }
    }
}