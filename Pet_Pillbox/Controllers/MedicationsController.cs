using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pet_Pillbox.Models;

namespace Pet_Pillbox.Controllers
{
    [Route("api/medications")]
    [ApiController]
    public class MedicationsController : ControllerBase
    {
        MedicationsRepository _repo;

        public MedicationsController(MedicationsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllMedications()
        {
            var allMedications = _repo.GetAllMedications();

            return Ok(allMedications);
        }

        [HttpGet("{petId}")]
        public IActionResult GetCurrentMedsByPetId(int petId)
        {
            var petMeds = _repo.GetCurrentMedsByPetId(petId);

            if (petMeds == null) return NotFound("No active medications found for this pet.");

            return Ok(petMeds);
        }

        [HttpPost]
        public IActionResult AddNewMed(Medication newMed)
        {
            _repo.AddMed(newMed);

            return Created($"/api/medications", newMed);
        }
    }
}
