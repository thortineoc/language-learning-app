using System.Collections.Generic;
using API.Models;

namespace API.Dtos
{
    public class AppUserInformation
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public long Points { get; set; }
        //public int LearnedWordsSum { get; set; }
        public List<CourseInformation> Courses { get; set; }
    }
}