using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Pet_Pillbox.Controllers
{
    [Route("api/dosetypes")]
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
    }
}
