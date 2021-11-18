using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using Microsoft.EntityFrameworkCore.Query;

namespace API.Repositories.Interfaces
{
    public interface ISessionRepository
    {
        Task<List<AppUser>> GetTranslationsFromCategory(int courseId, int categoryId, int userId);

        Task<List<string>> GetRandomTranslations(int id);

        Task<AppUser> SaveSessionProgress(int courseId, int categoryId, UpdateTranslationInfoDto[] body, int userId);
    }
}