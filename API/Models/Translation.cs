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
        public int Id { set; get; }
        public string WordFrom { set; get; }

        public string WordTo { set; get; }

        public string Image { set; get; }

        public Category Category { get; set; }

        public long CategoryId { get; set; }
    }
}