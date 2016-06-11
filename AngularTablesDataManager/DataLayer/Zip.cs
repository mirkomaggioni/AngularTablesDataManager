using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularTablesDataManager.DataLayer
{
    [Table("Zips")]
    public class Zip
    {
        public Guid Id { get; set; }
        public Int16 Code { get; set; }
    }
}