namespace AngularTablesDataManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatingZipTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Zip",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Code = c.Short(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Zip");
        }
    }
}
