using System;
using MvcWithNG.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Newtonsoft.Json.Linq;


namespace MvcWithNG.Controllers
{
    public class ValuesController : ApiController
    {
        //GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        //GET api/values/5
        [HttpGet]
        public string Get(int id)
        {
            string time = DateTime.Now.ToString();
            return time;
        }
        // POST api/values
        public string Post(JObject json)
        {
            return "Success";
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

        //[ActionName("jsonvalues")]
        //public dynamic PostValues(JObject Jo)
        //{
        //    dynamic jo = "Success";
        //    return jo;
        //}

        //public dynamic PutValues(JObject Jo)
        //{
        //    dynamic jo = "Success";
        //    return jo;
        //}
        //[ActionName("jsonvalues")]
        //public dynamic GetValues()
        //{
        //    dynamic jo = "Success";
        //    return jo;
        //}
    }
}