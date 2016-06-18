using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using AngularTablesDataManager.DataLayer;

namespace AngularTablesDataManager
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<City>("Cities");
            builder.EntitySet<Zip>("Zips");
            builder.EntitySet<FieldConfiguration>("FieldConfigurations");
            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
        }
    }
}