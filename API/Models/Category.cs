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
        public int Id { set; get; }

        public string Name { set; get; }

        public ICollection<Translation> Translations { set; get; }

        public Course Course { get; set; }

        public int CourseId { get; set; }
    }
}