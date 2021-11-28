using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;

namespace API.Repositories.Interfaces
{
    public interface IProgressRepository
    {
        Task<AppUserInformation> GetUserProgress(int userId);
        Task<CourseStats> GetCourseStats(int userId, int courseId);
    }
}