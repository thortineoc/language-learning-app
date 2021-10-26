using System.Reflection.Metadata;
using System;
using System.Collections.Generic;
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
            if (_context.AppUserCourses.Contains(userCourse)) throw new InvalidOperationException("User already has this course");

            _context.AppUserCourses.Add(userCourse);
            await _context.SaveChangesAsync();

            var appUserCourseDto = new AppUserCourseDto();
            _mapper.Map(userCourse, appUserCourseDto);
            return await Task.FromResult(appUserCourseDto);
        }

        public async Task<IEnumerable<Course>> GetAllUserCourses(int id)
        {
            var userWithCourses = _context.Users
                .Include(user => user.UserCourses)
                .ThenInclude(row => row.Course)
                .First(user => user.Id == id);
            var coursesList = userWithCourses.UserCourses.Select(row => row.Course).ToList();
            await _context.SaveChangesAsync();
            return coursesList;
        }



        /*
                private async Task<IEnumerable<int>> GetAllUserCoursesIds(int id)
                {
                    var list = new List<int>();
                    var result = _context.AppUserCourses.Where(x => x.AppUserId == id);

                    foreach (AppUserCourse info in result)
                    {
                        list.Add(info.CourseId);
                    }
                    return await Task.FromResult(list);
                }

               */

        /*
        public async Task<IEnumerable<Course>> GetAllUserCourses(int id)
        {
            var courses = _context.Courses
                .Join<Course, AppUserCourse, int, int>(_context.AppUserCourses
                        .Where(x => x.AppUserId == id),
                course => course, appUserCourse => appUserCourse.CourseId,
                (course, appUserCourse) => new {
                    userId = appUserCourse.AppUserId,
                    CourseId = course.Id,
                    CourseTitle = course.Title
                });

            return await Task.FromResult(courses);
        }*/

    }
}

