using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;

namespace MvcWithNG
{
    public class RouteConfig
    {
        public static string ControllerOnly = "ApiControllerOnly";
        public static string ControllerAndId = "ApiControllerAndIntegerId";
        public static string ControllerAction = "ApiControllerAction";

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // ex: api/technologies
            routes.MapHttpRoute(
               name: ControllerOnly,
               routeTemplate: "api/{controller}"
           );



            //  ex: api/project/1
            routes.MapHttpRoute(
                name: ControllerAndId,
                routeTemplate: "api/{controller}/{id}",
                defaults: null,
                constraints: new { id = @"^\d+$" }
            );

            // ex: api/question/all
            // ex: api/technology/microsoft
            routes.MapHttpRoute(
                name: ControllerAction,
                routeTemplate: "api/{controller}/{action}"
            );


            routes.MapRoute(
                name: "Defaultss",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Upload", action = "Images", id = UrlParameter.Optional });



        }
    }
}