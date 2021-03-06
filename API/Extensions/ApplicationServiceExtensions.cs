using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using API.Data;
using API.Token;
using Microsoft.EntityFrameworkCore;
using API.Repositories;
using API.Repositories.Interfaces;
using API.Helpers;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<IUserCourseRepository, UserCourseRepository>();
            services.AddScoped<ISessionRepository, SessionRepository>();
            services.AddScoped<IProgressRepository, ProgressRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(opt =>
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"))
            );

            return services;
        }
    }
}