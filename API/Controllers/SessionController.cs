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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireLoggedInUser")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionRepository _sessionRepository;

        public SessionController(ISessionRepository sessionRepository)
        {
            _sessionRepository = sessionRepository;
        }

        [HttpGet("{courseId}/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Translation>>> GetCategoryTranslations(int courseId, int categoryId)
        {
            var userId = User.GetUserId();
            var translations = await _sessionRepository.GetTranslationsFromCategory(courseId, categoryId, userId);
            return Ok(translations);
        }

        [HttpPut("{courseId}/{categoryId}")]
        public async Task<ActionResult<AppUser>> SaveSessionResults(int courseId, int categoryId, UpdateTranslationInfoDto[] body)
        {
            var userId = User.GetUserId();
            var res = await _sessionRepository.SaveSessionProgress(courseId, categoryId, body, userId);
            return Ok(res);
        }
        
        [HttpPost]
        public async Task<ActionResult<long>> SaveSessionPoints(PointsDto points) 
        { 
            var userId = User.GetUserId();
            var res = await _sessionRepository.SaveSessionPoints(points, userId); 
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<string>>> GetRandomTranslations(int id)
        {
            var translations = await _sessionRepository.GetRandomTranslations(id);
            return Ok(translations);
        }
    }
}
