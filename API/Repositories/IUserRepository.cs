using System.Collections.Generic;
using API.Models;
using System.Threading.Tasks;
using API.Dtos;

namespace API.Repositories
{
    public interface IUserRepository
    {
        Task<AppUser> GetUserById(long id);

        Task<IEnumerable<AppUser>> GetAll();

        Task Add(AppUser user);

        Task Delete(long id);

        Task Update(AppUser user);
    }
}