using API.Models;

namespace API.Token
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}