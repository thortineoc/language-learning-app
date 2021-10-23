using Microsoft.EntityFrameworkCore;
using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Course> Courses { get; init; }
        public DbSet<Language> Languages { get; init; }
        public DbSet<AppUserCourse> AppUserCourses { get; init; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            builder.Entity<AppUserCourse>()
                .HasKey(k => new { k.AppUserId, k.CourseId });

            builder.Entity<AppUserCourse>()
                .HasOne(x => x.AppUser)
                .WithMany(y => y.UserCourses)
                .HasForeignKey(k => k.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUserCourse>()
                .HasOne(x => x.Course)
                .WithMany(y => y.UsersInCourse)
                .HasForeignKey(k => k.CourseId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}