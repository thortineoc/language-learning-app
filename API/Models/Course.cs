using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Course
    {
        public long courseId { set; get; }
        public Language languageFrom { set; get; }

        public Language languageTo { set; get; }

        public string title { set; get; }

        public ICollection<Category> categories { set; get; }
    }
}