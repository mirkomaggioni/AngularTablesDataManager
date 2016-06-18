namespace AngularTablesDataManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatingFieldConfigurationTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FieldConfigurations",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Entity = c.String(),
                        Field = c.String(),
                        Tipology = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.FieldConfigurations");
        }
    }
}
