namespace AngularTablesDataManager.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatingFieldConfigurationTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FieldConfigurations", "Values", c => c.String());
            AddColumn("dbo.FieldConfigurations", "EntityReference", c => c.String());
            AlterColumn("dbo.FieldConfigurations", "Entity", c => c.String(nullable: false));
            AlterColumn("dbo.FieldConfigurations", "Field", c => c.String(nullable: false));
            AlterColumn("dbo.FieldConfigurations", "Tipology", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.FieldConfigurations", "Tipology", c => c.String());
            AlterColumn("dbo.FieldConfigurations", "Field", c => c.String());
            AlterColumn("dbo.FieldConfigurations", "Entity", c => c.String());
            DropColumn("dbo.FieldConfigurations", "EntityReference");
            DropColumn("dbo.FieldConfigurations", "Values");
        }
    }
}
