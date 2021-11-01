using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using API.Models;
using API.Repositories;
using API.Repositories.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize(Policy = "RequireLoggedInUser")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionRepository _sessionRepository;

        public SessionController(ISessionRepository sessionRepository)
        {
            _sessionRepository = sessionRepository;
        }
        
        [Route("api/course/{courseId}/category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Translation>>> GetCategoryTranslations(int courseId, int categoryId)
        {
            var userId = User.GetUserId();
            var translations = await _sessionRepository.GetTranslationsFromCategory(courseId, categoryId, userId);
            return Ok(translations);
        }

        [HttpGet("{id}")]
        [Route("api/random/{id}")]
        public async Task<ActionResult<List<string>>> GetRandomTranslations(int id)
        {
            var translations = await _sessionRepository.GetRandomTranslations(id);
            return Ok(translations);
        }
    }
}
