using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly DataContext _context;
        public CourseRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Course>> GetAll()
        {
            var courses = _context.Courses
                .Include(course => course.LanguageFrom)
                .Include(course => course.LanguageTo)
                .ToListAsync();

            return await courses;
        }

        public async Task<Course> GetCourseById(int id)
        {
            var course = _context.Courses
                .Include(course => course.LanguageFrom)
                .Include(course => course.LanguageTo)
                .Include(course => course.Categories)
                .ThenInclude(category => category.Translations)
                .FirstOrDefaultAsync(course => course.Id == id);

            return await course;
        }
    }
}
