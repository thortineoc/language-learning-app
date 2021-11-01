using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using API.Models;
using API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Repositories.Interfaces;
using Microsoft.OpenApi.Any;

namespace API.Repositories
{
    public class SessionRepository : ISessionRepository
    {
        private readonly DataContext _context;

        public SessionRepository(DataContext context)
        {
            _context = context;
        }

        public Task<List<AppUser>> GetTranslationsFromCategory(int courseId, int categoryId, int userId)
        {
            var result = _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.UserCourses.Where(x => x.CourseId == courseId))
                .ThenInclude(x => x.Course)
                .ThenInclude(c => c.Categories.Where(c => c.Id == categoryId))
                .ThenInclude(c => c.Translations)
                .ThenInclude(c => c.TranslationUserProgress)
                .ToListAsync();
            
            return result;
        }

        public async Task<List<string>> GetRandomTranslations(int id)
        {
            var words = new List<string>();
            var randomWords = new List<string>();
            var course = await _context.Courses
                .Include(c => c.Categories)
                .ThenInclude(cat => cat.Translations)
                .FirstOrDefaultAsync(x => x.Id == id);
            
            if (course == null)
            {
                throw new NullReferenceException();
            }

            foreach (var courseCategory in course.Categories)
            {
                {
                    foreach (var translation in courseCategory.Translations)
                    {
                        words.Add(translation.WordTo);
                    }
                }
            }
            
            var rand = new Random();
            var numberOfRandomWords = 3;
            var randomNumber = 0;

            for (int ctr = 0; ctr < numberOfRandomWords; ctr++)
            {
                randomNumber = rand.Next(words.Count);
                var randomWord = words[randomNumber]; 
                while (randomWords.Contains(randomWord))
                {
                    randomNumber = rand.Next(words.Count);
                    randomWord = words[randomNumber]; 
                }
                randomWords.Add(words[randomNumber]);
            }
            return randomWords;
        }
    }
}