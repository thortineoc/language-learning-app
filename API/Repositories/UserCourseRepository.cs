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
                AppUser = user,
                CourseId = course.Id,
                Course = course
            };
            if (_context.AppUserCourses.Contains(userCourse)) throw new InvalidOperationException("User already has this course");

            _context.AppUserCourses.Add(userCourse);

            var userToUpdate = await _context.Users.FindAsync(user.Id);
            userToUpdate.UserCourses.Add(userCourse);

            var courseToUpdate = await _context.Courses.FindAsync(course.Id);
            courseToUpdate.UsersInCourse.Add(userCourse);

            var appUserCourseDto = new AppUserCourseDto();
            _mapper.Map(userCourse, appUserCourseDto);

            await _context.SaveChangesAsync();
            return await Task.FromResult(appUserCourseDto);
        }
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

