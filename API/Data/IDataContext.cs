using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public interface IDataContext
    {
        DbSet<AppUser> Users { get; init; }
        DbSet<Course> Courses { get; init; }
        DbSet<Language> Languages { get; init; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}