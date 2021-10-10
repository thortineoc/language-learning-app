using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Course
    {
        public long Id { set; get; }
        public Language LanguageFrom { set; get; }

        public Language LanguageTo { set; get; }

        public string Title { set; get; }

        public ICollection<Category> Categories { set; get; }
    }
}