using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "RequireLoggedInUser")]
    public class ProgressController : ControllerBase
    {
        private readonly IProgressRepository _progressRepository;

        public ProgressController(IProgressRepository progressRepository)
        {
            _progressRepository = progressRepository;
        }

        [HttpGet]
        public async Task<ActionResult<AppUserInformation>> GetUserProgressInformation() 
        { 
            var userId = User.GetUserId();
            var res = await _progressRepository.GetUserProgress(userId); 
            return Ok(res);
        }
    }
}