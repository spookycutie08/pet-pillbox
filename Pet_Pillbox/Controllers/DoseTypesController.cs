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
    }
}
