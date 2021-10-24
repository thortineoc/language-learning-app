using System.Threading.Tasks;
using API.Models;

namespace API.Token
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}