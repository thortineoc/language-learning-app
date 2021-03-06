using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace API.Models
{
    [Table("Translations")]

    public class Translation
    {
        public int Id { set; get; }
        public string WordFrom { set; get; }
        public string WordTo { set; get; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public ICollection<TranslationUserProgress> TranslationUserProgress { get; set; }
       
    }
}