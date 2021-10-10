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

        public string Name { set; get; }

        public Course Course { get; set; }

        public long CourseId { get; set; }
    }
}