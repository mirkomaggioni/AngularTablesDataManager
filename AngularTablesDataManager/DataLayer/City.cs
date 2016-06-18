using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularTablesDataManager.DataLayer
{
    [Table("Cities")]
    public class City
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid IdZip { get; set; }

        [ForeignKey("IdZip")]
        public virtual Zip Zip { get; set; }
    }
}