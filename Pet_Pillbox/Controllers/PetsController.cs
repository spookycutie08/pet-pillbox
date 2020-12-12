using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Pet_Pillbox.Models;

namespace Pet_Pillbox.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string UserId => User.FindFirst(x => x.Type == "user_id").Value;
    }

    [Route("api/pets")]
    [ApiController]
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

        [HttpGet("{uid}")]
        public IActionResult GetPetsByUser(string uid)
        {
            var pets = _repo.GetPetsByUser(uid);

            if (pets == null) return NotFound("No pets yet");

            return Ok(pets);
        }

        [HttpPost]
        public IActionResult AddNewPet(Pet newPet)
        {
            _repo.AddPet(newPet);

            return Created($"/api/pets", newPet);
        }
    }
}
