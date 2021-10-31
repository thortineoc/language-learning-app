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
        private object List;

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

    }
}