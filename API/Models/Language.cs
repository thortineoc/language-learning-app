using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Language
    {
        public int Id { set; get; }
        public string Name { set; get; }
    }
}