using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;
using API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MyCoursesController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IUserCourseRepository _userCourseRepository;

        public MyCoursesController(ICourseRepository courseRepository, IMapper mapper,
            IUserRepository userRepository, IUserCourseRepository userCourseRepository)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _userCourseRepository = userCourseRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetMyCourses(int id)
        {
            var courses = await _userCourseRepository.GetAllUserCourses(id);
            return Ok(courses);
        }
    }
}
