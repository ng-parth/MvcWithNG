using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcWithNG.Models
{
    public class SampleGridModels
    {
        public List<MyLIst> lstMyList { get; set;}
    }
    public class MyLIst
    {
        public MyLIst() { }
        public int id{get;set;}
        public string Name{get;set;}
    }
}