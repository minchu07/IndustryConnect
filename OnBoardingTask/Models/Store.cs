using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnBoardingTask.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(150)]
        public string Address { get; set; }

        [InverseProperty("Store")]
        public virtual ICollection<Sales> Sales { get; set; }
    }
}
