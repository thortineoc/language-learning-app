using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Categories")]
    public class Category
    {
        public long Id { set; get; }

        public string name { set; get; }

        public Course course { get; set; }

        public long courseId { get; set; }
    }
}