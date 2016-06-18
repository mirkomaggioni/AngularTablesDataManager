using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularTablesDataManager.DataLayer
{
    [Table("FieldConfigurations")]
    public class FieldConfiguration
    {
        public Guid Id { get; set; }
        [Required]
        public string Entity { get; set; }
        [Required]
        public string Field { get; set; }
        [Required]
        public string Tipology { get; set; }
        public string Values { get; set; }
    }
}