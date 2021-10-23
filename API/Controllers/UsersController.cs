using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Repositories;
using API.Models;
using API.Dtos;
using AutoMapper;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var user = await _userRepository.GetAll();
            return Ok(user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UpdateUserDto userDTO)
        {
            AppUser user = new()
            {
                Id = id,
                UserName = userDTO.UserName,
                Email = userDTO.Email,
            };

            await _userRepository.Update(user);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _userRepository.Delete(id);
            return Ok();
        }
    }
}
