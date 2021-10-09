using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class DataContext : DbContext, IDataContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<AppUser> Users { get; init; }

        public DbSet<Course> Courses { get; init; }

        public DbSet<Language> Languages { get; init; }
    }
}