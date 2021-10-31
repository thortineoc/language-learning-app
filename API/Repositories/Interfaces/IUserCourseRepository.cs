using System.Collections.Generic;
using API.Models;
using System.Threading.Tasks;
using API.Dtos;

namespace API.Repositories
{
    public interface IUserCourseRepository
    {
        Task<AppUserCourseDto> AddCourseToAppUser(AppUser user, Course course);
        Task<AppUser> GetUserWithAllCourses(int id);
        Task<AppUserCourse> DeleteCourse(int id, int userId);
    }
}