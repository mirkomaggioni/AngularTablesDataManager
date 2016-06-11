namespace AngularTablesDataManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RenamingZipTable : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Zip", newName: "Zips");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.Zips", newName: "Zip");
        }
    }
}
