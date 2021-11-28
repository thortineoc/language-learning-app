using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class AppUserCourse
    {
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
        
        public int nAllWords { get; set; }
        
        public int nWordsLearned { get; set; }
        
        public int nWordsToReview { get; set; }
    }
}