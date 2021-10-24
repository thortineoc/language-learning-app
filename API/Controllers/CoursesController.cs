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
    public class CoursesController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IUserCourseRepository _userCourseRepository;

        public CoursesController(ICourseRepository courseRepository, IMapper mapper,
                                 IUserRepository userRepository, IUserCourseRepository userCourseRepository)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _userCourseRepository = userCourseRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            var courses = await _courseRepository.GetAll();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _courseRepository.GetCourseById(id);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppUserCourseDto>> SetUserCourse(AppUserCourseDto appUserCourseDto)
        {
            var course = await _courseRepository.GetCourseById(appUserCourseDto.CourseId);
            if (course == null)
            {
                return NotFound();
            }
            var user = await _userRepository.GetUserById(appUserCourseDto.AppUserId);
            if (course == null)
            {
                return NotFound();
            }
            var result = await _userCourseRepository.AddCourseToAppUser(user, course);

            return Ok(result);
        }
    }
}