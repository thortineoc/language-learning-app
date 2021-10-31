using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using API.Models;
using API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireLoggedInUser")]
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
        public async Task<ActionResult<IEnumerable<Course>>> GetMyCourses()
        {
            var courses = await _userCourseRepository.GetUserWithAllCourses(User.GetUserId());
            return Ok(courses);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Course>> DeleteMyCourse(int id)
        {
            var deleted = await _userCourseRepository.DeleteCourse(id, User.GetUserId());
            return Ok(deleted);

        }
    }
}
