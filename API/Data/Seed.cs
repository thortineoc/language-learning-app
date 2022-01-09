using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedRoles(RoleManager<AppRole> roleManager)
        {
            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }


        public static async Task SeedLanguages(DataContext context)
        {
            if (await context.Languages.AnyAsync()) return;

            var languageData = await System.IO.File.ReadAllTextAsync("Data/LanguageSeedData.json");
            var languages = JsonSerializer.Deserialize<List<Language>>(languageData);
            foreach (var language in languages)
            {
                context.Languages.Add(language);
            }

            await context.SaveChangesAsync();
        }


        public static async Task SeedCourses(DataContext context)
        {
            if (await context.Courses.AnyAsync()) return;

            var courseData = await System.IO.File.ReadAllTextAsync("Data/CourseSeedData.json");
            var courses = JsonSerializer.Deserialize<List<Course>>(courseData);
            courses[0].LanguageFrom = context.Languages.FirstOrDefault(x => x.Id == 1);
            courses[0].LanguageTo = context.Languages.FirstOrDefault(x => x.Id == 2);
            courses[1].LanguageFrom = context.Languages.FirstOrDefault(x => x.Id == 1);
            courses[1].LanguageTo = context.Languages.FirstOrDefault(x => x.Id == 3);
            courses[2].LanguageFrom = context.Languages.FirstOrDefault(x => x.Id == 4);
            courses[2].LanguageTo = context.Languages.FirstOrDefault(x => x.Id == 1);
            courses[3].LanguageFrom = context.Languages.FirstOrDefault(x => x.Id == 1);
            courses[3].LanguageTo = context.Languages.FirstOrDefault(x => x.Id == 5);
            courses[4].LanguageFrom = context.Languages.FirstOrDefault(x => x.Id == 4);
            courses[4].LanguageTo = context.Languages.FirstOrDefault(x => x.Id == 6);

            foreach (var course in courses)
            {
                context.Courses.Add(course);
            }

            await context.SaveChangesAsync();
        }

    }
}