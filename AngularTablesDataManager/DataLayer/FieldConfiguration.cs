using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularTablesDataManager.DataLayer
{
    [Table("FieldConfigurations")]
    public class FieldConfiguration
    {
        public Guid Id { get; set; }
        public string Entity { get; set; }
        public string Field { get; set; }
        public string Tipology { get; set; }
    }
}