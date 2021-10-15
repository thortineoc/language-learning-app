using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly IDataContext _context;
        public CourseRepository(IDataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Course>> GetAll()
        {
            return await _context.Courses.ToListAsync();
        }
    }
}