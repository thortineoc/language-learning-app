using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace API.Repositories
{
    public class ProgressRepository : IProgressRepository
    {
        private readonly DataContext _context;

        public ProgressRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUserInformation> GetUserProgress(int userId)
        {
            var user = await _context.Users
                .Include(x => x.UserCourses)
                .ThenInclude(x => x.Course)
                .ThenInclude(x => x.LanguageFrom)

                .Include(x => x.UserCourses)
                .ThenInclude(x => x.Course)
                .ThenInclude(x => x.LanguageTo)

                .Include(x => x.UserCourses)
                .ThenInclude(x => x.Course)
                .ThenInclude(x => x.Categories)
                .ThenInclude(x => x.Translations)
                .ThenInclude(x => x.TranslationUserProgress)
                
                .FirstOrDefaultAsync(x => x.Id == userId);

            var courseInfoArr = new List<CourseInformation>();

            foreach (var userCourse in user.UserCourses)
            {
                var course = userCourse.Course;
                var isFinished = false;
                
                CourseInformation courseInfo = new()
                {
                    Id = course.Id,
                    Name = course.Title,
                    LanguageFrom = course.LanguageFrom.Name,
                    LanguageTo = course.LanguageTo.Name,
                    IsFinished = false
                };
                courseInfoArr.Add(courseInfo);
            }
            
            AppUserInformation result = new()
            {
                Username = user.UserName,
                Email = user.Email,
                Points = user.Points,
                Courses = courseInfoArr
            };

            return result;
        }

        public async Task<CourseStats> GetCourseStats(int userId, int courseId)
        {
            var userCourse = await _context.AppUserCourses
                .Include(x => x.Course)
                .ThenInclude(x => x.Categories)
                .ThenInclude(x => x.Translations)
                .ThenInclude(x => x.TranslationUserProgress)
                .Where(x => x.AppUserId == userId && x.CourseId == courseId)
                .FirstOrDefaultAsync();

            var wordsSum = 0;
            var learnedWordsSum = 0;

            foreach (var category in userCourse.Course.Categories)
            {
                foreach (var translation in category.Translations)
                {
                    wordsSum++;
                    foreach (var progress in translation.TranslationUserProgress)
                    {
                        if (progress.IsLearned)
                        {
                            learnedWordsSum++;
                        }
                    }
                }
            }

            CourseStats result = new()
            {
                AllWords = wordsSum,
                LearnedWords = learnedWordsSum
            };

            return result;
        }
    }
}