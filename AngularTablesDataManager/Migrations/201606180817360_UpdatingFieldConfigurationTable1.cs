namespace AngularTablesDataManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatingFieldConfigurationTable1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.FieldConfigurations", "EntityReference");
        }
        
        public override void Down()
        {
            AddColumn("dbo.FieldConfigurations", "EntityReference", c => c.String());
        }
    }
}
