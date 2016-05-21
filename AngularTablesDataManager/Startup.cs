using Owin;
using System.Web.Http;

namespace AngularTablesDataManager
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            GlobalConfiguration.Configure(c => WebApiConfig.Register(config));
            app.UseWebApi(config);
        }
    }
}