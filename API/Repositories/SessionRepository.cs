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

namespace API.Repositories
{
    public class SessionRepository : ISessionRepository
    {
        private readonly DataContext _context;

        public SessionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IIncludableQueryable<AppUser, ICollection<Translation>>> GetTranslationsFromCategory(int id, int categoryId, int userId)
        {
            var result = _context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.UserCourses)
                .ThenInclude(x => x.Course)
                .ThenInclude(c => c.Categories.Where(cat => cat.Id == categoryId))
                .ThenInclude(c => c.Translations);

            return result;
        }

    }
}