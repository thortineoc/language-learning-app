using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) 
        {

        }

        public DbSet<AppUser> Users { set; get; }        
    }
}