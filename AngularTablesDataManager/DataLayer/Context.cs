using System;
using System.Data.Entity;

namespace AngularTablesDataManager.DataLayer
{
    public class Context : DbContext
    {
        public Context() : base()
        {
        }

        public DbSet<City> Cities { get; set; }
        public DbSet<Zip> Zips { get; set; }
    }
}