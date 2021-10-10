using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedCourses(DataContext context)
        {
            if (await context.Courses.AnyAsync()) return;

            var courseData = await System.IO.File.ReadAllTextAsync("Data/CourseSeedData.json");
            var courses = JsonSerializer.Deserialize<List<Course>>(courseData);
            foreach (var course in courses)
            {
                context.Courses.Add(course);
            }

            await context.SaveChangesAsync();
        }

    }
}