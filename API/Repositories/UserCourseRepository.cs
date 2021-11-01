using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Dtos;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserCourseRepository : IUserCourseRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserCourseRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AppUserCourseDto> AddCourseToAppUser(AppUser user, Course course)
        {
            var userCourse = new AppUserCourse()
            {
                AppUserId = user.Id,
                CourseId = course.Id,
            };
            if (_context.AppUserCourses.Contains(userCourse))
            {
                throw new InvalidOperationException("User already has this course");
            }

            _context.AppUserCourses.Add(userCourse);
            await _context.SaveChangesAsync();
            
            foreach (var courseCategory in userCourse.Course.Categories)
            {
                foreach (var courseCategoryTranslation in courseCategory.Translations)
                {
                    var translationUserProgress = new TranslationUserProgress()
                    {
                        AppUser = user,
                        AppUserId = user.Id,
                        IsLearned = false,
                        IsToReview = false,
                        TimesRepeated = 0,
                        Translation = courseCategoryTranslation,
                        TranslationId = courseCategoryTranslation.Id,
                    };
                    _context.TranslationUserProgresses.Add(translationUserProgress);
                    await _context.SaveChangesAsync();
                }
            }

            var appUserCourseDto = new AppUserCourseDto();
            _mapper.Map(userCourse, appUserCourseDto);
            return await Task.FromResult(appUserCourseDto);
        }

        public async Task<AppUser> GetUserWithAllCourses(int id)
        {
            return await _context.Users
                .Include(x => x.UserCourses)
                .ThenInclude(x => x.Course)
                .ThenInclude(x => x.LanguageFrom)

                .Include(x => x.UserCourses)
                .ThenInclude(x => x.Course)
                .ThenInclude(x => x.LanguageTo)

                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<AppUserCourse> DeleteCourse(int id, int userId)
        {
            var relation = _context.AppUserCourses.First(row => row.AppUserId == userId && row.CourseId == id);

            if (relation == null)
                throw new NullReferenceException();

            _context.Remove(relation);
            _context.SaveChanges();

            return await Task.FromResult(relation);

        }
    }
}