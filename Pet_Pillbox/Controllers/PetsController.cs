using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Pet_Pillbox.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string UserId => User.FindFirst(x => x.Type == "user_id").Value;
    }

    [Route("api/pets")]
    [ApiController]
    [Authorize]
    public class PetsController : FirebaseEnabledController
    {
        PetsRepository _repo;

        public PetsController(PetsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllPets()
        {
            var allPets = _repo.GetAllPets();

            return Ok(allPets);
        }
    }
}
