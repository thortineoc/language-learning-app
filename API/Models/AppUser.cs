using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<AppUserCourse> UserCourses { get; set; }
        public ICollection<TranslationUserProgress> TranslationUserProgress { get; set; }
    }
}