using Microsoft.AspNetCore.Mvc;
using API.Data;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using API.Token;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;

            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is already taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Email = registerDto.Email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                Name = registerDto.Name,
                Surname = registerDto.Surname,
                Role = registerDto.Role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                Role = user.Role
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized("Invalid email");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                Role = user.Role
            };
        }

        private async Task<bool> UserExists(string email)
        {
            return await _context.Users.AnyAsync(x => x.Email == email.ToLower());
        }
    }
}