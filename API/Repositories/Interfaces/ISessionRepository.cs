using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore.Query;

namespace API.Repositories.Interfaces
{
    public interface ISessionRepository
    {
        Task<IIncludableQueryable<AppUser, ICollection<Translation>>> GetTranslationsFromCategory(int id, int categoryId, int userId);

    }
}