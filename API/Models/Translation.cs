using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Translations")]

    public class Translation
    {
        public long Id { set; get; }
        public string wordFrom { set; get; }

        public string wordTo { set; get; }

        public string image { set; get; }

        public Category category { get; set; }

        public long categoryId { get; set; }
    }
}