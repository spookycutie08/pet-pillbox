using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Pet_Pillbox.Controllers
{
    [Route("api/pets")]
    [ApiController]
    public class PetsController : ControllerBase
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
