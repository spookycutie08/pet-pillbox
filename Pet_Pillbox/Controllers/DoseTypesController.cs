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
    public class DoseTypesController : ControllerBase
    {
        DoseTypesRepository _repo;

        public DoseTypesController(DoseTypesRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllDoseTypes()
        {
            var allDoseTypes = _repo.GetAllDoseTypes();

            return Ok(allDoseTypes);
        }

        [HttpGet("{doseTypeId}")]
        public IActionResult GetSingleDoseType(int doseTypeId)
        {
            var singleDoseType = _repo.GetSingleDoseType(doseTypeId);

            if (singleDoseType == null) return NotFound("No dose type found with that ID.");

            return Ok(singleDoseType);
        }
    }
}
