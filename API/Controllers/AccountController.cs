using Microsoft.AspNetCore.Mvc;
using API.Data;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using API.Token;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        public AccountController(UserManager<AppUser> userManager,
                                 SignInManager<AppUser> signInManager,
                                 ITokenService tokenService,
                                 IMapper mapper)
        {
            _tokenService = tokenService;

            _mapper = mapper;

            _signInManager = signInManager;

            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUserDto>> Register(RegisterDto registerDto)
        {
            if (await EmailExists(registerDto.Email)) return BadRequest("Email is already taken");
            if (await UserExists(registerDto.UserName)) return BadRequest("Username is already taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.UserName.ToLower();
            user.Email = registerDto.Email.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);
            
            return new AppUserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Role = await _userManager.GetRolesAsync(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());

            if (user == null) return Unauthorized("Invalid username or password");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new AppUserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Role = await _userManager.GetRolesAsync(user)
            };
        }

        private async Task<bool> EmailExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email.Equals(email.ToLower()));
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName.Equals(username.ToLower()));
        }
    }
}